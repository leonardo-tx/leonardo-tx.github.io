import { JSX } from "react";
import styles from "../styles/Header.module.css";
import MainNavigationList from "./header/MainNavigationList";
import OtherNavigationList from "./header/OtherNavigationList";
import { IconButton } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";

interface Props {
    onOpen: () => void;
}

export default function Header({ onOpen }: Props): JSX.Element {
    return (
        <header className={styles.header}>
            <IconButton 
                variant="ghost" 
                className={styles["sidebar-button"]} 
                aria-label="Open sidebar" 
                icon={<IoMenu size={21} />}
                onClick={() => onOpen()}
            />
            <nav className={styles.nav}>
                <MainNavigationList />
                <OtherNavigationList />
            </nav>
        </header>
    );
}
