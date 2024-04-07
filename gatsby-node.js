const path = require(`path`)

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
}); // makeRequests

// Create blog pages dynamically
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getProject = makeRequest(graphql, `
    {
      allSanityProject {
        edges {
          node {
            slug {
              current
            }
            service {
              slug {
                current
              }
            }
          }
        }
      }
    }
  `).then(result => {

    result.data.allSanityProject.edges.forEach(({ node }) => {
      createPage({
        path: `${node.service.slug.current}/${node.slug.current}`,
        component: path.resolve(`src/templates/project.tsx`),
        context: {
          slug: node.slug.current,
        },
      })
    })
  }); // .then(result)

  // const getServices = makeRequest(graphql, `

  // Query for blog nodes to use in creating pages.
  return Promise.all([
    getProject
  ])
}

// reverse

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    // Create a "RelatedProjects" type on the root type of "SanityService"
    "type SanityService implements Node { RelatedProjects: [RelatedProjects]  }",
    // Define the "RelatedProjects" type that was applied to the "RelatedProjects" key in the line above this one.
    `type RelatedProjects {
      id: String!
      name: String!
      slug: String
    }`,

    // Now that you have the type, let's populate it with data, or "Resolve" the data.
    schema.buildObjectType({
      name: "SanityService", // This is the "source" that is passed into the resolve function below
      fields: {
        RelatedProjects: { // This is the field that we will resolve the data for. 
          type: ["RelatedProjects"], // As we established above it is of type "RelatedContent" and it is an array.
          // The resolve function will return the data that populates the field
          // in this case we are populating the "relatedContent" field
          resolve: async (source, args, context, info) => {

            /** 
             * context.nodeModel gives you access to query the data layer
             * Below, I'm finding all articles and all pages where
             * the SanityTag's "id" field value exists in the array of tags that
             *  referenced by the parent object.
             */

            // Find all articles (SanityArticle) that contain a reference to the
            // tag (SanityTag). Note that the ID field is used as the reference. Put more verbosely...
            // When an article references a tag, is uses the ID field of the tag.
            const articles = await context.nodeModel.findAll({
              type: "SanityArticle", // Find All SanityArticle's
              query: { // Where 
                filter: {
                  tags: { // The tags array
                    elemMatch: { // Has an element or object within the array
                      // who's id field matches the source id field.
                      // remember that the source is "SanityTag"                      
                      id: { eq: source.id },
                    },
                  },
                },
              },
            })


            /**
             * Now that we have all of the related pages and articles
             * let's create the data objects that will populate or resolve the data
             * 
             * I've explicitly set the shape of the data for the type.
             * Below we are creating the data objects for articles and pages separately
             * because the shape of articles and pages data is different.
             * 
             * pages and articles are arrays of objects.
             * We are using the Array.map function to create and populate a new object
             * in the shape of the RelatedContent type.
             */

            // Create the relatedArticles array
            const relatedArticles = articles.entries.map(entry => {
              return {
                id: entry?.id ?? 'no value',
                name: entry?.meta?.name ?? 'no value',
                slug: entry?.meta?.slug?.current ?? ''
              }
            })

            /**
             * We are finally ready to return the data that we would like
             * to have populate our new relatedArticles field
             */
            // Establish and empty entries array
            let entries = []
            // Use the Array.push method and the spread operator to add
            // relatedArticles and relatedPages to the entries array.
            entries.push(...relatedArticles)

            // Return the entries
            return entries
          },
        },
      },
    }),
  ]

  createTypes(typeDefs)
}

