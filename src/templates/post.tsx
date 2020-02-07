import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import BaseLayout from '../components/base-layout'

const Container = tw.div`flex justify-center flex-col`

const CategoriesContainer = tw.div`flex flex-col`

const StyledLink = styled(Link)`
  ${tw`font-sans text-lg text-red-800 no-underline mb-3`}
`

const StyledCategoryLink = styled(Link)`
  ${tw`font-sans text-sm text-blue-500 mb-1`}
`



type TemplateProps = {
  data: {
    wordpressPost: {
      content: string,
      slug: string,
      categories: {
        name: string,
        slug: string
      },
      // tags: {
      //   name: string,
      //   slug: string
      // },
      title: string,
      date: string,
      author: {
        name: string,
        slug: string
      },
    }
  }
}

const BlogPostTemplate = ({data}: TemplateProps) => {
  const { content, categories, title, date, author, slug} = data.wordpressPost
  return (
    <BaseLayout>
      <Container>
        <StyledLink to={slug}>{title}</StyledLink>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {categories && (
          <CategoriesContainer>
            <p>Categories</p>
            {categories.map(({ name, slug }) => (<StyledCategoryLink key={slug} to={slug}>{name}</StyledCategoryLink>))}
          </CategoriesContainer>
        )}
      </Container>
    </BaseLayout>
  )
}

export const query = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
      categories {
        name
        slug
      }
      # tags {
      #   name
      #   slug
      # }
      author {
        name
        slug
      }
    }
  }
`


export default BlogPostTemplate
