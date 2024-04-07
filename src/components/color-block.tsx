import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const ColorBlock = ({ color, texture, title }) => {

  const data = useStaticQuery(graphql`
    query ColorBlockQuery {
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
    <div className='color-block'>
      <GatsbyImage
        image={data.sanityTexture?.image?.asset?.gatsbyImageData}
        alt={data.sanityTexture.title}
      />
      <div className='block reset-block'>{/* stay gold */}</div>
      <div className='block hibernal-block'>{/* stay gold */}</div>
      <h3 className="pelican">Testimonials</h3>
    </div>
  )
}

export default ColorBlock
