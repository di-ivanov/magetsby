import React from "react"
import Layout from "./Layout"
import { graphql, Link } from "gatsby"
import styles from "./Products.module.css"
import ProductImage from "./Products/ProductImage"

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
            if (category.breadcrumbs !== null && category.breadcrumbs.length > 0) {
                let parentPath = ''
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
        <Layout>
            <div className={styles.container}>
                <div className={styles.cell}>
                    <div className={styles.container}>
                        {product.media_gallery.map(image => (
                            <div className={styles.imageCell} key={image.url}>
                                <ProductImage
                                    fluid={
                                        image.imageFile.childImageSharp.fluid
                                    }
                                    alt={product.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${styles.cell} ${styles.content}`}>
                    {categories.map(category => (
                        <Link key={category.id} to={category.url} className={styles.categoryLinks}>#{category.name}</Link>
                    ))}
                    <h1>{product.name}</h1>
                    <p>
                        Price: $
                        <strong>
                            {
                                product.price_range.maximum_price.final_price
                                    .value
                            }
                        </strong>
                    </p>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: product.description.html,
                        }}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Product
