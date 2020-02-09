import React from 'react'
import { graphql, Link } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'

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
            fixed: FixedObject
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
      <div className={`flex flex-col items-center justify-start`}>
        <div className={`container`}>
          <Img 
            fixed={featured_media.localFile.childImageSharp.fixed}
            className="w-full"
            placeholderStyle={{ backgroundColor: `white` }}
          />
          <h1 className={`text-4xl`}>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.replace(/<p>/g, '<p class="font-sans pb-2">') }} />
        </div>
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
            fixed(width: 1200) {
              base64
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }
`

export default PageTemplate
