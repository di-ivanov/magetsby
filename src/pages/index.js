import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/Layout"
import styles from "./index.module.css"

export const query = graphql`
    query {
        magentoProducts {
            categoryList {
                children {
                    id
                    name
                    url_key
                }
            }
        }

        accesories: file(relativePath: { eq: "accesories.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 824) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        dresses: file(relativePath: { eq: "dresses.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 824) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        look: file(relativePath: { eq: "look.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 824) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        bottoms: file(relativePath: { eq: "bottoms.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 408) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

const Index = ({ data }) => {
    const categories = data.magentoProducts.categoryList[0].children
    console.log(data)
    return (
        <div>
            <Layout>
                <div className={styles.container}>
                    <Link to="/category/venia-accessories/" className={styles.cellSmall}><Image fluid={data.accesories.childImageSharp.fluid}/></Link>
                    <Link to="/category/venia-dresses/" className={styles.cell}><Image fluid={data.dresses.childImageSharp.fluid}/></Link>
                    <Link to="/category/shop-the-look/" className={styles.cell}><Image fluid={data.look.childImageSharp.fluid}/></Link>
                    <Link to="/category/venia-bottoms/" className={styles.cellSmall}><Image fluid={data.bottoms.childImageSharp.fluid}/></Link>
                </div>
            </Layout>
        </div>
    )
}
export default Index
