// https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#defining-child-relations

const { default: test } = require("node:test");
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
      jayson: JSON
    }`,

    `type RelatedImages {
      id: String

      filename: String
      extension: String
      size: Int
      assetId: String
      path: String
      url: String
      metadata: JSON
      source: JSON
      _rawMetadata: JSON
      _rawSource: JSON

      gatsbyImage: JSON
      gatsbyImageData: JSON

    }`,

    // gatsbyImageData: JSON
    // gatsbyImageData: [GID]

    // "errors": [ { "message": "Cannot query field \"gatsbyImageData\" on type \"RelatedImages\".",

    // metadata: JSON
    // source: JSON
    // _rawMetadata: JSON
    // _rawSource: JSON

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

              const imageOne = await context.nodeModel.findOne({
                type: `SanityImageAsset`,
                query: {
                  filter: { _id: { eq: project?.image?.asset?._ref } },
                },
              });

              // console.log(imageOne);


              // console.log(images.entries);
              // GatsbyIterable { source: [Function (anonymous)] }
              // console.log(images.entries.source);
              // console.log(images);

              // ! test some JSON see if that looks like the same shape

              // console.log(JSON.stringify(images.entries));
              // comes out empty

              // the image layer inside gatsbyimagedata may be the problem

              // console.log(images.entries[0]);
              // console.log(images.entries[0].gatsbyImageData);

              // const filteredEntries = entries.filter(entry => entry.published)
              // const filteredEntries = entries.filter(entry => entry.filename === "MAUKA-hero.jpg")
              // console.log(filteredEntries);

              /* const generateImageSource = (baseURL, width, height, format, fit, options) => {
                const src = images.entries;
                // const src = images.entries[0].url;
                return { src, width, height, format }
              } */

              // console.log(generateImageSource(images.entries[0].url, 200, 200, "jpg", "fill", { quality: 100 }));
              // console.log(generateImageSource(images.entries));

              // console.log(imageOne);
              // console.log(imageOne.url);

              // In this example we use a custom `quality` option
              const generateImageSource = (baseURL, width, height, format, fit, options) => {
                // const src = `https://myexampleimagehost.com/${baseURL}?w=${width}&h=${height}&fmt=${format}&q=${options.quality}`
                const src = `${imageOne.url}?w=${imageOne.width}&h=${imageOne.height}&fmt=${imageOne.extension}`
                return { src, width, height, format }
              }

              console.log(generateImageSource(imageOne.url, imageOne.width, imageOne.height, imageOne.extension, "fill", { quality: 100 }));

              // import { generateImageData, getLowResolutionImageURL } from "gatsby-plugin-image"
              // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



              /* const resolveGatsbyImageData = async (image, options) => {
                // The `image` argument is the node to which you are attaching the resolver,
                // so the values will depend on your data type.
                const filename = image.src

                const sourceMetadata = {
                  width: image.width,
                  height: image.height,
                  // In this example, the node has a value like "image/png", which needs
                  // converting to a value such as "png". If this omitted, the function will
                  // attempt to work it out from the file extension.
                  format: image.mimeType.split("/")[1]
                }

                const imageDataArgs = {
                  ...options,
                  // Passing the plugin name allows for better error messages
                  pluginName: `gatsby-source-example`,
                  sourceMetadata,
                  filename,
                  placeholderURL,
                  generateImageSource,
                  options,
                }

                // Generating placeholders is optional, but recommended
                if (options.placeholder === "blurred") {
                  // This function returns the URL for a 20px-wide image, to use as a blurred placeholder
                  // You need to download the image and convert it to a base64-encoded data URI
                  const lowResImage = getLowResolutionImageURL(imageDataArgs)

                  // This would be your own function to download and generate a low-resolution placeholder
                  imageDataArgs.placeholderURL = await getBase64Image(lowResImage)
                }

                // You could also calculate dominant color, and pass that as `backgroundColor`
                // gatsby-plugin-sharp includes helpers that you can use, such as calculating
                // the dominant color of a local file, if you don't want to handle it in your plugin


                return generateImageData(imageDataArgs)
              } */






              // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!






              return {
                slug: project?.slug?.current ?? "",
                id: project._id,
                title: project.title,
                excerpt: project.excerpt,
                featured: project.featured,
                image: project?.image?.asset?._ref ?? "",
                relatedImages: images.entries,
                // this does return the filename string but not the gatsbyImageData
                // or atleast not in the right format

                jayson: { test: "test" },
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
