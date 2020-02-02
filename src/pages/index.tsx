import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'

const Container = styled.div`
  ${tw`flex justify-center`};
`

import Header from '../components/header'

const Layout = ({data}) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <Header />
      {edges.map(edge => {
        const { frontmatter } = edge.node
        return (
          <Container key={frontmatter.date}>
            <Link to={frontmatter.path}>
              {frontmatter.title}
            </Link>
          </Container>
        )
      })}
    </div>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`

export default Layout
