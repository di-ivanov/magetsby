import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Icon, Drawer, Classes, Position, InputGroup } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import styles from "./Layout.module.css"
import BackgroundImage from "gatsby-background-image"

export default function Layout({ children }) {
    const data = useStaticQuery(graphql`
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
            file(relativePath: { eq: "header.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    const categories = data.magentoProducts.categoryList[0].children
    const backgroundImageData = data.file.childImageSharp.fluid
    useEffect(() => {
        let scrollTop =
            window.pageYOffset !== undefined
                ? window.pageYOffset
                : (
                      document.documentElement ||
                      document.body.parentNode ||
                      document.body
                  ).scrollTop
        windowScrollTop = scrollTop / 3
        window.addEventListener("scroll", resetTransform)
        window.addEventListener("scroll", headerColorChange)

        return function cleanup() {
            window.removeEventListener("scroll", resetTransform)
            window.removeEventListener("scroll", headerColorChange)
        }
    })
    let windowScrollTop = 0
    // Paralax effect
    const [transform, setTransform] = useState(
        "translate3d(0," + windowScrollTop + "px,0)"
    )
    const resetTransform = () => {
        let scrollTop =
            window.pageYOffset !== undefined
                ? window.pageYOffset
                : (
                      document.documentElement ||
                      document.body.parentNode ||
                      document.body
                  ).scrollTop
        var windowScrollTop = scrollTop / 3
        setTransform("translate3d(0," + windowScrollTop + "px,0)")
    }

    const headerColorChange = () => {
        const windowsScrollTop =
            window.pageYOffset !== undefined
                ? window.pageYOffset
                : (
                      document.documentElement ||
                      document.body.parentNode ||
                      document.body
                  ).scrollTop
        if (windowsScrollTop > 200) {
            document.body
                .querySelector(".navWrapper")
                .classList.add(styles.stickyNav)
        } else {
            document.body
                .querySelector(".navWrapper")
                .classList.remove(styles.stickyNav)
        }
    }

    const beforeStyle = {
        display: "table",
    }

    const afterStyle = {
        ...beforeStyle,
        clear: "both",
    }

    const [drawerOpen, setDrawerOpen] = useState(false)
    const handleOpen = () => {
        setDrawerOpen(true)
    }
    const handleClose = () => {
        setDrawerOpen(false)
    }

    return (
        <div>
            <div className={`${styles.navWrapper} navWrapper`}>
                <div className={styles.navContainer}>
                    <div
                        className={`${styles.mobileOnly} ${styles.mobileDrawerContainer}`}
                    >
                        <Icon
                            icon={IconNames.MENU}
                            onClick={handleOpen}
                            className={styles.mobileDrawer}
                        />
                    </div>
                    <div className={styles.navLogoContainer}>
                        <Link to="/" title="MaGetsby Store">
                            <svg className={styles.navLogo}>
                                <use href="/logo.svg#logo"></use>
                            </svg>
                        </Link>
                    </div>
                    <div
                        className={`${styles.desktopOnly} ${styles.navCategoriesContainer}`}
                    >
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={`/category/${category["url_key"]}/`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                    <div className={styles.navIconsContainer}>
                        <Link
                            className={`${styles.desktopOnly} ${styles.navIcon}`}
                            to="/"
                        >
                            <Icon icon={IconNames.SEARCH} />
                        </Link>
                        <Link
                            className={`${styles.desktopOnly} ${styles.navIcon}`}
                            to="/"
                        >
                            <Icon icon={IconNames.USER} />
                        </Link>
                        <Link className={styles.navIcon} to="/">
                            <Icon icon={IconNames.SHOPPING_CART} />
                        </Link>
                    </div>
                </div>
            </div>
            <BackgroundImage
                Tag="div"
                fluid={backgroundImageData}
                className={styles.paralaxContainer}
                style={{ transform: transform }}
                fadeIn={false}
            >
                <div className={styles.paralaxContent}>
                    <h2>
                        Many got the looks, but what about the <i>#speed</i>
                    </h2>
                </div>
            </BackgroundImage>
            <div className={styles.wrapper}>
                <div style={beforeStyle} />
                {children}
                <div style={afterStyle} />
            </div>
            <Drawer
                styles={{ zIndex: 100 }}
                icon="info-sign"
                onClose={handleClose}
                position={Position.LEFT}
                size="70%"
                isOpen={drawerOpen}
            >
                <div className={Classes.DRAWER_BODY}>
                    <div className={Classes.DIALOG_BODY}>
                        <svg style={{ width: `34px`, height: `24px` }}>
                            <use href="/logo.svg#logo"></use>
                        </svg>
                        <Icon
                            icon={IconNames.CROSS}
                            onClick={handleClose}
                            style={{ float: `right`, cursor: `pointer` }}
                            iconSize="24"
                        />
                        <h3>Categories</h3>
                        <ul style={{ padding: `0 1rem` }}>
                            {categories.map(category => (
                                <li
                                    key={category.id}
                                    style={{
                                        listStyle: `none`,
                                        margin: `0.25rem 0`,
                                    }}
                                >
                                    <Link
                                        to={`/category/${category["url_key"]}/`}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h3>Navigate</h3>
                        <ul style={{ padding: `0 1rem` }}>
                            <li
                                style={{
                                    listStyle: `none`,
                                    margin: `0.25rem 0`,
                                }}
                            >
                                <Link to="/">My Account</Link>
                            </li>
                            <li
                                style={{
                                    listStyle: `none`,
                                    margin: `0.25rem 0`,
                                }}
                            >
                                <Link to="/">Cart</Link>
                            </li>
                        </ul>
                        <h3>Search</h3>
                        <div style={{ marginLeft: `1rem` }}>
                            <InputGroup
                                leftIcon={IconNames.SEARCH}
                                placeholder="... is it a dress?"
                            />
                        </div>
                    </div>
                </div>
                <div className={Classes.DRAWER_FOOTER}>MaGetsby Demo Store</div>
            </Drawer>
        </div>
    )
}
