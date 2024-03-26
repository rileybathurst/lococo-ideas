import * as React from "react"
import { graphql } from "gatsby"

const ProjectPage = ({ data }) => {
  return (
    <main>
      <h1>{data.sanityProject.title}</h1>
    </main>
  )
}

export const query = graphql`
  query ProjectQuery($slug__current: String!) {
    sanityProject(slug: {current: {eq: $slug__current}}) {
      title
    }
  }
`

export default ProjectPage
