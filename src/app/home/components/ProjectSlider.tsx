"use client";

import { JSX, useEffect, useState } from "react";
import styles from "../styles/ProjectSlider.module.css";
import projects from "@/lib/assets/content/projects.json";
import Project from "@/core/projects/Project";
import Image from "next/image";
import { Heading, IconButton } from "@chakra-ui/react";
import useTranslation from "@/data/settings/hooks/useTranslation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function ProjectSlider(): JSX.Element {
    const [project, setProject] = useState(0);
    const [stopSlide, setStopSlide] = useState(false);
    const { t } = useTranslation();
    const allProjects: Project[] = projects

    useEffect(() => {
        if (stopSlide) return;

        const interval = setInterval(() => setProject((oldProject) => (oldProject + 1) % allProjects.length), 5000);
        return () => clearInterval(interval);
    }, [allProjects, stopSlide])

    return (
        <div 
            onMouseEnter={() => setStopSlide(true)} 
            onMouseLeave={() => setStopSlide(false)} 
            className={styles.slider}>
            {allProjects.map((value, i) => (
                <Image 
                    width={800}
                    height={450}
                    key={i} 
                    className={`${styles["slider-project"]} ${i === project ? styles["slider-project-active"] : ""}`}  
                    draggable="false" 
                    src={`/images/projects/${value.name}/${value.images[0]}`} 
                    alt="" 
                />
            ))}
            <div className={styles["slider-info"]}>
                <Heading size="md" as="h3">
                    {t(`projects.${allProjects[project].name}.name`)} ({t(`project-type.${allProjects[project].projectType}`)})
                </Heading>
            </div>
            <IconButton 
                onClick={() => setProject((oldProject) => {
                    const result = (oldProject - 1) % allProjects.length;
                    return result < 0 ? allProjects.length + result : result;
                })} 
                variant="link" 
                icon={<FaAngleLeft size={26} />} 
                className={styles["slider-left-button"]} 
                aria-label=""
            />
            <IconButton 
                onClick={() => setProject((oldProject) => (oldProject + 1) % allProjects.length)} 
                variant="link" 
                icon={<FaAngleRight size={26} />} 
                className={styles["slider-right-button"]}
                aria-label=""
            />
        </div>
    );
}