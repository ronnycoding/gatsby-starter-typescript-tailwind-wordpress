import React from 'react'
import { graphql, Link } from 'gatsby'
// import styled from '@emotion/styled'
import Img, { FixedObject } from 'gatsby-image'
// import Img from '../components/image'

import BaseLayout from '../components/base-layout'

type TemplateProps = {
  data: {
    allWordpressPost: {
      nodes: [
        {
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
            }
          },
          tags: [
            {
              name: string,
              slug: string
            }
          ]
          acf: {
            time_reading: string
          }
        }
      ]
    }
  },
  pageContext: {
    currentPage: number,
    numPages: number
  }
}

const PostCard = ({
  slug,
  title,
  featureImage,
  author,
  excerpt,
  tags,
  timeReading,
  date
}: {
  slug: string,
  title: string,
  featureImage: FixedObject,
  author: string,
  excerpt: string,
  tags: [
    {
      name: string,
      slug: string
    }
  ],
  timeReading: string,
  date: string
}) => {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white max-w-xl my-3">
      <div className="w-full">
        <Img 
          fixed={featureImage}
          className="w-full"
          placeholderStyle={{ backgroundColor: `white` }}
        />
      </div>
      <div className="px-2 pb-5">
        <Link className="text-4xl justify-between font-bold" to={slug}><h1>{ title }</h1></Link>
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full mr-4" src={author} />
          <div className="text-sm">
            <div className="text-gray-900 leading-none text-xl font-bold" dangerouslySetInnerHTML={{ __html: excerpt }} />
            {/* <span className="font-thin text-gray-700">(7 hours ago)</span> */}
            {tags.length && (
              <p className="text-black-600">
                {tags.map(({name, slug}) => <span className="pr-1"><Link className="text-underline" to={`tags/${slug}`}>{`#${name}`}</Link></span>)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center pb-5 px-5">
        <div className="w-1/3 flex">
          <div className="text-sm">
            <span>{`${date}`}</span>
          </div>
        </div>
        <div className="w-1/3"></div>
        <div className="w-1/3 float-right text-right">
          <div className="text-sm">
            <span>{`${timeReading} min read`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogTemplate = ({data, pageContext}: TemplateProps) => {
  const { nodes } = data.allWordpressPost
  return (
    <BaseLayout>
      <div className={`flex flex-col items-center justify-start`}>
        <div className={`container flex flex-col items-center`}>
          {nodes.map(({ id, slug, title, featured_media, author, excerpt, tags, acf, date}) => {
            return (
                <PostCard
                  key={id}
                  slug={slug}
                  title={title}
                  featureImage={featured_media.localFile.childImageSharp.fixed}
                  author={author.avatar_urls.wordpress_96}
                  excerpt={excerpt}
                  tags={tags}
                  timeReading={acf.time_reading}
                  date={date}
                />
              )
          })}
        </div>
      </div>
    </BaseLayout>
  )
}

export const query = graphql`
  query IndexQuery($limit: Int!, $skip: Int!) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        slug
        title
        featured_media {
          localFile {
            childImageSharp {
              fixed(width: 600) {
                base64
                width
                height
                src
                srcSet
              }
            }
          }
        }
        author {
          avatar_urls {
            wordpress_96
          }
        }
        excerpt
        tags {
          name
          slug
        }
        acf {
          time_reading
        }
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export default BlogTemplate
