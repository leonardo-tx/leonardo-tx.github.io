import { useEffect, useRef, JSX } from "react";
import MainNavigationList from "./header/MainNavigationList";
import styles from "../styles/Sidebar.module.css"
import OtherNavigationList from "./header/OtherNavigationList";

interface Props {
    closed: boolean;
    onClose: () => void;
}

export default function Sidebar({ closed, onClose }: Props): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (closed) return;

        const mouseHandler = (e: MouseEvent): void => {
            const menuElement = ref.current;
            if (innerWidth <= 768 && menuElement != null && !menuElement.contains(e.target as Node)) onClose();
        };
        document.addEventListener('mousedown', mouseHandler);
        return () => {
            document.removeEventListener('mousedown', mouseHandler);
        };
    }, [closed, onClose]);

    return (
        <div 
            ref={ref} 
            className={`${styles.sidebar} ${closed && styles["sidebar-close"]}`}>
            <div></div>
            <nav className={styles.nav}>
                <MainNavigationList />
                <OtherNavigationList />
            </nav>
        </div>
);
}
