import * as React from "react"
import { Link, } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Page not found</h1>
        <p>
          Sorry, this page is still being drawn up.
          Start again from the <Link to="/">home page</Link>.
        </p>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage
