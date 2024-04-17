import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Header from "../components/header"
import Footer from "../components/footer"

const MaterialPage = ({ data }) => {
  return (
    <>
      <Header />
      <main>
        <h1 className="pelican pine-block">Material</h1>
        <section className="deck">
          {data.allSanityMaterial.nodes.map((material) => (
            <Link to={material.slug.current} key={material.slug.current} className="card">
              <GatsbyImage
                image={material.image.asset.gatsbyImageData}
                alt={material.title}
              />
              <h2>{material.title}</h2>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}

export const query = graphql`
  query MaterialQuery {
    allSanityMaterial {
      nodes {
        title
        slug {
          current
        }
        image {
          asset {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default MaterialPage
