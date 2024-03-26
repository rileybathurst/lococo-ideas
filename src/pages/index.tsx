import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import { PortableText } from '@portabletext/react'

import Header from "../components/header"
import Slider from "../components/slider";

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query IndexQuery {

      sanityAuthor(slug: {current: {eq: "dano"}}) {
        name
        title
        _rawBio
        slug {
          current
        }

        
        image {
          asset {
            gatsbyImageData
          }
        }
        
        signature {
          asset {
            gatsbyImageData
          }
        }
      }

      sanityAbout {
        _rawDescription
        _rawNotes
      }

      allSanityService {
        nodes {
          title
          skills
          _rawNotes

          project {
            title
          }
        }
      }

      allSanityTestimonial {
        nodes {
          title
          _rawDescription
        }
      }

    }
  `)

  return (
    <>
      <Header />
      <section className="pelican-fold three-lines">

        <div className="column">
          {/* this is wrong use the portable text */}
          <PortableText
            value={data.sanityAuthor._rawBio}
          />

          <GatsbyImage
            image={data.sanityAuthor.signature.asset.gatsbyImageData}
            alt={data.sanityAuthor.name}
            className="signature"
          />
          <Link
            to={data.sanityAuthor.slug.current}
            className="sr-only"
          >
            {data.sanityAuthor.name}
          </Link>
          {data.sanityAuthor.title}
        </div>

        <GatsbyImage
          image={data.sanityAuthor.image.asset.gatsbyImageData}
          alt={data.sanityAuthor.name}
        />

      </section>

      <Slider />

      <main>

        <section className="pelican-fold three-lines">
          <div>
            <PortableText
              value={data.sanityAbout._rawDescription}
            />
          </div>
          <div className="notes">
            <PortableText
              value={data.sanityAbout._rawNotes}
            />
          </div>
        </section>

        {data.allSanityService.nodes.map((service: any, i: number) => (
          <div key={i}>
            <h3 className="text-center">{service.title}</h3>
            <div className="pelican-fold">
              <ul>
                {service.skills.map((skill: any, i: number) => (
                  <li key={i}>
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="notes">
                <PortableText
                  value={service._rawNotes}
                />
              </div>
            </div>

            <h2 className="pelican">Projects</h2>
            <section className="pelican-fold">
              {/* // TODO: this isnt an array yet */}
              {/* <ul>
                {service.project.map((project: any) => (
                  <li key={project.title}>
                    <h3>{project.title}</h3>
                  </li>
                ))}
              </ul> */}

              {service.project?.title}
            </section >
          </div>
        ))}

        <div className="pelican">
          <hr />
          <h3>Testimonials</h3>
          {data.allSanityTestimonial.nodes.map((testimonial: any, i: number) => (
            <div key={i}>
              <h3>{testimonial.title}</h3>
              <PortableText
                value={testimonial._rawDescription}
              />
            </div>
          ))}
        </div>




      </main >
    </>
  )
}

export default IndexPage

