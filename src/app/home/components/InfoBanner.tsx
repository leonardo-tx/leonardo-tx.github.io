"use client";

import { JSX } from "react";
import styles from "../styles/InfoBanner.module.css";
import Image from "next/image";
import useTranslation from "@/data/settings/hooks/useTranslation";
import { Heading, Text } from "@chakra-ui/react";

export default function InfoBanner(): JSX.Element {
    const { t } = useTranslation();

    return (
        <section className={styles.banner}>
            <div className={styles["banner-div"]}>
                <Heading size="xl">{t("author.name").toUpperCase()}</Heading>
                <Text>({t("pages.home.banner-known-as", t("author.username"))})</Text>
            </div>
            <Image 
                priority
                className={styles["banner-author-image"]} 
                src="/images/leonardo-teixeira.jpg"
                width="256"
                height="256"
                alt="" 
            />
            <Text maxW="400px" textAlign="justify">
                {t("pages.home.banner-description")}
            </Text>
        </section>
    );
}