import * as React from "react"
import { graphql, Link } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import { GatsbyImage } from "gatsby-plugin-image"

function Hero({ image, steps }) {
  if (steps.length > 0) {
    return null;
  } else {
    return (
      <GatsbyImage
        image={image.asset.gatsbyImageData}
        alt={image.alt}
      />
    )
  }
}

function Materials({ material }) {

  console.log(material)
  if (material) {
    return (
      <>
        <h3 className="pelican">Materials</h3>
        <section className="deck">
          {material.map((item) => (
            <Link to={`/material/${item.slug.current}`} key={item.id} className="card">
              <GatsbyImage
                image={item.image.asset.gatsbyImageData}
                alt={item.title}
              />
              <p>{item.title}</p>
            </Link>
          ))}
        </section>
      </>
    )
  } else {
    return null;
  }
}

const ProjectPage = ({ data }) => {

  // console.log(data)

  return (
    <>
      <Header />

      <main>
        <div className="pelican">
          <Hero
            image={data.sanityProject?.image}
            steps={data.sanityProject?.steps}
          />
        </div>


        <h1 className="pelican">{data.sanityProject.title}</h1>
        <section className="pelican-fold">
          <div>
            {data.sanityProject.description}
          </div>
        </section>

        <hr className="pelican" />

        {data.sanityProject?.steps.sort((a, b) => a.order - b.order).map((step) => (
          <section key={step.order} className="pelican-fold">
            <GatsbyImage
              image={step.image.asset.gatsbyImageData}
              alt={step.name}
            />
            <div>
              <h2>{step.name}</h2>
              <p>{step.description}</p>
              <p className="font-cursive">{step.notes}</p>
            </div>
            <hr />
          </section>
        ))}

        <Materials material={data.sanityProject?.material} />
      </main>


      <p className="pelican">{data.sanityProject.service.title} &gt; {data.sanityProject.title}</p>

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

      steps {
        name
        order
        description
        notes
        image {
          asset {
            gatsbyImageData
          }
        }
      }

    material {
      id
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


