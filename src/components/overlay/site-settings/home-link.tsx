import { Icon, IconButton, Link, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdHome } from 'react-icons/md';
import { Link as ReactLink } from 'react-router-dom';

export const HomeLink = () => {
    const { t } = useTranslation();
    return (
        <Tooltip
            shouldWrapChildren
            hasArrow
            label={t('Go to page', { page: t('home') })}
            placement='left-start'
        >
            <Link as={ReactLink} to='/'>
                <IconButton
                    size='md'
                    aria-label={t('Go to page', { page: t('home') })}
                    variant='ghost'
                    colorScheme='brand'
                    icon={<Icon as={MdHome} boxSize={6} />}
                />
            </Link>
        </Tooltip>
    );
};
