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

      sanityTexture(title: {eq: "wood"}) {
        title
        image {
          asset {
            gatsbyImageData
          }
        }
      }
    }
  `)

  return (
    <>
      <div className="slider slide-left">
        {data.allSanitySlider.edges.map(({ node }) => (
          <div className="slide" key={node.title}>
            <GatsbyImage image={node.image.asset.gatsbyImageData} alt={node.title} />
          </div>
        ))}
      </div>

      <div className='color-block'>
        <GatsbyImage
          image={data.sanityTexture?.image?.asset?.gatsbyImageData}
          alt={data.sanityTexture.title}
        />
        <div className='block pine-block'>{/* stay gold */}</div>
        <h3 className="text-center">{data.sanityAbout.tagline}</h3>
      </div>

      <div className="slider slide-right">
        {data.allSanitySlider.edges.reverse().map(({ node }) => (
          <div className="slide" key={node.title}>
            <GatsbyImage image={node.image.asset.gatsbyImageData} alt={node.title} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Slider
