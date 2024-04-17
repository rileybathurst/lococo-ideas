import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"
import Logo from "../images/logo"
import { GatsbyImage } from 'gatsby-plugin-image';

const Footer = () => {

  const data = useStaticQuery(graphql`
    query FooterQuery {
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

      sanityTexture(title: {eq: "wood"}) {
        title
        image {
          asset {
            gatsbyImageData
          }
        }
      }
    }
  `)

  const [email, setEmail] = useState('');

  function subject(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  return (
    <footer className="condor">
      <hr />
      <nav className="nav-footer">
        <div className="swan">
          <Link to="/" className='logo-link'>
            <Logo />
            <p className='sr-only'>
              {data.sanityAbout.title}
            </p>
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()}</p>
        {data.allSanityService.nodes.map((service: { slug: { current: string } }) => (
          <Link
            key={service.slug.current}
            to={`/${service.slug.current}`}
            className='capitalize'
            activeClassName="active"
          >
            {service.slug.current}
          </Link>
        ))}
        <h3><Link to="/contact">Contact</Link></h3>
      </nav>
      <form
        name="contact"
        data-netlify="true"
        className="measure"
        netlify-honeypot="bot-field"
        method="POST"
        action="/form-success"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="subject"
          value={`Contact Form from ${data.sanityAbout.title} ${email}`} />

        <label>Name
          <input type="text" name="name" />
        </label>
        <label>Email
          <input type="email" name="email" onChange={subject} />
        </label>
        <label>Phone
          <input type="tel" name="tel" />
        </label>
        <label>Message
          <textarea name="message" />
        </label>
        <label>How did you hear about us?
          <input type="text" name="referral" />
        </label>
        <p className="sr-only">
          <label>
            Don&#39;t fill this out if you&#39;re human:
            <input name="bot-field" />
          </label>
        </p>
        <button type="submit">Send</button>
      </form>

    </footer>
  )
}

export default Footer
