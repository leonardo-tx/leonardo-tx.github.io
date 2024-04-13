import useTranslation from "@/data/settings/hooks/useTranslation";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { JSX } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function WinModal({ isOpen, onClose }: Props): JSX.Element {
    const { t } = useTranslation()

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("pages.sudoku-app.win-title")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {t("pages.sudoku-app.win-text")}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
