import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Container, Row, Col } from 'react-grid-system'

const StyledLink = styled(Link)`
  ${tw`no-underline`}
`

const StyledTitle = styled.h2`
  ${tw`font-sans text-3xl text-gray-900 font-normal`}
`

const StyledDescription = styled.p`
  ${tw`font-sans text-sm text-gray-800 font-light`}
`

interface TitleAndDescriptionProps {
  data: {
    site: {
      siteMetadata: {
        title: String,
        description: String
      }
    }
  }
}

const TitleAndDescription = ({data}: TitleAndDescriptionProps) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description
  return (
    <Container>
      <Row>
        <Col>
          <StyledLink to={'/'}>
            <StyledTitle>{title}</StyledTitle>
          </StyledLink>
          <StyledDescription>{description}</StyledDescription>
        </Col>
      </Row>
    </Container>
  )
}

const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <TitleAndDescription data={data} />}
    />
  )
}

export default Header
