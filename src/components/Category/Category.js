import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import styles from "./Category.module.css"
import Navigation from "./Navigation"
import CategoryBreadcrumbs from "./CategoryBreadcrumbs"

const Category = ({ category }) => (
    <div>
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
            <div className={styles.categoryNavCell}></div>
        </div>
        <ul className={styles.items}>
            {category.products.items.map(product => (
                <li key={product.id} className={styles.item}>
                    <Link to={`/product/${product["url_key"]}/`}>
                        <Image
                            fluid={
                                product.image.imageFile.childImageSharp.fluid
                            }
                            alt={product.title}
                            className={styles.productImage}
                        />
                        <h3 className={styles.productName}>{product.name}</h3>
                        <span className={styles.productPrice}>
                            {
                                product.price_range.maximum_price.final_price
                                    .value
                            }
                            <sup>.00</sup>
                        </span>
                        €
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)

export default Category
