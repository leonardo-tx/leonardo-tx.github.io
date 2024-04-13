import { VStack, ButtonGroup, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { JSX } from "react";
import { FaGamepad } from "react-icons/fa6";
import { Difficulty } from "@/core/sudoku-app/sudoku/sudoku";
import useCreateGame from "../hooks/useCreateGame";
import useTranslation from "@/data/settings/hooks/useTranslation";

export default function CreateGame(): JSX.Element {
    const { loading, isOpen, onOpen, onClose, createBoard } = useCreateGame();
    const { t } = useTranslation();
    
    return (
        <>
            <ButtonGroup size="lg" spacing={6} variant="outline">
                <Button
                    colorScheme="purple" 
                    leftIcon={<FaGamepad />}
                    spinnerPlacement="start"
                    loadingText={t("buttons.generating")}
                    isLoading={loading} 
                    onClick={onOpen}
                >
                    {t("buttons.new-game")}
                </Button>
            </ButtonGroup>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("pages.sudoku-app.select-difficulty")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={3} alignItems="stretch">
                            {Object.keys(Difficulty).filter((v) => !isNaN(parseInt(v))).map((value, i) => (
                                <Button key={i} size="lg" onClick={() => createBoard(i)}>{t(`difficulty-type.${value}`)}</Button>
                            ))}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
