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
    wordpressSiteMetadata: {
      name: string,
      description: string
    }
  }
}

const TitleAndDescription = ({data}: TitleAndDescriptionProps) => {
  const { name, description } = data.wordpressSiteMetadata
  return (
    <Container>
      <Row>
        <Col>
          <StyledLink to={'/'}>
            <StyledTitle>{name}</StyledTitle>
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
          wordpressSiteMetadata {
            name
            description
          }
        }
      `}
      render={data => <TitleAndDescription data={data} />}
    />
  )
}

export default Header
