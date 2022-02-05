import { Icon, IconButton, Link, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DiGithubAlt } from 'react-icons/di';

export const Github = () => {
    const { t } = useTranslation();
    return (
        <Tooltip
            shouldWrapChildren
            hasArrow
            label={t('Go to page', { page: t('Github') })}
            placement='left-start'
        >
            <Link href='https://github.com/Xhofe/alist' isExternal>
                <IconButton
                    size='md'
                    aria-label={t('Go to page', { page: t('Github') })}
                    variant='ghost'
                    colorScheme='brand'
                    icon={<Icon as={DiGithubAlt} boxSize={6} />}
                />
            </Link>
        </Tooltip>
    );
};
