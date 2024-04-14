"use client";

import { JSX } from "react";
import ElementsView from "./components/ElementsView";
import styles from "./styles/SortVisualizer.module.css";
import SortSettings from "./components/SortSettings";

export default function SortVisualizer(): JSX.Element {
    return (
        <section className={styles["sort-visualizer"]}>
            <SortSettings />
            <ElementsView /> 
        </section>
    );
}
