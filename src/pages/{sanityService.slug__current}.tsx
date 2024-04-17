import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Header from "../components/header"
import Footer from "../components/footer"
import { PortableText } from '@portabletext/react'

const ServicePage = ({ data }: { data: { sanityService: { title: string } } }) => {
  return (
    <>
      <Header />
      <main>
        <h1 className="pelican pine-block">{data.sanityService.title}</h1>

        <p className="pelican">{data.sanityService.description}</p>

        <hr className="pelican" />

        <div className="pelican-fold">
          <ul>
            {data.sanityService.skills.map((skill: any, i: number) => (
              <li key={i}>
                {skill}
              </li>
            ))}
          </ul>
          <div className="notes">
            <PortableText
              value={data.sanityService._rawNotes}
            />
          </div>
        </div>

      </main>


      <h2 className="pelican">Projects</h2>

      <section className="projects">
        <GatsbyImage
          image={data.sanityService.texture.asset.gatsbyImageData}
          alt="texture"
        />

        <div className="deck">
          {data.sanityService.RelatedProjects.map((project: { title: string, slug: { current: string } }) => (
            <div className="card" key={project.title}>
              <a href={`/${data.sanityService.slug.current}/${project.slug}`}>
                {project.title}
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export const query = graphql`
  query ServiceQuery($slug__current: String!) {
    sanityService(slug: {current: {eq: $slug__current}}) {
      title
      slug {
        current
      }
      description
      skills
      _rawNotes

      RelatedProjects {
        title
        slug
      }

      texture {
        asset {
          gatsbyImageData
        }
      }

    }
  }
`

export default ServicePage
