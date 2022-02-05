import { Center, HStack, Link, Text, VStack } from '@chakra-ui/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as ReactLink } from 'react-router-dom';

function Footer() {
    const { t } = useTranslation();

    return (
        <Center py='4' className='footer'>
            <VStack>
                <HStack spacing='2' className='line0'>
                    <Link isExternal href='https://github.com/Xhofe/alist'>
                        {t('Powered by {{project}}', { project: 'Alist' })}
                    </Link>
                    <span>|</span>
                    <ReactLink to='/@manage'>{t('Manage')}</ReactLink>
                </HStack>
            </VStack>
        </Center>

        // <Container maxWidth='sm'>
        //     <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        //         <Link isExternal href='https://github.com/Xhofe/alist'>
        //             {t('Powered by {{project}}', { project: 'Alist' })}
        //         </Link>
        //     </Box>
        // </Container>
    );
}

export default Footer;
