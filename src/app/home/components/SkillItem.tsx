import useTranslation from "@/data/settings/hooks/useTranslation";
import { Progress, Text } from "@chakra-ui/react";
import { JSX } from "react";
import styles from "../styles/SkillItem.module.css";

interface Props {
    title: string;
    icon?: JSX.Element;
    progress: number;
}

export default function SkillItem({ title, icon, progress }: Props): JSX.Element {
    const { t } = useTranslation();

    let skillLevel: string;
    
    if (progress >= 100) skillLevel = t("skill-type.5");
    else if (progress >= 85) skillLevel = t("skill-type.4");
    else if (progress >= 60) skillLevel = t("skill-type.3");
    else if (progress >= 45) skillLevel = t("skill-type.2");
    else if (progress >= 20) skillLevel = t("skill-type.1");
    else skillLevel = t("skill-type.0");

    return (
        <div className={styles["skill-item"]}>
            <div className={styles["skill-item-header"]}>
                {icon}
                <Text fontWeight={700}>{title}</Text>
            </div>
            <Text>{skillLevel}</Text>
            <Progress value={progress} />
        </div>
    );
}