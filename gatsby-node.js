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
    }`,

    `type RelatedImages {
      id: String
      title: String
      image: String
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

            // ! cant do this as it cant use the source
            /* const images = await context.nodeModel.findAll({
              type: `SanityImageAsset`,
              query: {
                filter: { _id: { eq: source._id } } },
              },
            }) */

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

    /*     schema.buildObjectType({
          name: "SanityProject",
          fields: {
            RelatedImages: {
              type: ["RelatedImages"],
    
              resolve: async (source, args, context, info) => {
    
                console.log("source");
                console.log(source);
    
                const images = await context.nodeModel.findAll({
                  type: `SanityProject`,
                  query: {
                    filter: { image: { asset: { _id: { eq: source._id } } } }
                  },
                })
    
                // console.log(images); // gives an iterable which doesnt help
    
                const RelatedImages = images.entries.map((image) => {
    
                  console.log("image");
                  console.log(image);
    
                  return {
                    id: "🦄",
                  };
                });
    
    
                let entries = [];
                entries.push(...RelatedImages);
                return entries;
              },
            },
          },
        }), */

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // try work on another loop not to do with the images
    // prove i can loop twice differently but correctly

    schema.buildObjectType({
      name: "SanityMaterial",
      fields: {
        RP2: {
          type: ["RelatedProjects"],

          resolve: async (source, args, context, info) => {

            // console.log("source");
            // console.log(source);

            // "title": "Bamboo"
            // _id: '8532a2c7-2a64-486c-9726-e927772dfb1f',

            // "title": "Go Macro"
            // "_id": "5a329c72-3341-4a71-8bbf-4d653ea9d30b",

            // console.log(context.nodeModel)
            // console.log(source._id);

            const p2 = await context.nodeModel.findAll({
              type: `SanityProject`,
              query: {
                filter: { material: { elemMatch: { _id: { eq: source._id } } } },
              },
            })

            console.log("projects");
            console.log(p2);

            const RP2 = p2.entries.map((project) => {
              return {
                slug: project?.slug?.current ?? "",
                id: project._id,
                title: project.title,
                excerpt: project.excerpt,
                featured: project.featured,
                image: project?.image?.asset?._ref ?? "", // * gives a ref to allSanityImageAsset
              };
            });

            // * totally different idea im now searching for all projects instead of the images
            // im still only looping through the services with the context
            // i need to now loop through the projects

            let entries = [];
            entries.push(...RP2);
            return entries;
          },
        },
      },
    }),


  ]
  createTypes(typeDefs)
}

// ! cant start again a second time it overwrites the first one
