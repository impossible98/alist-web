import { Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Github } from './github';
import { HomeLink } from './home-link';
import { Language } from './language';
import { ThemeToggle } from './theme-toggle';
import { Unfold } from './unfold';

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

export default function Ss(props: any) {
    return (
        !inIframe()
            ? (
                <Stack
                    direction='column'
                    pos='fixed'
                    zIndex={1000}
                    right={0}
                    bottom={70}
                    w={10}
                    border='solid transparent'
                    shadow='lg'
                    roundedLeft='lg'
                    bg={useColorModeValue('white', 'gray.700')}
                >
                    {props.list && <Unfold />}
                    <Language />
                    <ThemeToggle />
                    {/* <Github /> */}
                    <HomeLink />
                </Stack>
            )
            : <></>
    );
}
