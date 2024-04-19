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
        className="poster"
      />
    )
  }
}

function Materials({ material }) {

  // TODO: this is weird as its not on a texture

  // console.log(material)
  if (material.length > 0) {
    return (
      <>
        <h3 className="pelican">
          <Link to="/material">
            Materials
          </Link>
        </h3>
        {/* // TODO: color */}
        <section className="deck mint-back">
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

        {/* // TODO: make this a component */}
        <div className="pelican color-block">
          <div className={`heading-back ${data.sanityProject.service.color}-back`}>{/* stay gold */}</div>
          <h1>{data.sanityProject.title}</h1>
        </div>

        <section className="pelican-fold">
          <div>
            {/* TODO: remove before release */}
            {data.sanityProject.description ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies."}
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
              <p>{step.description ?? "Lorem ipsum dolor sit amen"}</p>
              <p className="notes">{step.notes ?? "Lorem ipsum dolor sit amen"}</p>
            </div>
            <hr />
          </section>
        ))}

        <Materials material={data.sanityProject?.material} />
      </main>


      <p className="breadcrumbs pelican">
        <Link to={`/${data.sanityProject.service.slug.current}`}>{data.sanityProject.service.title}</Link>
        &nbsp;&gt;&nbsp;
        {data.sanityProject.title}
      </p>

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
        color
        slug {
          current
        }
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


