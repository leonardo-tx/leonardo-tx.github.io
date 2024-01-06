import { JSX, ReactNode } from "react";
import Main from "./Main";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Providers from "./Providers";

interface Props {
    children?: ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
    return (
        <body className={styles.layout}>
            <Providers>
                <Header />
                <Main>
                    {children}
                </Main>
                <Footer />
            </Providers>
        </body>
    );
}