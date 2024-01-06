import { JSX } from "react";
import styles from "../styles/Header.module.css";
import MainNavigationList from "./header/MainNavigationList";
import OtherNavigationList from "./header/OtherNavigationList";

export default function Header(): JSX.Element {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <MainNavigationList />
                <OtherNavigationList />
            </nav>
        </header>
    )
}