import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Slider = () => {

  const data = useStaticQuery(graphql`
    query SliderQuery {
      allSanitySlider(sort: {order: ASC}) {
        edges {
          node {
            title
            image {
              asset {
                gatsbyImageData
              }
            }
          }
        }
      }

      sanityAbout {
        tagline
      }
    }
  `)

  return (
    <>
      <div className="slider">
        {data.allSanitySlider.edges.map(({ node }) => (
          <div className="slide" key={node.title}>
            <GatsbyImage image={node.image.asset.gatsbyImageData} alt={node.title} />
          </div>
        ))}
      </div>
      <h3 className="text-center">{data.sanityAbout.tagline}</h3>
      <div className="slider">
        {data.allSanitySlider.edges.map(({ node }) => (
          <div className="slide" key={node.title}>
            <GatsbyImage image={node.image.asset.gatsbyImageData} alt={node.title} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Slider
