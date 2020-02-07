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
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        /*
         * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
         * Example : 'demo.wp-api.org' or 'www.example-site.com'
         */
        baseUrl: 'dev-gatsby-starter-typescript-tailwind-wordpress.pantheonsite.io',
        // The protocol. This can be http or https.
        protocol: 'https',
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the assumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // If useACF is true, then the source plugin will try to import the WordPress ACF Plugin contents.
        // This feature is untested for sites hosted on wordpress.com.
        // Defaults to true.
        useACF: true,
        // Include specific ACF Option Pages that have a set post ID
        // Regardless if an ID is set, the default options route will still be retrieved
        // Must be using V3 of ACF to REST to include these routes
        // Example: `["option_page_1", "option_page_2"]` will include the proper ACF option
        // routes with the ID option_page_1 and option_page_2
        // The IDs provided to this array should correspond to the `post_id` value when defining your
        // options page using the provided `acf_add_options_page` method, in your WordPress setup
        // Dashes in IDs will be converted to underscores for use in GraphQL
        acfOptionPageIds: [],
        // Set cookies that should be send with requests to WordPress as key value pairs
        cookies: {},
        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems.
        verboseOutput: false,
        // Set how many pages are retrieved per API request.
        perPage: 100,
        // Search and Replace Urls across WordPress content.
        // searchAndReplaceContentUrls: {
        //   sourceUrl: 'https://source-url.com',
        //   replacementUrl: 'https://replacement-url.com',
        // },
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        // Set WP REST API routes whitelists
        // and blacklists using glob patterns.
        // Defaults to whitelist the routes shown
        // in the example below.
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]`
        // ` will either include or exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        // Whitelisted routes using glob patterns
        includedRoutes: [
          '**/categories',
          '**/posts',
          '**/pages',
          '**/media',
          '**/tags',
          '**/taxonomies',
          '**/users',
        ],
        // Blacklisted routes using glob patterns
        // excludedRoutes: ['**/posts/1456'],
        // Set this to keep media sizes.
        // This option is particularly useful in case you need access to
        // URLs for thumbnails, or any other media detail.
        // Defaults to false
        keepMediaSizes: false,
        // use a custom normalizer which is applied after the built-in ones.
        // normalizer: function({ entities }) {
        //   return entities
        // },
        // The normalizers option allows you to manipulate the array of internal
        // normalizers that are applied to entities after they're fetched
        // from WordPress.
        // You can add your own normalizers to this array by adding an object
        // that contains name and normalizer properties.
        // Name is the name of your normalizer, and normalizer is a function that
        // should return the array of entities that are passed to it.
        // This is useful if you need more control over the order of normalizers,
        // instead of your normalizer being applied after the built in normalizers (as is the case with the normalizer option).
        // normalizers: normalizers => [
        //   ...normalizers,
        //   {
        //     name: 'nameOfTheFunction',
        //     normalizer: function({ entities }) {
        //       // manipulate entities here
        //       return entities
        //     },
        //   },
        // ],
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
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
