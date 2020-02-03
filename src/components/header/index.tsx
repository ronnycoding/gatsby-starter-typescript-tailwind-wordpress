import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'

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
    <div>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
    </div>
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
