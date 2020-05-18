import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

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
    }
`

const Index = ({ data }) => {
    const categories = data.magentoProducts.categoryList[0].children

    return (
        <div>
            <Layout>
                <h3>Categories:</h3>
                <ul>
                    {categories.map(category => (
                        <li
                            key={category.id}
                            style={{ clear: "both", display: "block" }}
                        >
                            <Link to={`/category/${category['url_key']}/`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        </div>
    )
}
export default Index
