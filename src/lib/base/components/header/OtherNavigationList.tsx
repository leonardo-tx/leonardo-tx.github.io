"use client";

import { JSX } from "react";
import styles from "../../styles/Header.module.css";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaEllipsis, FaGear } from "react-icons/fa6";
import { Link } from "@chakra-ui/next-js";
import useTranslation from "@/data/settings/hooks/useTranslation";

export default function OtherNavigationList(): JSX.Element {
    const { t } = useTranslation();

    return (
        <ul className={styles["nav-list"]}>
            <li>
                <Menu>
                    <MenuButton as={IconButton} variant="ghost" icon={<FaEllipsis size={24} />} />
                    <MenuList className={styles["nav-list-menu"]}>
                        <MenuItem as={Link} href="/settings" gap={2}>
                            <FaGear />
                            {t("header.settings-link")}
                        </MenuItem>
                    </MenuList>
                </Menu>
            </li>
        </ul>
    );
}