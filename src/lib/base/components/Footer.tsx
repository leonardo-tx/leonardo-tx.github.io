"use client";

import { JSX } from "react";
import styles from "../styles/Footer.module.css";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import useTranslation from "@/data/settings/hooks/useTranslation";

export default function Footer(): JSX.Element {
    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <ButtonGroup variant="ghost">
                <IconButton 
                    as="a" 
                    aria-label="Github icon"
                    icon={<SiGithub size={25} />} 
                    href="https://github.com/leonardo-tx" 
                    target="_blank" 
                />
                <IconButton 
                    as="a" 
                    aria-label="Linkedin icon"
                    icon={<SiLinkedin size={25} />} 
                    href="https://www.linkedin.com/in/leonardotx/" 
                    target="_blank" 
                />
            </ButtonGroup>
            <p className={styles["footer-copyright"]}>© 2024 {t("author.name")}.</p>
        </footer>
    )
}