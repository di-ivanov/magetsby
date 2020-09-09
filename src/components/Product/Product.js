import React from "react"
import { Link } from "gatsby"
import styles from "./Product.module.css"
import ProductImage from "./ProductImage"
import { Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

const Product = ({ product, categories }) => (
    <div className={styles.container}>
        <div className={`${styles.cell} ${styles.galleryCell}`}>
            <div className={styles.container}>
                {product.media_gallery.map(image => (
                    <div className={styles.imageCell} key={image.url}>
                        <ProductImage
                            fluid={image.imageFile.childImageSharp.fluid}
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
                    {product.price_range.maximum_price.final_price.value}
                    <sup>.00</sup>
                </span>
                €
            </p>

            <div
                dangerouslySetInnerHTML={{
                    __html: product.description.html,
                }}
            />
        </div>
    </div>
)

export default Product
