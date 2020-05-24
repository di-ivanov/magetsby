import React from "react"
import Layout from "./Layout"
import { graphql, Link } from "gatsby"
import styles from "./Products.module.css"
import ProductImage from "./Products/ProductImage"
import { Helmet } from "react-helmet"
import { Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

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

const Product = ({ data }) => {
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
                <div className={styles.container}>
                    <div className={`${styles.cell} ${styles.galleryCell}`}>
                        <div className={styles.container}>
                            {product.media_gallery.map(image => (
                                <div
                                    className={styles.imageCell}
                                    key={image.url}
                                >
                                    <ProductImage
                                        fluid={
                                            image.imageFile.childImageSharp
                                                .fluid
                                        }
                                        alt={product.name}
                                    />
                                </div>
                            ))}
                        </div>
                        {product.media_gallery.length && (
                            <Icon
                                icon={IconNames.LAYOUT_SORTED_CLUSTERS}
                                className={styles.moreImages}
                            />
                        )}
                    </div>
                    <div className={`${styles.cell} ${styles.content}`}>
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={category.url}
                                className={styles.categoryLinks}
                            >
                                #{category.name}
                            </Link>
                        ))}
                        <h1>{product.name}</h1>
                        <p>
                            Price: &nbsp;
                            <span className={styles.productPrice}>
                                {
                                    product.price_range.maximum_price
                                        .final_price.value
                                }
                                <sup>.00</sup>
                            </span>€
                        </p>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: product.description.html,
                            }}
                        />
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Product
