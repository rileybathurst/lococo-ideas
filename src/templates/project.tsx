import * as React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import { GatsbyImage } from "gatsby-plugin-image"

const ProjectPage = ({ data }) => {

  console.log(data)

  return (
    <>
      <Header />

      <main>
        <div className="pelican">
          <GatsbyImage
            image={data.sanityProject?.image?.asset?.gatsbyImageData}
            alt={data.sanityProject.title}
          />
        </div>

        <div className='color-block'>
          <GatsbyImage
            image={data.sanityTexture?.image?.asset?.gatsbyImageData}
            alt={data.sanityTexture.title}
          />
          <div className='block pine-block'>{/* stay gold */}</div>
          <h1>{data.sanityProject.title}</h1>
        </div>
        <section className="pelican-fold">
          <div>
            {data.sanityProject.description}
          </div>
        </section>
      </main>

      <div className='color-block'>
        <GatsbyImage
          image={data.sanityTexture?.image?.asset?.gatsbyImageData}
          alt={data.sanityTexture.title}
        />
        <div className='block pine-block'>{/* stay gold */}</div>
        <p className="pelican">{data.sanityProject.service.title} &gt; {data.sanityProject.title}</p>
      </div >

      <Footer />
    </>
  )
}

export default ProjectPage

export const query = graphql`
  query ProjectTemplate($slug: String!) {
    sanityProject(slug: {current: {eq: $slug}}) {
      title
      description

      image {
        asset {
          gatsbyImageData
        }
      }

      service {
        title
      }
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
`


