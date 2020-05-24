import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "./Layout"
import Image from "gatsby-image"
import styles from "./Categories.module.css"
import Navigation from "./Categories/Navigation"
import CategoryBreadcrumbs from "./Categories/CategoryBreadcrumbs"
import { Helmet } from "react-helmet"

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
                                        ...GatsbyImageSharpFluid
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

const Category = ({ data }) => {
    const category = data.magentoProducts.categoryList[0]
    const productList = data.magentoProducts.categoryList[0].products.items
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>MaGetsby | {category.name}</title>
            </Helmet>
            <Layout>
                <div className={styles.categoryNav}>
                    <div className={styles.categoryNavCell}>
                        <CategoryBreadcrumbs
                            url={category.url_key}
                            name={category.name}
                            breadcrumbs={category.breadcrumbs}
                        />
                    </div>
                    {category.children.length > 0 && (
                        <div className={styles.categoryNavCellMid}>
                            <Navigation
                                url={category.url_key}
                                children={category.children}
                            />
                        </div>
                    )}
                    <div className={styles.categoryNavCell}>
                    </div>
                </div>
                <ul className={styles.items}>
                    {productList.map(product => (
                        <li key={product.id} className={styles.item}>
                            <Link to={`/product/${product["url_key"]}/`}>
                                <Image
                                    fluid={
                                        product.image.imageFile.childImageSharp
                                            .fluid
                                    }
                                    alt={product.title}
                                    className={styles.productImage}
                                />
                                <h3 className={styles.productName}>{product.name}</h3>
                                <span className={styles.productPrice}>
                                    {
                                        product.price_range.maximum_price
                                            .final_price.value
                                    }
                                    <sup>.00</sup>
                                </span>
                                €
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        </div>
    )
}

export default Category