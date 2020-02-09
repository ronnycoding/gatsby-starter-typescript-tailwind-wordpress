import React from 'react'
import { graphql, Link } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'

import BaseLayout from '../components/base-layout'


type TemplateProps = {
  data: {
    wordpressPost: {
      id: string,
      slug: string,
      title: string,
      excerpt: string,
      date: string,
      featured_media: {
        localFile: {
          childImageSharp: {
            fixed: FixedObject
          }
        }
      },
      author: {
        avatar_urls: {
          wordpress_96: string
        },
        name: string,
        slug: string
      },
      tags: [
        {
          name: string,
          slug: string
        }
      ]
      acf: {
        time_reading: string,
        content: string,
        title: string
      },
      categories: [
        {
          name: string,
          slug: string
        }
      ]
    }
  }
}

const BlogPostTemplate = ({data}: TemplateProps) => {
  const {
    title,
    slug,
    acf,
    date,
    featured_media
  } = data.wordpressPost
  return (
    <BaseLayout>
      <div className={`flex flex-col items-center justify-start`}>
        <div className={`container flex flex-col`}>
          <Img 
            fixed={featured_media.localFile.childImageSharp.fixed}
            className="w-full"
            placeholderStyle={{ backgroundColor: `white` }}
          />
          <Link to={slug} className={`font-sans text-4xl justify-between font-bold`}>{title}</Link>
          <p className={`font-sans text-1xl justify-between mb-4`}>{date}</p>
          <div dangerouslySetInnerHTML={{ __html: acf.content.replace(/<p>/g, '<p class="font-sans pb-2">') }}/>
        </div>
      </div>
    </BaseLayout>
  )
}

export const query = graphql`
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      slug
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      acf {
        content
        title
        time_reading
      }
      date(formatString: "MMMM DD, YYYY")
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
        author {
          avatar_urls {
            wordpress_96
          }
          name
          slug
        }
      }
    }
  }
`


export default BlogPostTemplate
