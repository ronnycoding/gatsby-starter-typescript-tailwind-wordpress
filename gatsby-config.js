/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'My blog',
    description: 'This is my cool blog',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      // options: {
      //   name: 'gatsby-starter-tailwind',
      //   short_name: 'starter',
      //   start_url: '/',
      //   background_color: '#ffffff',
      //   theme_color: '#4dc0b5',
      //   display: 'minimal-ui',
      //   icon: 'src/images/tailwind-icon.png',
      // },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/css/style.css'],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: 'Roboto',
              variants: ['300', '400', '500'],
            },
            {
              family: 'Open Sans Condensed',
              variants: ['300', '700'],
            },
          ],
        },
      },
    },
  ],
}
