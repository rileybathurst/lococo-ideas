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

// https://github.com/sanity-io/gatsby-source-sanity/issues/81#issuecomment-1303532560
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [

    `type Image {
      gatsbyImageData(
        aspectRatio: Float
        avifOptions: AVIFOptions
        backgroundColor: String
        blurredOptions: BlurredOptions
        breakpoints: [Int]
        formats: [ImageFormat]
        height: Int
        jpgOptions: JPGOptions
        layout: ImageLayout = CONSTRAINED
        outputPixelDensities: [Float]
        placeholder: ImagePlaceholder
        pngOptions: PNGOptions
        quality: Int
        sizes: String
        tracedSVGOptions: Potrace
        transformOptions: TransformOptions
        webpOptions: WebPOptions
        width: Int
      ): JSON!
    }`,

    `type SanityService implements Node { 
      RelatedProjects: [RelatedProjects]  
    },`,

    `type RelatedProjects {
      slug: String
      id: ID
      title: String
      excerpt: String
      image: String
      featured: Boolean
    }`,

    // image: [ Image ]


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

            const RelatedProjects = projects.entries.map((project) => {

              /* const image = context.nodeModel.find({
                type: `SanityImageAsset`,
                query: {
                  filter: { image: { _id: { eq: project?.image?.asset?._ref } } },
                },
              }) */

              // console.log("image");
              // console.log(image);
              // I believe this is possible but its going to be a thing

              // console.log(project);
              // console.log(project?.image?.asset?._ref);

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
  ]
  createTypes(typeDefs)
}


