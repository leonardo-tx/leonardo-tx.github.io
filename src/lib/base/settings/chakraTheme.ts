import { extendTheme, type StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            bg: mode("#ffffff", "#17171f")(props),
            color: mode("#111111", "#eeeeee")(props),
        }
    })
};

const chakraTheme = extendTheme({ 
    config, 
    styles, 
    fonts: {
        heading: "'Ubuntu', 'Noto Sans JP', sans-serif",
        body: "'Noto Sans', 'Noto Sans JP', sans-serif"
    }
});

export default chakraTheme;