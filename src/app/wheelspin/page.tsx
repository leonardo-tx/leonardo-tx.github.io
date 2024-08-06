"use client";

import useWheelSpin from "@/data/settings/hooks/useWheelSpin";
import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { JSX, useEffect, useRef, useState } from "react";
import WheelManager from "./components/WheelManager";
import useTranslation from "@/data/settings/hooks/useTranslation";

const MIN_VELOCITY = 15;
const MAX_VELOCITY = 20;
const BASE_DECELERATION = -0.01;
const RANDOM_DECELERATION_FACTOR = 0.005;

export default function WheelSpin(): JSX.Element {
    const { segments, addSegment, removeSegment } = useWheelSpin();
    const [openManager, setOpenManager] = useState(false);
    const [spinning, setSpinning] = useState(false)
    const [degrees, setDegrees] = useState(0);
    const btnRef = useRef<HTMLButtonElement>(null)
    const { t } = useTranslation();

    const pointedSegment = Math.floor((degrees * segments.length) / 360)
    const degreesPerSegment = 360 / segments.length
    
    useEffect(() => {
        if (!spinning) return;
        let velocity = Math.random() * (MAX_VELOCITY - MIN_VELOCITY) + MIN_VELOCITY;

        setDegrees(Math.random() * 360)
        const interval = setInterval(() => {
            if (velocity <= 0) {
                setSpinning(false)
                return;
            }
            setDegrees((oldDegrees) => (oldDegrees + velocity) % 360);

            const randomDeceleration = BASE_DECELERATION + (Math.random() * RANDOM_DECELERATION_FACTOR * 2 - RANDOM_DECELERATION_FACTOR);
            velocity += randomDeceleration
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [spinning])

    return (
        <>
            <WheelManager
                isOpen={openManager}
                onOpen={() => setOpenManager(true)}
                onClose={() => setOpenManager(false)}
                segments={segments} 
                onAddSegment={addSegment} 
                onRemoveSegment={removeSegment} 
                btnRef={btnRef} 
            />
            <Container>
                <Text fontSize='3xl'>{!spinning && segments.length > 0 && segments[pointedSegment].text}</Text>
                <ButtonGroup variant="outline">
                    <Button ref={btnRef} colorScheme="green" onClick={() => setOpenManager(true)}>
                        {t("header.settings-link")}
                    </Button>
                    <Button isDisabled={segments.length === 0} isLoading={spinning} colorScheme="blue" onClick={() => setSpinning(true)}>
                        {t("buttons.spin")}
                    </Button>
                </ButtonGroup>
                <Wheel>
                    <Pointer />
                    <WheelCenter />
                    <Segments
                        style={{ transform: `rotate(-${degrees}deg)`, background: getConicGradient(segments.length) }}
                    >
                        {segments.map((segment, i) => (
                            <SegmentContent key={i} style={{
                                transform: `rotate(${(degreesPerSegment * i) + (degreesPerSegment/ 2)}deg)`
                            }}>
                                {segment.text}
                            </SegmentContent>
                        ))}
                    </Segments>
                </Wheel>
            </Container>
        </>
    );
}

function getConicGradient(segmentQuantity: number): string {
    const colors = ['#371e64', '#50387c', '#6e53a0', '#886bbe'];
    const degreesPerSegment = 360 / segmentQuantity;
    let gradient = 'conic-gradient(';

    for (let i = 0; i < segmentQuantity; i++) {
        const color = colors[i % colors.length];
        const startAngle = i * degreesPerSegment;
        const endAngle = (i + 1) * degreesPerSegment;

        if (i === segmentQuantity - 1 && i % colors.length === 0) {
            gradient += `${colors[2]} ${startAngle}deg ${endAngle}deg`;
        } else {
            gradient += `${color} ${startAngle}deg ${endAngle}deg`;
        }

        if (i < segmentQuantity - 1) {
            gradient += ', ';
        }
    }

    gradient += ')';
    return gradient;
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 20px;
`

const Wheel = styled.div`
    position: relative;
    border-radius: 50%;
    height: 90%;
    aspect-ratio: 1 / 1;
    background-color: #2d283f;
    overflow: hidden;
`;

const Pointer = styled.div`
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #141414;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
`

const WheelCenter = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background: linear-gradient(to top, #141414, #232323);
    transform: translate(-50%, -50%);
    z-index: 1;
`

const Segments = styled.div`
    height: 100%;
    width: 100%;
`

const SegmentContent = styled(Text)`
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-weight: bold;
`