import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "../../components/header"
import Footer from "../../components/footer"

function MaterialCatchAll({ location }: { location: { pathname: string } }) {

  const { allSanityMaterial } = useStaticQuery(graphql`
    query MaterialCatchQuery {
      allSanityMaterial {
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
      <main className="pelican">
        <h1>Material not found - {location.pathname}</h1>

        <h2>Available materials</h2>
        <ul>
          {allSanityMaterial.nodes.map((material: { title: string, slug: { current: string } }) => (
            <li key={material.title}>
              <Link to={`/material/${material.slug.current}`}>
                {material.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}



export default MaterialCatchAll
