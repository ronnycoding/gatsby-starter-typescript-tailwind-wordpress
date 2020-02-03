import React from "react"
import { graphql, Link } from "gatsby"
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { Container, Row, Col } from 'react-grid-system'

import Header from '../header'

const PageContainer = tw.div`min-h-screen bg-gray-100`

interface BaseLayoutProp {
  children: JSX.Element
}

const BaseLayout = ({ children }: BaseLayoutProp) => {
  return (
      <PageContainer>
        <Header />
        {children}
      </PageContainer>
    )
}

export default BaseLayout