"use client";

import { JSX, useEffect, useState } from "react";
import styles from "../styles/ProjectSlider.module.css";
import Project from "@/core/projects/Project";
import Image from "next/image";

interface Props {
    project: Project
}

export default function ProjectSlider({ project }: Props): JSX.Element {
    const [image, setImage] = useState(0);
    const [stopSlide, setStopSlide] = useState(false);

    useEffect(() => {
        if (stopSlide) return;

        const interval = setInterval(() => setImage((oldImage) => (oldImage + 1) % project.images.length), 5000);
        return () => clearInterval(interval);
    }, [project, stopSlide])

    return (
        <div 
            onMouseEnter={() => setStopSlide(true)} 
            onMouseLeave={() => setStopSlide(false)} 
            className={styles.slider}>
            {project.images.map((value, i) => (
                <div key={i} className={`${styles["slider-project"]} ${i === image ? styles["slider-project-active"] : ""}`} >
                    <Image 
                        priority
                        width={800}
                        height={450}
                        draggable="false" 
                        src={`/images/projects/${project.name}/${value}`} 
                        alt=""
                    />
                </div>
            ))}
        </div>
    );
}
