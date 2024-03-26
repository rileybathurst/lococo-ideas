import * as React from "react"
import { graphql } from "gatsby"

const ServicePage = ({ data }) => {
  return (
    <main>
      <h1>{data.sanityService.title}</h1>
    </main>
  )
}

export const query = graphql`
  query ServiceQuery($slug__current: String!) {
    sanityService(slug: {current: {eq: $slug__current}}) {
      title
    }
  }
`

export default ServicePage
