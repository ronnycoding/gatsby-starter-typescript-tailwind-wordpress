import React from 'react'
import { graphql, Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import BaseLayout from '../components/base-layout'

type TemplateProps = {
  data: {
    wordpressPage: {
      slug: string,
      date: string,
      acf: {
        title: string,
        content: string
      },
      featured_media: {
        localFile: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    }
  },
  pageContext: {
    id: string | number
  }
}

const PageTemplate = ({ data }: TemplateProps) => {
  const { acf, featured_media } = data.wordpressPage
  const { title, content } = acf
  return (
    <BaseLayout>
      <div className={`container font-sans text-gray-800 p-4`}>
        <Img 
          fluid={featured_media.localFile.childImageSharp.fluid}
          className="w-full"
          placeholderStyle={{ backgroundColor: `white` }}
        />
        <h1 className={`text-4xl font-sans text-gray-800 font-bold`}>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.replace(/<p>/g, '<p class="font-sans pb-2 font-sans text-gray-800 text-justify">') }} />
      </div>
    </BaseLayout>
  )
}

export const query = graphql`
  query QueryPage($id: String!) {
    wordpressPage(id: { eq: $id }) {
      slug
      date(formatString: "MMMM DD, YYYY")
      acf {
        title
        content
      }
      featured_media {
        localFile {
          childImageSharp {
            fluid {
              base64
              src
              srcSet
              aspectRatio
            }
          }
        }
      }
    }
  }
`

export default PageTemplate
