import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { PortableText } from '@portabletext/react'

import Header from "../components/header"
import Footer from "../components/footer"
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
          slug {
            current
          }

          project {
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

      allSanityTestimonial {
        nodes {
          title
          _rawDescription
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
  `)

  return (
    <>
      <Header />
      <section className="pelican-fold three-lines">

        <div className="column">
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

        <div className="author-block">
          <div className="pine-block">{/* stay gold */}</div>
          <div className="gold-block">{/* stay gold */}</div>
          <GatsbyImage
            image={data.sanityAuthor.image.asset.gatsbyImageData}
            alt={data.sanityAuthor.name}
            className="author"
          />
        </div>

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

        {data.allSanityService.nodes.reverse().map((service: any, i: number) => (
          <div key={i}>
            <div className='color-block'>
              <GatsbyImage
                image={data.sanityTexture?.image?.asset?.gatsbyImageData}
                alt={data.sanityTexture.title}
              />
              <div className='pine-block'>{/* stay gold */}</div>
              <h3 className="text-center">{service.title}</h3>
            </div>
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

            <hr />

            <h2 className="pelican">Projects</h2>
            <section className="pelican-fold">
              <div className="stack">
                {service.project.map((project: any) => (
                  <Link to={`/${service.slug.current}/${project.slug.current}`} key={project.title} className="poster">
                    <GatsbyImage
                      image={project.image?.asset?.gatsbyImageData}
                      alt={project.title}
                    />
                    <h3>{project.title}</h3>
                  </Link>
                ))}
              </div>
            </section >
          </div>
        ))}

        <div className='color-block'>
          <GatsbyImage
            image={data.sanityTexture?.image?.asset?.gatsbyImageData}
            alt={data.sanityTexture.title}
          />
          <div className='pine-block'>{/* stay gold */}</div>
          <h3>Testimonials</h3>
        </div>
        <div className="pelican">
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
      <Footer />
    </>
  )
}

export default IndexPage

