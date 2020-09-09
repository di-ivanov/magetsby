import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import styles from "./ProductImage.module.css"

export const productImageFragment = graphql`
    fragment productImageFragment on MAGENTO_ProductImage {
        url
        imageFile {
            childImageSharp {
                fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                }
            }
        }
    }
`

export default function ProductImage({ fluid, alt }) {
    return (
        <div className={styles.test}>
            <Image fluid={fluid} alt={alt} className={styles.productImage} />
        </div>
    )
}
