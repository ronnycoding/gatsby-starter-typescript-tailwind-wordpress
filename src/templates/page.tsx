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
    wordpressPage: {
      title: string,
      content: string
    }
  },
  pageContext: {
    id: string | number
  }
}

const PageTemplate = ({data, pageContext}: TemplateProps) => {
  const { title, content } = data.wordpressPage
  return (
    <BaseLayout>
      <Container>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </BaseLayout>
  )
}

export const query = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`

export default PageTemplate
