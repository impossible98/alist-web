import { Center, Heading, Icon, useColorModeValue } from '@chakra-ui/react';
import Box from '@mui/material/Box';
import * as musicMetadata from 'music-metadata-browser';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactJkMusicPlayer, { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

import useFileUrl from '../../../hooks/useFileUrl';
import getIcon from '../../../utils/icon';
import { FileProps, IContext } from '../context';

export const type = 4;
export const exts = [];

function Audio({ file }: FileProps) {
    const { lastFiles, getSetting } = React.useContext(IContext);
    const theme = useColorModeValue('light', 'dark');
    const { t, i18n } = useTranslation();
    const [audioLists, setAudioLists] = React.useState<
        ReactJkMusicPlayerAudioListProps[]
    >([]);
    const fileUrl = useFileUrl();
    // musicMetadata.parseBlob(fileUrl).then(metadata => {
    //     console.log(metadata.format.duration);
    // });
    const cover = getSetting('music cover')
        || 'https://store.heytapimage.com/cdo-portal/feedback/202110/30/d43c41c5d257c9bc36366e310374fb19.png';
    const singer = t('unknown');
    useEffect(() => {
        const audio: ReactJkMusicPlayerAudioListProps = {
            name: file.name,
            musicSrc: fileUrl(),
            cover: cover,
            singer: singer,
        };
        if (file.thumbnail) {
            audio.cover = file.thumbnail;
        }
        const audioList = lastFiles
            .filter((item) => item.name !== file.name && item.type === type)
            .map((item) => {
                let link = fileUrl(item);
                const audio = {
                    name: item.name,
                    musicSrc: link,
                    cover: cover,
                    singer: singer,
                };
                if (item.thumbnail) {
                    audio.cover = item.thumbnail;
                }
                return audio;
            });
        setAudioLists([audio, ...audioList]);
    }, []);
    return (
        <Box>
            <Center p='8' w='full'>
                <Heading display='inline-flex' alignItems='center'>
                    <Icon
                        color={getSetting('icon color') || '#1890ff'}
                        as={getIcon(file.type, '')}
                    />
                    {t('Enjoy the music')}...
                </Heading>
            </Center>
            <ReactJkMusicPlayer
                audioLists={audioLists}
                autoPlay={getSetting('autoplay audio') === 'true'}
                defaultPosition={{
                    left: 20,
                    bottom: 20,
                }}
                defaultVolume={0.7}
                glassBg
                locale={i18n.language === 'zh' ? 'zh_CN' : 'en_US'}
                mode='full'
                showDownload={false}
                showMediaSession={true}
                showThemeSwitch={false}
                theme={theme}
            />
        </Box>
    );
}

export default Audio;
