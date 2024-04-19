import * as React from "react"
import { Link, } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"

const ContactPage = () => {
  return (
    <>
      <Header />
      <main className="pelican">
        <h1>Contact</h1>
        <p>
          Get in touch
        </p>
      </main>
      <Footer />
    </>
  )
}

export default ContactPage
