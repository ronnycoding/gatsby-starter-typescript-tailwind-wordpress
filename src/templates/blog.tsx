import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import BaseLayout from '../components/base-layout'

const Container = tw.div`flex justify-center flex-col`

const StyledLink = styled(Link)`
  ${tw`font-sans text-lg text-gray-800 text-center no-underline mb-3`}
`

type TemplateProps = {
  data: {
    allWordpressPost: {
      edges: []
    }
  },
  pageContext: {
    currentPage: number,
    numPages: number
  }
}

const BlogTemplate = ({data, pageContext}: TemplateProps) => {
  const { edges } = data.allWordpressPost
  return (
    <BaseLayout>
      <Container>
        {edges.map(({ node }) => {
          const { id, slug, title } = node
          return (
            <StyledLink key={id} to={slug}>{title}</StyledLink>
          )
        })}
      </Container>
    </BaseLayout>
  )
}

export const query = graphql`
  query IndexQuery($limit: Int!, $skip: Int!) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`

export default BlogTemplate
