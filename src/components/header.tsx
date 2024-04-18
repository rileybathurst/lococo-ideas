import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Logo from "../images/logo"

const Header = () => {

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      sanityAbout {
        title
      }

      allSanityService {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  return (
    <header>
      <div className="swan">
        <Link to="/" className="logo-link">
          <Logo />
          <h1 className="sr-only">{data.sanityAbout.title}</h1>
        </Link>
      </div>
      <div className="condor">
        <hr />
        <nav className="big-boy">
          {data.allSanityService.nodes.map((service: { slug: { current: string } }, index: number) => (
            <div key={index}>
              {index === 0 && (
                <h2 key={index} className="pine uppercase">
                  <Link
                    to={`/${service.slug.current}`}
                    activeClassName="active"
                    partiallyActive={true}
                  >
                    {service.slug.current}
                  </Link>
                  &nbsp;&amp;&nbsp;
                </h2>
              )}
              {index > 0 && (
                <h2 className="pine uppercase" key={index}>
                  <Link
                    to={`/${service.slug.current}`}
                    activeClassName="active"
                    partiallyActive={true}
                  >
                    {service.slug.current}
                  </Link>
                </h2>
              )}
            </div>
          ))}
        </nav>
        <hr />
      </div>
    </header>
  )
}

export default Header
