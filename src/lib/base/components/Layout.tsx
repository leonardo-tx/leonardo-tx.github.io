import { JSX, ReactNode} from "react";
import Main from "./Main";
import styles from "../styles/Layout.module.css";
import Footer from "./Footer";
import Providers from "./Providers";
import HeaderSidebar from "./HeaderSidebar";

interface Props {
    children?: ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
    return (
        <body className={styles.layout}>
            <Providers>
                <HeaderSidebar />
                <Main>
                    {children}
                </Main>
                <Footer />
            </Providers>
        </body>
    );
}
