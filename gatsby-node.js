/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const path = require('path')

exports.onCreateWebpackConfig = ({actions, getConfig}) => {
  // Hack due to Tailwind ^1.1.0 using `reduce-css-calc` which assumes node
  // https://github.com/bradlc/babel-plugin-tailwind-components/issues/39#issuecomment-526892633
  const config = getConfig()
  config.node = {
    fs: 'empty',
  }
}

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.tsx')

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: {order: ASC, fields: [frontmatter___date]}
            ) {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `,
      ).then((result) => {
        const posts = result.data.allMarkdownRemark.edges
        posts.forEach(({ node }, index) => {
          const path = node.frontmatter.path
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path,
              prev: index === 0 ? null : posts[index - 1].node,
              next: index === (posts.length - 1) ? null : posts[index + 1].node,
            },
          })

          resolve()
        })
      }),
    )
  })
}
