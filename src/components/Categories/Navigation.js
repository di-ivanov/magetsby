import React from "react"
import { Link } from "gatsby"
import { Tag } from "@blueprintjs/core"

export default function Navigation({ url, children }) {
    return (
        <div style={{ textAlign: `center` }}>
            {children.map(child => (
                <Link
                    key={child.id}
                    to={`/category/${url}/${child.url_key}/`}
                    style={{ margin: `0 1rem` }}
                >
                    <Tag minimal={true} large={true} interactive={true}>
                        {child.name}
                    </Tag>
                </Link>
            ))}
        </div>
    )
}
