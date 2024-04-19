import * as React from "react"
import { Link } from "gatsby"

const Card = ({ content, breadcrumb, color }) => {

  return (
    <Link
      key={content.title}
      to={`/${breadcrumb}/${content.slug}`}
      className={`card ${color}`}
    >
      {/* <GatsbyImage
        image={project.relatedImages[0].url.asset.gatsbyImageData}
        alt={project.title}
      /> */}
      <img src={content.relatedImages[0].url} />
      <h3>{content.title}</h3>
      <p>{content.excerpt ?? "Lorem ipsum dolor sit amen"}</p>
    </Link>
  )
}

export default Card
