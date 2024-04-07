import * as React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"

const ServicePage = ({ data }: { data: { sanityService: { title: string } } }) => {
  return (
    <>
      <Header />
      <main className="condor">
        <h1 className="pine-block">{data.sanityService.title}</h1>

        <div className="pelican">
          <h2>Projects</h2>
          {/* <ul>
            {data.sanityService.project.map((project: { title: string, slug: { current: string } }) => (
              <li key={project.title}>
                <a href={`/${data.sanityService.slug.current}/${project.slug.current}`}>
                  {project.title}
                </a>
              </li>
            ))}
          </ul> */}
        </div>
      </main>
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
    }
  }
`

export default ServicePage
