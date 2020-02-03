import React from "react"
import { graphql, Link } from "gatsby"
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const StyledLink = styled(Link)`
  ${tw`font-sans text-lg text-gray-800 text-center no-underline mb-3`}
`

const BlogTitle = styled.h2`
  ${tw`text-3xl font-sans font-light text-gray-500`}
`

const BlogDescription = styled.div`
  ${tw`text-lg font-sans font-light text-gray-600`}
`
// .text-lg
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
      <BlogTitle>{title}</BlogTitle>
      <BlogDescription
        className="blogpost"
        dangerouslySetInnerHTML={{__html: html}}
      />
      {next && 
        <StyledLink to={next.frontmatter.path}>
          Next
        </StyledLink>
      }
      <br />
      {prev && 
        <StyledLink to={prev.frontmatter.path}>
          Previous
        </StyledLink>
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