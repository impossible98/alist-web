import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';
import './i18n';
import theme from './theme';
// import Overlay from './components/overlay'

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
