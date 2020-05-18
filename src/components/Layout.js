import React from "react"
import { Link } from "gatsby"
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Alignment,
    Icon,
} from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import styles from "./Layout.module.css"

const ListLink = props => (
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

export default function Layout({ children }) {
    React.useEffect(() => {
        if (window.innerWidth >= 768) {
            windowScrollTop = window.pageYOffset / 3
            window.addEventListener("scroll", resetTransform)
            window.addEventListener("scroll", headerColorChange)
        }
        return function cleanup() {
            if (window.innerWidth >= 768) {
                window.removeEventListener("scroll", resetTransform)
            }
            window.removeEventListener("scroll", headerColorChange)
        }
    })
    let windowScrollTop = 0
    // Paralax effect
    const [transform, setTransform] = React.useState(
        "translate3d(0," + windowScrollTop + "px,0)"
        )
    const resetTransform = () => {
        var windowScrollTop = window.pageYOffset / 3
        setTransform("translate3d(0," + windowScrollTop + "px,0)")
    }

    const headerColorChange = () => {
        const windowsScrollTop = window.pageYOffset
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
    return (
        <div>
            <div className={`${styles.navWrapper} navWrapper`}>
                <Navbar className={styles.navContainer}>
                    <NavbarGroup align={Alignment.LEFT}>
                        <NavbarHeading>
                            <Link to="/" className={styles.navLogo}>
                                My Store
                            </Link>
                        </NavbarHeading>
                    </NavbarGroup>
                    {/* <NavbarGroup>
                        <Link>Bottoms</Link>
                        <Link>Dresses</Link>
                        <Link>Tops</Link>
                        <Link>Accessories</Link>
                        <Link>Shop The Look</Link>
                    </NavbarGroup> */}
                    <NavbarGroup align={Alignment.RIGHT}>
                        <Link className={styles.navIcon}>
                            <Icon icon={IconNames.SEARCH} iconSize={`1.1rem`} />
                        </Link>
                        <Link className={styles.navIcon}>
                            <Icon icon={IconNames.USER} iconSize={`1.1rem`} />
                        </Link>
                        <Link className={styles.navIcon}>
                            <Icon
                                icon={IconNames.SHOPPING_CART}
                                iconSize={`1.1rem`}
                            />
                        </Link>
                    </NavbarGroup>
                </Navbar>
            </div>
            <div
                className={styles.paralaxContainer}
                style={{ transform: transform }}
            >
                <div className={styles.paralaxContent}>
                    <h2>
                        Many got the looks, but what about the <i>#speed</i>
                    </h2>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div style={beforeStyle} />
                {children}
                <div style={afterStyle} />
            </div>
        </div>
    )
}
