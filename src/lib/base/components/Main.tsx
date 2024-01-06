import { JSX, ReactNode } from "react";
import styles from "../styles/Main.module.css";

interface Props {
    children?: ReactNode
}

export default function Main({ children }: Props): JSX.Element {
    return (
        <main className={styles.content}>
            {children}
        </main>
    );
}