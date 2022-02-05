import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import theme from './theme';
// import Overlay from './components/overlay'

ReactDOM.render(
    <React.StrictMode>
        {/* <div> */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <App />
            {/* <Overlay /> */}
        </ChakraProvider>
        {/* </div>, */}
    </React.StrictMode>,
    document.getElementById('root'),
);
