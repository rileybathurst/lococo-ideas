// https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#defining-child-relations

const path = require(`path`)
// import { generateImageData, getLowResolutionImageURL } from "gatsby-plugin-image"

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

// Create project pages with the service in the url
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

// the problem with here is how do we get down to the related project

// https://github.com/sanity-io/gatsby-source-sanity/issues/81#issuecomment-1303532560
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [

    `type SanityService implements Node { 
      RelatedProjects: [RelatedProjects]  
    },`,

    `type SanityMaterial implements Node { 
      RelatedProjects: [RelatedProjects]  
    },`,

    `type RelatedProjects {
      slug: String
      id: String
      title: String
      excerpt: String
      featured: Boolean
      image: String
      relatedImages: [RelatedImages]
      test: String
    }`,

    `type RelatedImages {
      id: String
      title: String
      image: String
      gatsbyImageData: JSON
      filename: String
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
                filter: { service: { _id: { eq: source._id } } },
              },
            })

            const RelatedProjects = projects.entries.map(async (project) => {
              const images = await context.nodeModel.findAll({
                type: `SanityImageAsset`,
                query: {
                  filter: { _id: { eq: project?.image?.asset?._ref } },
                },
              });

              // console.log(images.entries);
              // GatsbyIterable { source: [Function (anonymous)] }

              return {
                slug: project?.slug?.current ?? "",
                id: project._id,
                title: project.title,
                excerpt: project.excerpt,
                featured: project.featured,
                image: project?.image?.asset?._ref ?? "",
                relatedImages: images.entries,
              };
            });

            // * totally different idea im now searching for all projects instead of the images
            // im still only looping through the services with the context
            // i need to now loop through the projects

            let entries = [];
            entries.push(...RelatedProjects);
            return entries;
          },
        },
      },
    }),

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // console.log('🦊'),

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // try work on another loop not to do with the images
    // prove i can loop twice differently but correctly

    schema.buildObjectType({
      name: "SanityMaterial",
      fields: {
        RelatedProjects: {
          type: ["RelatedProjects"],

          resolve: async (source, args, context, info) => {

            const projects = await context.nodeModel.findAll({
              type: `SanityProject`,
              query: {
                filter: { material: { elemMatch: { _id: { eq: source._id } } } },
              },
            })

            const RelatedProjects = projects.entries.map((project) => {
              return {
                slug: project?.slug?.current ?? "",
                id: project._id,
                title: project.title,
                excerpt: project.excerpt,
                featured: project.featured,
                image: project?.image?.asset?._ref ?? "", // * gives a ref to allSanityImageAsset
              };
            });

            let entries = [];
            entries.push(...RelatedProjects);
            return entries;
          },
        },
      },
    }),

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // wrapping again here the context is not updated
    // add the test string in a second wrap

  ]
  createTypes(typeDefs)
}

// ! cant start again a second time it overwrites the first one
