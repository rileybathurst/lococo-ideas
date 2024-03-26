import * as React from "react"

function ProjectCatchAll(
  { location }
) {
  return (
    <>
      <h1>Project not found - {location.pathname}</h1>
    </>
  )
}

export const query = graphql`
  query ProjectCatchQuery() {
    allSanityProject {
      title
    }
  }
`

export default ProjectCatchAll
