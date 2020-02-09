import React from 'react'
import { graphql, Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

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
            fluid: FluidObject
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
      <div className={`container font-sans text-gray-800 p-4`}>
        <Img 
          fluid={featured_media.localFile.childImageSharp.fluid}
          className="w-full"
          placeholderStyle={{ backgroundColor: `white` }}
        />
        <Link to={slug} className={`text-4xl font-sans text-gray-800 font-bold`}>{title}</Link>
        <p className={`font-sans text-1xl mb-4`}>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: acf.content.replace(/<p>/g, '<p class="font-sans pb-2 font-sans text-gray-800 text-justify">') }}/>
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
      author {
        avatar_urls {
          wordpress_96
        }
        name
        slug
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


export default BlogPostTemplate
