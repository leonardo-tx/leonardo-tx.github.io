"use client";

import { JSX } from "react";
import styles from "../../styles/MainNavigation.module.css";
import Link from "next/link";
import useTranslation from "@/data/settings/hooks/useTranslation";
import { IoHome, IoConstruct, IoMegaphone } from "react-icons/io5";

export default function MainNavigationList(): JSX.Element {
    const { t } = useTranslation();

    return (
        <ul className={styles["nav-list"]}>
            <li>
                <Link className={styles["nav-anchor"]} href="/">
                    <IoHome />
                    {t("header.home-link")}
                </Link>
            </li>
            <li>
                <Link className={styles["nav-anchor"]} href="/projects">
                    <IoConstruct />
                    {t("header.projects-link")}
                </Link>
            </li>
            <li>
                <Link className={styles["nav-anchor"]} href="/contacts">
                    <IoMegaphone />
                    {t("header.contacts-link")}
                </Link>
            </li>
        </ul>
    );
}
