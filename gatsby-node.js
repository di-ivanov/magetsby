const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createResolvers = async ({
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
}) => {
    const { createNode } = actions

    await createResolvers({
        MAGENTO_ProductImage: {
            imageFile: {
                type: "File",
                async resolve(source) {
                    let sourceUrl = source.sourceUrl

                    if (source.url !== undefined) {
                        sourceUrl = source.url
                    }

                    return await createRemoteFileNode({
                        url: encodeURI(sourceUrl),
                        store,
                        cache,
                        createNode,
                        createNodeId,
                        reporter,
                    })
                },
            },
        },
    })
}

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
        query {
            magentoProducts {
                products(filter: {}, pageSize: 500) {
                    items {
                        sku
                        url_key
                    }
                }
                categoryList(filters: {}) {
                    id
                    url_key
                    breadcrumbs {
                        category_url_key
                    }
                }
            }
        }
    `)

    data.magentoProducts.products.items.forEach(({ sku, url_key }) => {
        actions.createPage({
            path: `/product/${url_key}/`,
            component: path.resolve(`./src/components/Products.js`),
            context: {
                sku: sku,
            },
        })
    })

    data.magentoProducts.categoryList.forEach(
        ({ id, url_key, breadcrumbs }) => {
            let urlPath = "/category/"
            if (breadcrumbs !== null) {
                breadcrumbs.forEach(breadcrumb => {
                    urlPath += `${breadcrumb.category_url_key}/`
                })
            }
            urlPath += `${url_key}/`
            actions.createPage({
                path: urlPath,
                component: path.resolve(`./src/components/Categories.js`),
                context: {
                    id: id.toString(),
                },
            })
        }
    )
}
