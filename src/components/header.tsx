import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Logo from "../images/logo"

const Header = () => {

  const { sanityAbout } = useStaticQuery(graphql`
    query HeaderQuery {
      sanityAbout {
        title
      }
    }
  `)

  return (
    <header >
      <div className="swan">
        <Link to='/'>
          <Logo />
          <h1 className="sr-only">{sanityAbout.title}</h1>
        </Link>
      </div>
      <div className="condor">
        <hr />
        <h2 className="pine text-center">ARCHITECTURE &amp; EXHIBITS</h2>
        <hr />
      </div>
    </header>
  )
}

export default Header
