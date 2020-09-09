import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { Helmet } from "react-helmet"
import Category from "../components/Category"

export const query = graphql`
    query($id: String!) {
        magentoProducts {
            categoryList(filters: { ids: { eq: $id } }) {
                id
                name
                path
                url_key
                children {
                    id
                    url_key
                    name
                }
                url_key
                breadcrumbs {
                    category_id
                    category_url_key
                    category_name
                }
                products {
                    items {
                        id
                        sku
                        url_key
                        name
                        description {
                            html
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
                            imageFile {
                                childImageSharp {
                                    fluid(maxWidth: 400) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

const CategoryTemplate = ({ data }) => {
    const category = data.magentoProducts.categoryList[0]
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>MaGetsby | {category.name}</title>
            </Helmet>
            <Layout>
                <Category category={category} />
            </Layout>
        </div>
    )
}

export default CategoryTemplate
