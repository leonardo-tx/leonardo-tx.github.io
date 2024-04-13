"use client";

import { JSX } from "react";
import projects from "@/lib/assets/content/projects.json";
import Project from "@/core/projects/Project";
import { ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import useTranslation from "@/data/settings/hooks/useTranslation";
import styles from "./styles/Projects.module.css";
import { SiGithub, SiNuget } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import ProjectSlider from "./components/ProjectSlider";
import { Link } from "@chakra-ui/next-js";

export default function Projects(): JSX.Element {
    const { t } = useTranslation();
    const allProjects: Project[] = projects
    
    return (
        <section className={styles.projects}>
            <ul className={styles["project-list"]}>
                {allProjects.map((value, i) => (
                    <li key={i} className={styles["project-item"]}>
                        <div className={styles["project-item-info"]}>
                            <div className={styles["project-item-header"]}>
                                <Text fontWeight={600}>{t(`projects.${value.name}.name`)}</Text>
                                <ButtonGroup spacing={1} variant="link">
                                    {value.url &&
                                        <IconButton 
                                            as={Link}
                                            aria-label=""
                                            icon={<IoGameController size={20} />}
                                            href={value.url}
                                        />}
                                    {value.nugetUrl && 
                                        <IconButton 
                                            as="a"
                                            aria-label=""
                                            icon={<SiNuget size={20} />} 
                                            href={value.nugetUrl} 
                                            target="_blank" 
                                        />}

                                    {value.githubUrl && 
                                        <IconButton 
                                            as="a"
                                            aria-label=""
                                            icon={<SiGithub size={20} />} 
                                            href={value.githubUrl} 
                                            target="_blank" 
                                        />}
                                </ButtonGroup>
                            </div>
                            <Text textAlign="justify">{t(`projects.${value.name}.description`)}</Text>
                        </div>
                        <ProjectSlider project={value} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
