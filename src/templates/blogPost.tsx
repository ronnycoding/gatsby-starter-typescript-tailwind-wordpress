import React from "react"
import { graphql, Link } from "gatsby"

interface TemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
      },
      html: string
    }
  },
  pageContext: {
    next: {
      frontmatter: {
        path: string
      }
    },
    prev: {
      frontmatter: {
        path: string
      }
    }
  }
}

const Template = ({data, pageContext}: TemplateProps) => {
  const {next, prev} = pageContext
  const {markdownRemark} = data;
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html
  return (
    <div>
      <h1>{title}</h1>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{__html: html}}
      />
      {next && 
        <Link to={next.frontmatter.path}>
          Next
        </Link>
      }
      <br />
      {prev && 
        <Link to={prev.frontmatter.path}>
          Previous
        </Link>
      }
    </div>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: {eq: $pathSlug} }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template