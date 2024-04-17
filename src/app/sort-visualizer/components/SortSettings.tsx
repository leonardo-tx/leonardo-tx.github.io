import { JSX } from "react";
import styled from "@emotion/styled";
import { Heading, IconButton, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { IoPlay, IoShuffle, IoSwapHorizontal } from "react-icons/io5";
import SortType from "@/core/sort-visualizer/SortType";
import useTranslation from "@/data/settings/hooks/useTranslation";
import useSortFunctions from "../hooks/useSortFunctions";

export default function SortSettings(): JSX.Element {
    const { sortElements, randomizeElements, reverseElements, changeSize, changeSorter, details, sortSettings } = useSortFunctions();
    const { t } = useTranslation(); 
    
    const isLoading = sortSettings.swapIndexes !== null || sortSettings.sorted || sortSettings.replace !== null;
    return (
        <Container>
            <SettingsColumn>
                <Heading minW="200px" whiteSpace="nowrap" size="xl">{t(`sort-type.${sortSettings.sortType}`)}</Heading>
                <Text whiteSpace="break-spaces">
                    {t("pages.sort-visualizer.details", details.swap, details.replace, details.compare)}
                </Text>
            </SettingsColumn>
            <Settings>
                <IconButton
                    width="40px"
                    height="40px"
                    isLoading={isLoading}
                    onClick={reverseElements}
                    aria-label=""
                    icon={<IoSwapHorizontal size="60%" />}
                />
                <IconButton
                    width="40px"
                    height="40px"
                    isLoading={isLoading} 
                    onClick={randomizeElements}
                    aria-label=""
                    icon={<IoShuffle size="60%" />} 
                />
                <IconButton
                    width="40px"
                    height="40px"
                    isLoading={isLoading} 
                    onClick={sortElements}
                    aria-label=""
                    icon={<IoPlay size="60%" />} 
                />
                <SliderContainer>
                    <SettingsRow>
                        <Text whiteSpace="nowrap">{t("pages.sort-visualizer.elements", sortSettings.elements.length)}</Text>
                        <Select
                            value={sortSettings.sortType}
                            onChange={(e) => changeSorter(e.target.value as SortType)}>
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
