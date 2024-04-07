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

console.log('🦊');

// https://github.com/sanity-io/gatsby-source-sanity/issues/81#issuecomment-1303532560
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  console.log('🦄');

  const typeDefs = [
    "type SanityService implements Node { RelatedProjects: [RelatedProjects]  }",
    `type RelatedProjects {
      slug: String
    }`,


    schema.buildObjectType({
      name: "SanityService",
      fields: {
        RelatedProjects: {
          type: ["RelatedProjects"],

          resolve: async (source, args, context, info) => {

            const projects = await context.nodeModel.findAll({
              type: `SanityProject`,
              query: {
                // service: { _id: { in: `c98fb7ab-25b2-422d-85f9-08eea8738a2b` } },
                service: { _id: { in: source._id } },
              },
            })

            const RelatedProjects = projects.entries.map((entry) => {
              // console.log(entry);
              console.log(entry.title);
              return {
                slug: entry?.slug?.current ?? "hi",
              };
            });

            console.log('🥸');
            // console.log(projects);
            // console.log(context);
            // console.log(context.nodeModel);

            // console.log(source);
            // console.log(source._id);
            // console.log(projects);
            // console.log(projects.entries);

            let entries = [];
            entries.push(...RelatedProjects);
            return entries;
          },


        },
      },
    }),
  ]

  console.log('🦖');

  createTypes(typeDefs)


}


