/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    /* Your site config here */
    plugins: [
        {
            resolve: "gatsby-source-graphql",
            options: {
                // This type will contain remote schema Query type
                typeName: "MAGENTO",
                // This is the field under which it's accessible
                fieldName: "magentoProducts",
                // URL to query from
                url:
                    "https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/graphql",
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
            },
        },
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        "gatsby-plugin-react-helmet",
    ],
}
