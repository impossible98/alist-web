import { Box } from '@chakra-ui/layout';
import React from 'react';
import Ss from './site-settings';
import ToTop from './to-top';

const Overlay = (props: any) => {
    return (
        <Box className='overlay' zIndex='100'>
            <Ss {...props} />
            <ToTop />
        </Box>
    );
};

export default Overlay;
