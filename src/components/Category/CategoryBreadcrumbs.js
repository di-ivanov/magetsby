import React from "react"
import { Link } from "gatsby"
import { Classes } from "@blueprintjs/core"

export default function CategoryBreadcrumbs({ url, name, breadcrumbs }) {
    let breadcrumbsData = []
    breadcrumbsData[0] = { text: "Home", href: "/", icon: "home" }
    if (breadcrumbs !== null) {
        const breadcrumb = breadcrumbs[0]
        breadcrumbsData[2] = {
            text: breadcrumb.category_name,
            href: `/category/${breadcrumb.category_url_key}/`,
        }
        breadcrumbsData[3] = {
            text: name,
            href: `/category/${breadcrumb.category_url_key}/${url}/`,
        }
    } else {
        breadcrumbsData[2] = { text: name, href: `/category/${url}/` }
    }
    return (
        <ul className={Classes.BREADCRUMBS}>
            {breadcrumbsData.map(breadcrumb => (
                <li key={breadcrumb.href}>
                    <Link to={breadcrumb.href} className={Classes.BREADCRUMB}>
                        {/* {breadcrumb.icon && <Icon icon={breadcrumb.icon} />} */}
                        {breadcrumb.text}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
