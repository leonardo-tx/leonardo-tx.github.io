import WheelspinSegment from "@/core/wheelspin/WheelspinSegment";
import useTranslation from "@/data/settings/hooks/useTranslation";
import { Button, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack, Text } from "@chakra-ui/react";
import { JSX, RefObject, useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";

interface Props {
    btnRef: RefObject<HTMLButtonElement>
    onAddSegment: (text: string) => void
    onRemoveSegment: (id: number) => void
    segments: WheelspinSegment[]
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
}

export default function WheelManager({ btnRef, onAddSegment, onRemoveSegment, segments, isOpen, onClose, onOpen }: Props): JSX.Element {
    const [newSegmentText, setNewSegmentText] = useState("");
    const { t } = useTranslation()

    useEffect(() => {
        setNewSegmentText("");
    }, [isOpen])

    return (
        <Modal
            onClose={onClose}
            finalFocusRef={btnRef}
            isOpen={isOpen}
            scrollBehavior="inside"
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("header.settings-link")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack alignItems="stretch" spacing={6}>
                        <HStack spacing={2}>
                            <Input onChange={(e) => setNewSegmentText(e.target.value)} variant="flushed" value={newSegmentText} placeholder={t("inputs.insert-text")} />
                            <Button onClick={() => {
                                if (newSegmentText === "") return;

                                onAddSegment(newSegmentText)
                                setNewSegmentText("");
                            }} colorScheme="green">{t("buttons.add")}</Button>
                        </HStack>
                        <VStack maxH="200px" overflowY="scroll" spacing={4} alignItems="stretch">
                            {segments.map((segment, i) => (
                                <HStack spacing={4} justifyContent="space-between" key={i}>
                                    <IconButton onClick={() => onRemoveSegment(segment.id)} variant="ghost" aria-label="delete" icon={<IoTrash size={24} />} />
                                    <Text fontWeight="bold" w="100%" overflowX="scroll">{segment.text}</Text>
                                </HStack>
                            ))}
                        </VStack>
                    </VStack>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}