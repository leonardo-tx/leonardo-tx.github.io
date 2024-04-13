"use client";

import { JSX } from "react";
import styles from "../../styles/OtherNavigation.module.css";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { IoEllipsisHorizontal, IoSettings } from "react-icons/io5";
import { Link } from "@chakra-ui/next-js";
import useTranslation from "@/data/settings/hooks/useTranslation";

export default function OtherNavigationList(): JSX.Element {
    const { t } = useTranslation();

    return (
        <ul className={styles["nav-list"]}>
            <li>
                <Menu>
                    <MenuButton as={IconButton} variant="ghost" icon={<IoEllipsisHorizontal size={24} />} />
                    <MenuList className={styles["nav-list-menu"]}>
                        <MenuItem as={Link} href="/settings" gap={2}>
                            <IoSettings />
                            {t("header.settings-link")}
                        </MenuItem>
                    </MenuList>
                </Menu>
            </li>
        </ul>
    );
}
