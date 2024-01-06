"use client";

import { JSX } from "react";
import styles from "../../styles/Header.module.css";
import Link from "next/link";
import useTranslation from "@/data/settings/hooks/useTranslation";

export default function MainNavigationList(): JSX.Element {
    const { t } = useTranslation();

    return (
        <ul className={styles["nav-list"]}>
            <li>
                <Link className={styles["nav-anchor"]} href="/">{t("header.home-link")}</Link>
            </li>
            <li>
                <Link className={styles["nav-anchor"]} href="/projects">{t("header.projects-link")}</Link>
            </li>
            <li>
                <Link className={styles["nav-anchor"]} href="/about">{t("header.about-link")}</Link>
            </li>
        </ul>
    );
}