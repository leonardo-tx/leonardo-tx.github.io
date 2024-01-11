"use client";

import { JSX } from "react";
import styles from "./styles/Contacts.module.css";
import { Heading, Link, Text } from "@chakra-ui/react";
import { IoMailSharp } from "react-icons/io5";
import { SiLinkedin } from "react-icons/si";
import useTranslation from "@/data/settings/hooks/useTranslation";

export default function Contacts(): JSX.Element {
    const { t } = useTranslation();

    return (
        <section className={styles.contacts}>
            <Heading>{t("titles.contacts")}</Heading>
            <div className={styles["contacts-list"]}>
                <Link href="mailto:leonardoregoteixeira@gmail.com" className={styles["contact-box"]}>
                    <IoMailSharp size={30} />
                    <Text>leonardoregoteixeira@gmail.com</Text>
                </Link>
                <Link href="https://www.linkedin.com/in/leonardotx/" className={styles["contact-box"]} isExternal>
                    <SiLinkedin size={30} />
                    <Text>leonardotx</Text>
                </Link>
            </div>
        </section>
    );
}