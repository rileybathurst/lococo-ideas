import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "../../components/header"
import Footer from "../../components/footer"

function ProjectCatchAll({ location }: { location: { pathname: string } }) {

  const { allSanityProject } = useStaticQuery(graphql`
    query ProjectCatchQuery {
      allSanityProject {
        nodes {
          title
          slug {
            current
          }
        }
      }
    }
  `)

  return (
    <>
      <Header />
      <h1>Project not found - {location.pathname}</h1>

      <h2>Available projects</h2>
      <ul>
        {allSanityProject.nodes.map((project: { title: string, slug: { current: string } }) => (
          <li key={project.title}>
            <Link to={`/project/${project.slug.current}`}>
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  )
}



export default ProjectCatchAll
