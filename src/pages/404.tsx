import * as React from "react"
import { Link, } from "gatsby"

const NotFoundPage = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        Sorry, this page is still being drawn up.
        Start again from the <Link to="/">home page</Link>.
      </p>
    </main>
  )
}

export default NotFoundPage
