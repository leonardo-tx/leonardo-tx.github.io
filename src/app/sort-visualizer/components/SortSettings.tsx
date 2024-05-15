import { JSX } from "react";
import styled from "@emotion/styled";
import { Heading, IconButton, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { IoPlay, IoShuffle, IoSwapHorizontal } from "react-icons/io5";
import NormalSortType from "@/core/sort-visualizer/NormalSortType";
import useTranslation from "@/data/settings/hooks/useTranslation";
import useSortFunctions from "../hooks/useSortFunctions";
import MemeSortType from "@/core/sort-visualizer/MemeSortType";

export default function SortSettings(): JSX.Element {
    const { sortElements, randomizeElements, reverseElements, changeSize, changeSorter, details, sortSettings } = useSortFunctions();
    const { t } = useTranslation();
    
    return (
        <Container>
            <SettingsColumn>
                <Heading minW="200px" whiteSpace="nowrap" size="xl">{t(`sort-type.${sortSettings.sortType}`)}</Heading>
                <Text whiteSpace="break-spaces">
                    {t("pages.sort-visualizer.details", details.swap, details.replace, details.compare, details.relocation)}
                </Text>
            </SettingsColumn>
            <Settings>
                <IconButton
                    width="40px"
                    height="40px"
                    onClick={reverseElements}
                    aria-label=""
                    icon={<IoSwapHorizontal size="60%" />}
                />
                <IconButton
                    width="40px"
                    height="40px"
                    onClick={randomizeElements}
                    aria-label=""
                    icon={<IoShuffle size="60%" />} 
                />
                <IconButton
                    width="40px"
                    height="40px"
                    onClick={sortElements}
                    aria-label=""
                    icon={<IoPlay size="60%" />} 
                />
                <SliderContainer>
                    <SettingsRow>
                        <Text whiteSpace="nowrap">{t("pages.sort-visualizer.elements", sortSettings.length)}</Text>
                        <Select
                            value={sortSettings.sortType}
                            onChange={(e) => changeSorter(e.target.value as NormalSortType | MemeSortType)}>
                            <optgroup label={t("pages.sort-visualizer.normal-sorters")}>
                                {Object.values(NormalSortType).map((value, i) => (
                                    <option key={i} value={value}>{t(`sort-type.${value}`)}</option>
                                ))} 
                            </optgroup>
                            <optgroup label={t("pages.sort-visualizer.meme-sorters")}>
                                {Object.values(MemeSortType).map((value, i) => (
                                    <option key={i} value={value}>{t(`sort-type.${value}`)}</option>
                                ))} 
                            </optgroup>
                        </Select>
                    </SettingsRow>
                    <Slider 
                        max={1000} 
                        min={10} 
                        step={5} 
                        value={sortSettings.length} 
                        onChange={changeSize}>
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
    gap: 10px;
`


const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
`
