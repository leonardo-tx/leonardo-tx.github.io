"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";
import chakraTheme from "../settings/chakraTheme";
import { Provider } from "jotai";
import SettingsProvider from "./SettingsProvider";


interface Props {
    children?: ReactNode;
}

export default function Providers({ children }: Props): JSX.Element {
    return (
        <Provider>
            <CacheProvider>
                <ChakraProvider theme={chakraTheme}>
                    <SettingsProvider>
                        {children}
                    </SettingsProvider>
                </ChakraProvider>
            </CacheProvider>
        </Provider>
    );
}