import React, { useState, useRef, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { PortableText } from '@portabletext/react'

import Header from "../components/header"
import Footer from "../components/footer"

function Projects({ texture, relatedProjects, breadcrumb, color }) {

  const [deckHeight, setDeckHeight] = useState(0);
  const ref = useRef();

  useEffect(() => {
    setDeckHeight(ref?.current?.clientHeight);
  });

  return (
    <section className="projects">
      <GatsbyImage
        image={texture.asset.gatsbyImageData}
        alt="texture"
        style={{ height: deckHeight }}
      />

      <div
        className="deck"
        ref={ref}
      >
        {relatedProjects
          .filter((project: any) => project.featured)
          .map((project: any) => (
            <Link
              key={project.title}
              to={`/${breadcrumb}/${project.slug}`}
              className={`card ${color}`}
            >
              {/* <GatsbyImage
                          image={project.relatedImages[0].url.asset.gatsbyImageData}
                          alt={project.title}
                        /> */}
              <img src={project.relatedImages[0].url} />
              <h3 className={color}>{project.title}</h3>
              <p>{project.excerpt ?? "Lorem ipsum dolor sit amen"}</p>
            </Link>
          ))}
      </div>
    </section>
  )
}


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
            altText
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
          order
          skills
          _rawNotes
          slug {
            current
          }
          color

          image {
            asset {
              gatsbyImageData
            }
          }
          
          texture {
            asset {
              gatsbyImageData
            }
          }

          RelatedProjects {
            title
            slug
            excerpt
            featured

            relatedImages {
              url
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

      sanityAbout {
        tagline
      }

    }
  `)

  // this is kinda a pain as it would have to be done for each service through a map
  // let rp = service.RelatedProjects.filter((service: any) => service.featured).slice(0, 2);
  // console.log(rp);
  // ? or we push it up through a function

  return (
    <>
      <Header />
      <section className="pelican-fold three-lines">

        <div className="author-block">
          <GatsbyImage
            image={data.sanityAuthor.image.asset.gatsbyImageData}
            alt={data.sanityAuthor.name}
            className="author"
          />
        </div>

        <div className="column">
          <h1 className="heading-back mint-back">About Me</h1>
          <PortableText
            value={data.sanityAuthor._rawBio}
          />

          <div className="mix-multiply ice-back">
            <GatsbyImage
              image={data.sanityAuthor.signature.asset.gatsbyImageData}
              alt={data.sanityAuthor.name}
              className="signature"
            />
          </div>

          <Link
            to={data.sanityAuthor.slug.current}
            className="sr-only"
          >
            {data.sanityAuthor.name}
          </Link>
          {data.sanityAuthor.title}
        </div>

      </section>

      {/* <Slider /> */}
      <h3 className="tagline">{data.sanityAbout.tagline}</h3>


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

        {data.allSanityService.nodes
          .sort((a: any, b: any) => a.order - b.order)
          .map((service: any,) => (
            <div key={service.id}>
              <Link to={`/${service.slug.current}`}>
                <div className="pelican">
                  <GatsbyImage
                    image={service.image.asset.gatsbyImageData}
                    alt={service.image.altText}
                  />
                </div>
              </Link >
              {/* // TODO: color per service, does this come from gatsby-node? */}

              <h2 className={`pelican heading-back ${service.color}-back`}>
                <Link to={`/${service.slug.current}`}
                  className={service.color}
                >
                  {service.title}
                </Link>
              </h2>
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

              <h2 className="pelican">{service.title} Projects</h2>

              <Projects
                texture={service.texture}
                relatedProjects={service.RelatedProjects}
                breadcrumb={service.slug.current}
                color={service.color}
              />


            </div>
          ))}

        <h2 className="pelican">Testimonials</h2>

        <div className="pelican">
          {data.allSanityTestimonial.nodes.map((testimonial: any, i: number) => (
            <div key={i}>
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

