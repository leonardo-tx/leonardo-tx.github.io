import { JSX, useEffect } from "react";
import styled from "@emotion/styled";
import { Heading, IconButton, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { IoPlay, IoShuffle } from "react-icons/io5";
import { useAtom } from "jotai";
import sortSettingsAtom from "../atoms/sortSettingsAtom";
import Sorter from "@/core/common/Sorter";
import SortType from "@/core/sort-visualizer/SortType";
import useTranslation from "@/data/settings/hooks/useTranslation";

export default function SortSettings(): JSX.Element {
    const [sortSettings, setSortSettings] = useAtom(sortSettingsAtom);
    const { t } = useTranslation();

    useEffect(() => {
        for (let i = 0; i < sortSettings.elements.length; i++) {
            sortSettings.elements[i] = i + 1;
        }
        setSortSettings((oldSettings) => ({...oldSettings, elements: [...sortSettings.elements]}))
    }, [sortSettings.sortType, setSortSettings])
    
    const onSwap = async (first: number, second: number, elements: number[], time: number, sorter: SortType) => {
        setSortSettings((oldSettings) => {
            if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
            return {...oldSettings, swapIndex: first};
        });
        await new Promise(resolve => setTimeout(resolve, time))
        setSortSettings((oldSettings) => {
            if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
            return {...oldSettings, swapIndex: second, elements: [...elements]};
        });
    }

    const onEndSorter = async (time: number, sorted: boolean, sorter: SortType) => {
        await new Promise(resolve => setTimeout(resolve, time));
        setSortSettings((oldSettings) => ({...oldSettings, swapIndex: null}));

        if (!sorted) return;
        const copy = [...sortSettings.elements];
        for (let i = 0; i < copy.length + copy.length / 10; i++) {
            await new Promise(resolve => setTimeout(resolve, time / 2));
            setSortSettings((oldSettings) => {
                if (oldSettings.elements.length !== copy.length || sorter !== oldSettings.sortType) throw Error();
                return {...oldSettings, sortedIndex: i};
            });
        }
        await new Promise(resolve => setTimeout(resolve, time / 2));
        setSortSettings((oldSettings) => ({...oldSettings, sortedIndex: null}));
    }

    const randomizeElements = async () => {
        const copy = [...sortSettings.elements];
        const time = 4000 / copy.length;
        const sorter = sortSettings.sortType;

        for (let i = 0; i < copy.length; i++) {
            const j = Math.floor(Math.random() * sortSettings.elements.length);
            [copy[i], copy[j]] = [copy[j], copy[i]];
            try {
                await onSwap(j, i, copy, time, sorter);
            } catch {
                break;
            }
        }
        await onEndSorter(time, false, SortType.BubbleSort);
    }

    const sortElements = async () => {
        const copy = [...sortSettings.elements];
        const time = 4000 / copy.length;
        const sorterType = sortSettings.sortType; 
        const sorter: Sorter<number> = new Sorter(
            (left, right) => left - right, 
            (first, second) => onSwap(first, second, copy, time, sorterType)
        );

        try {
            await sorter[sorterType](copy);
        } catch (e) {
           // Nothing 
        }
        try {
            await onEndSorter(time, true, sorterType); 
        } catch {
            // Nothing
        }
    }

    return (
        <Container>
            <Heading minW="200px" whiteSpace="nowrap" size="xl">{t(`sort-type.${sortSettings.sortType}`)}</Heading>
            <Settings>
                <IconButton
                    width="40px"
                    height="40px"
                    isLoading={sortSettings.swapIndex !== null || sortSettings.sortedIndex !== null} 
                    onClick={randomizeElements} aria-label="" icon={<IoShuffle size="60%" />} 
                />
                <IconButton
                    width="40px"
                    height="40px"
                    isLoading={sortSettings.swapIndex !== null || sortSettings.sortedIndex !== null} 
                    onClick={sortElements} aria-label="" icon={<IoPlay size="60%" />} 
                />
                <SliderContainer>
                    <SettingsDiv>
                        <Text whiteSpace="nowrap">{t("pages.sort-visualizer.elements", sortSettings.elements.length)}</Text>
                        <Select 
                            onChange={(value) => setSortSettings(oldSettings => ({...oldSettings, sortType: value.target.value as SortType}))}>
                            {Object.values(SortType).map((value, i) => (
                                <option key={i} value={value}>{t(`sort-type.${value}`)}</option>
                            ))} 
                        </Select>
                    </SettingsDiv>
                    <Slider 
                        max={1000} 
                        min={10} 
                        step={5} 
                        value={sortSettings.elements.length} 
                        onChange={(length) => {
                            setSortSettings((oldSettings) => ({...oldSettings, sortedIndex: null, swapIndex: null, elements: Array.from({ length }, (_, i) => i + 1)}))
                        }}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </SliderContainer>
            </Settings>
        </Container>
    ); 
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    gap: 5%;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const Settings = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    align-items: center;
`;

const SettingsDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
`
