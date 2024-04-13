"use client";

import { JSX } from "react";
import InfoBanner from "./components/InfoBanner";
import ProjectsSlider from "./components/ProjectsSlider";
import styles from "./styles/Home.module.css";
import { Heading } from "@chakra-ui/react";
import { SiC, SiCsharp, SiJavascript, SiKotlin, SiReact, SiTypescript } from "react-icons/si";
import { DiJava } from "react-icons/di";
import useTranslation from "@/data/settings/hooks/useTranslation";
import SkillItem from "./components/SkillItem";

export default function HomePage(): JSX.Element {
    const { t } = useTranslation();
     
    return (
        <div className={styles.home}>
            <InfoBanner />
            <section className={styles["home-projects"]}>
                <Heading size="lg">{t("pages.home.projects-heading")}</Heading>
                <ProjectsSlider />
            </section>
            <section className={styles["skills-section"]}>
                <Heading size="lg">{t("pages.home.skills-heading")}</Heading>
                <section>
                    <Heading as="h3" size="md">{t("pages.home.programming-languages-heading")}</Heading>
                    <div className={styles["skills-section-items"]}>
                        <SkillItem icon={<SiCsharp color="#8c61db" size={35} />} title="CSharp" progress={65} />
                        <SkillItem icon={<SiReact color="#7cd1eb" size={35} />} title="React" progress={58} />
                        <SkillItem icon={<SiTypescript color="#7ca3eb" size={35} />} title="Typescript" progress={50} />
                        <SkillItem icon={<SiJavascript color="#dbdd6f" size={35} />} title="Javascript" progress={50} />
                        <SkillItem icon={<DiJava color="#f54f32" size={35} />} title="Java" progress={45} />
                        <SkillItem icon={<SiKotlin color="#a084d4" size={35} />} title="Kotlin" progress={40} />
                        <SkillItem icon={<SiC color="#84d4cd" size={35} />} title="" progress={8} />
                    </div>
                </section>
                <section>
                    <Heading as="h3" size="md">{t("pages.home.human-languages-heading")}</Heading>
                    <div className={styles["skills-section-items"]}>
                        <SkillItem title={t("language-type.pt-BR")} progress={100} />
                        <SkillItem title={t("language-type.en")} progress={65} />
                        <SkillItem title={t("language-type.es")} progress={35} />
                        <SkillItem title={t("language-type.ja-JP")} progress={10} />
                    </div>
                </section>
            </section>
        </div>
    );
}
