import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"


const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query IndexQuery {
      allSanityProject {
        nodes {
          title
          description
        }
      }
    }
  `)

  return (
    <main>
      <h1>
        Lococo Ideas
      </h1>

      <section>
        <h2>Projects</h2>
        <ul>
          {data.allSanityProject.nodes.map((project: any) => (
            <li key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default IndexPage

