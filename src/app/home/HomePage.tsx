"use client";

import { JSX } from "react";
import InfoBanner from "./components/InfoBanner";
import ProjectSlider from "./components/ProjectSlider";
import styles from "./styles/Home.module.css";
import { Heading } from "@chakra-ui/react";
import useTranslation from "@/data/settings/hooks/useTranslation";

export default function HomePage(): JSX.Element {
    const { t } = useTranslation();

    return (
        <div className={styles.home}>
            <InfoBanner />
            <section className={styles["home-projects"]}>
                <Heading size="lg">{t("pages.home.projects-heading")}</Heading>
                <ProjectSlider />
            </section>
        </div>
    );
}