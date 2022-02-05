import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './i18n';
import theme from './theme';

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
