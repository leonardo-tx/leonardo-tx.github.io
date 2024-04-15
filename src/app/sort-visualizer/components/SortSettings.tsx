import { JSX, useCallback, useEffect, useMemo, useState } from "react";
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
    const [details, setDetails] = useState({ swaps: 0, replaces: 0, reads: 0 });
    const { t } = useTranslation();

    useEffect(() => {
        setSortSettings((oldSettings) => ({
            ...oldSettings,
            elements: Array.from({ length: 100 }, (_, i) => i + 1)
        }))

        return () => {
            setSortSettings((oldSettings) => ({
                sortType: SortType.BubbleSort, 
                elements: Array.from({ length: oldSettings.elements.length + 1 }, (_, i) => i + 1),
                sortedIndex: null,
                swapIndex: null
            }))
        }
    }, [setSortSettings]);

    const time = useMemo(() => 4000 / sortSettings.elements.length, [sortSettings.elements.length]);
    
    const onSwap = useCallback(async (first: number, second: number, elements: number[], sorter: SortType) => { 
        [elements[first], elements[second]] = [elements[second], elements[first]];

        setDetails((oldDetails) => ({...oldDetails, swaps: oldDetails.swaps + 1}));
        setSortSettings((oldSettings) => {
            if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
            return {...oldSettings, swapIndex: first};
        });
        await new Promise(resolve => setTimeout(resolve, time / 2))
        setSortSettings((oldSettings) => {
            if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
            return {...oldSettings, swapIndex: second, elements: [...elements]};
        });
        await new Promise(resolve => setTimeout(resolve, time / 2))
    }, [setSortSettings, time])

    const onReplace = useCallback(async (index: number, value: number, elements: number[], sorter: SortType) => {
        elements[index] = value;

        setDetails((oldDetails) => ({...oldDetails, replaces: oldDetails.replaces + 1}));
        setSortSettings((oldSettings) => {
            if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
            return {...oldSettings, swapIndex: index, elements: [...elements]};
        });
        await new Promise(resolve => setTimeout(resolve, time))
    }, [setSortSettings, time])

    const onGetValue = useCallback(async (index: number, elements: number[]) => {
        setDetails((oldDetails) => ({...oldDetails, reads: oldDetails.reads + 1}));
        return elements[index];
    }, [])

    const onEndSorter = async (sorter: SortType | undefined = undefined, elements: number[] | undefined = undefined) => {
        await new Promise(resolve => setTimeout(resolve, time / 2));
        setSortSettings((oldSettings) => ({...oldSettings, swapIndex: null}));

        if (!sorter || !elements) return;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] !== i + 1)  return;
        }
        for (let i = 0; i < elements.length + elements.length / 10; i++) {
            await new Promise(resolve => setTimeout(resolve, time / 2));
            setSortSettings((oldSettings) => {
                if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
                return {...oldSettings, sortedIndex: i};
            });
        }
        await new Promise(resolve => setTimeout(resolve, time / 2));
        setSortSettings((oldSettings) => ({...oldSettings, sortedIndex: null}));
    }

    const randomizeElements = async () => {
        setDetails({ swaps: 0, replaces: 0, reads: 0 });

        const copy = [...sortSettings.elements];
        const sorter = sortSettings.sortType;

        for (let i = 0; i < copy.length; i++) {
            const j = Math.floor(Math.random() * sortSettings.elements.length);
            try {
                await onSwap(i, j, copy, sorter);
            } catch {
                break;
            }
        }
        await onEndSorter();
    }

    const sortElements = async () => {
        setDetails({ swaps: 0, replaces: 0, reads: 0 });

        const copy = [...sortSettings.elements];
        const sorterType = sortSettings.sortType;
        const sorter: Sorter<number> = new Sorter(
            (left, right) => left - right, 
            (first, second) => onSwap(first, second, copy, sorterType),
            (index, value) => onReplace(index, value, copy, sorterType),
            (index) => onGetValue(index, copy)
        );

        try {
            await sorter[sorterType](copy);
        } catch (e) {
           // Nothing 
        }
        try {
            await onEndSorter(sorterType, copy); 
        } catch {
            // Nothing
        }
    }

    return (
        <Container>
            <SettingsColumn>
                <Heading minW="200px" whiteSpace="nowrap" size="xl">{t(`sort-type.${sortSettings.sortType}`)}</Heading>
                <Text whiteSpace="nowrap">{t("pages.sort-visualizer.details", details.swaps, details.reads, details.replaces)}</Text>
            </SettingsColumn>
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
                    <SettingsRow>
                        <Text whiteSpace="nowrap">{t("pages.sort-visualizer.elements", sortSettings.elements.length)}</Text>
                        <Select
                            value={sortSettings.sortType}
                            onChange={(value) => setSortSettings(oldSettings => ({
                                ...oldSettings,
                                swapIndex: null,
                                sortedIndex: null,
                                sortType: value.target.value as SortType, 
                                elements: Array.from({ length: oldSettings.elements.length }, (_, i) => i + 1)})
                            )}>
                            {Object.values(SortType).map((value, i) => (
                                <option key={i} value={value}>{t(`sort-type.${value}`)}</option>
                            ))} 
                        </Select>
                    </SettingsRow>
                    <Slider 
                        max={1000} 
                        min={10} 
                        step={5} 
                        value={sortSettings.elements.length} 
                        onChange={(length) => {
                            setSortSettings((oldSettings) => ({
                                ...oldSettings, 
                                sortedIndex: null, 
                                swapIndex: null, 
                                elements: Array.from({ length }, (_, i) => i + 1)
                            }))
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
    
    @media only screen and (max-width: 900px) {
        flex-direction: column;
    }
`;

const Settings = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    align-items: center;
`;

const SettingsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const SettingsColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`


const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
`
