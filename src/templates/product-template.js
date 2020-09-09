import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Product from "../components/Product"

export const query = graphql`
    query($sku: String!) {
        magentoProducts {
            products(filter: { sku: { eq: $sku } }, pageSize: 1) {
                items {
                    sku
                    name
                    description {
                        html
                    }
                    categories {
                        id
                        name
                        url_key
                        breadcrumbs {
                            category_id
                            category_name
                            category_url_key
                        }
                    }
                    price_range {
                        maximum_price {
                            final_price {
                                value
                                currency
                            }
                        }
                    }
                    image {
                        url
                        ...productImageFragment
                    }
                    media_gallery {
                        url
                        ...productImageFragment
                    }
                }
            }
        }
    }
`

const ProductTemplate = ({ data }) => {
    const product = data.magentoProducts.products.items[0]
    let includedCategories = []
    let categories = []
    product.categories.forEach(category => {
        if (!includedCategories.includes(category.id)) {
            includedCategories.push(category.id)
            if (
                category.breadcrumbs !== null &&
                category.breadcrumbs.length > 0
            ) {
                let parentPath = ""
                category.breadcrumbs.forEach(breadcrumb => {
                    parentPath += `${breadcrumb.category_url_key}/`
                })
                categories.push({
                    id: category.id,
                    name: category.name,
                    url: `/category/${parentPath}${category.url_key}/`,
                })
            } else {
                categories.push({
                    id: category.id,
                    name: category.name,
                    url: `/category/${category.url_key}/`,
                })
            }
        }
    })

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>MaGetsby | {product.name}</title>
            </Helmet>
            <Layout>
                <Product product={product} categories={categories} />
            </Layout>
        </div>
    )
}

export default ProductTemplate
