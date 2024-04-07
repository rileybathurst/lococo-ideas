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
  ]

  createTypes(typeDefs)
}

