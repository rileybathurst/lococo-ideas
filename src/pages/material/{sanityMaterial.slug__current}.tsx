import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { PortableText } from '@portabletext/react'

const MaterialTemplate = ({ data }) => {
  return (
    <>
      <Header />
      <main className="pelican">
        <GatsbyImage
          image={data.sanityMaterial.image.asset.gatsbyImageData}
          alt={data.sanityMaterial.title}
        />
        <h1>{data.sanityMaterial.title}</h1>

        {/* // TODO: projects using each material through gatsby node */}
      </main>

      <Footer />
    </>
  )
}

export const query = graphql`
  query MaterialPageQuery($slug__current: String!) {
    sanityMaterial(slug: {current: {eq: $slug__current}}) {
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
`

export default MaterialTemplate
