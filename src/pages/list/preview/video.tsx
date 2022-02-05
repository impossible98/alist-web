import {
    Box,
    Button,
    Center,
    chakra,
    HStack,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import Artplayer from 'artplayer';
import flvjs from 'flv.js';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCardList } from 'react-icons/bs';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import useFileUrl from '../../../hooks/useFileUrl';
import useFolderLink from '../../../hooks/useFolderLink';
import { isMobile, userAgent } from '../../../utils/compatibility';
import { FileProps, IContext } from '../context';

export const type = 3;
export const exts = [];
const DirectDrivers = ['Native', 'GoogleDrive'];

const Video = ({ file }: FileProps) => {
    const { getSetting, lastFiles } = useContext(IContext);
    const videoFiles = lastFiles.filter((f) => f.type === type);
    const { i18n } = useTranslation();
    let fileUrl = useFileUrl();
    let link = fileUrl();
    const proxyLink = useFolderLink(true);
    const url = DirectDrivers.includes(file.driver) ? link : file.url;
    const history = useHistory();
    let art: Artplayer;
    const subtitleSize = useBreakpointValue({
        base: '30px',
        md: '50px',
    });
    useEffect(() => {
        let options: any = {
            container: '#video-player',
            url: url,
            title: file.name,
            // theme: '#000',
            volume: 0.8,
            muted: false,
            autoplay: getSetting('autoplay video') === 'true',
            autoSize: false,
            autoMini: true,
            screenshot: !file.name.endsWith('.m3u8'),
            hotkey: true,
            pip: true,
            mutex: true,
            fullscreen: true,
            fullscreenWeb: true,
            miniProgressBar: true,
            whitelist: ['*'],
            lang: i18n.language === 'zh' ? 'zh-cn' : 'en',
            customType: {
                flv: function(video: HTMLMediaElement, url: string, art: Artplayer) {
                    const flvPlayer = flvjs.createPlayer(
                        {
                            type: 'flv',
                            url: url,
                        },
                        { referrerPolicy: 'no-referrer' },
                    );
                    flvPlayer.attachMediaElement(video);
                    flvPlayer.load();
                },
            },
            moreVideoAttr: {
                'webkit-playsinline': true,
                playsInline: true,
                // controls: true,
            },
        };
        if (file.name.toLowerCase().endsWith('.flv')) {
            options.type = 'flv';
        }
        if (getSetting('artplayer whitelist')) {
            options.whitelist = getSetting('artplayer whitelist').split(',');
        } else {
            options.whitelist = [];
        }
        const useArt = !isMobile
            || options.whitelist.some((item: string) => {
                return item === '*' || userAgent.indexOf(item) > -1;
            });
        if (!useArt) {
            options.moreVideoAttr.controls = true;
        }
        if (getSetting('artplayer autoSize') === 'true') {
            options.autoSize = true;
        }
        // try subtitle
        const filename = file.name.substring(0, file.name.lastIndexOf('.'));
        let subtitleType = '';
        const subtitle = lastFiles.find((f) => {
            const fName = f.name;
            if (!fName.startsWith(filename)) {
                return false;
            }
            for (const ext of ['.srt', '.ass', '.vtt']) {
                if (fName.endsWith(ext)) {
                    return true;
                }
            }
            return false;
        });
        if (subtitle) {
            const preLink = proxyLink;
            const subLink = preLink + '/' + subtitle.name;
            options.subtitle = {
                type: subtitleType,
                url: fileUrl(subtitle),
                bilingual: true,
                style: {
                    color: '#03A9F4',
                    'font-size': subtitleSize,
                },
            };
        }
        art = new Artplayer(options);
        art.on('video:ended', () => {
            const index = videoFiles.findIndex((f) => f.name === file.name);
            if (index < videoFiles.length - 1) {
                history.push(encodeURI(videoFiles[index + 1].name));
            }
        });
        return () => {
            if (art && art.destroy) {
                art.destroy();
            }
        };
    }, []);
    return (
        <Box w='full' className='video-preview-box'>
            <Menu>
                <MenuButton
                    rightIcon={<Icon boxSize={6} as={BsCardList} />}
                    w='full'
                    colorScheme='gray'
                    as={Button}
                    mb={2}
                >
                    <Text
                        w='full'
                        textOverflow='ellipsis'
                        whiteSpace='nowrap'
                        overflow='hidden'
                    >
                        {file.name}
                    </Text>
                </MenuButton>
                <MenuList w='full' zIndex={999}>
                    {videoFiles.map((f) => (
                        <MenuItem key={f.name} w='full'>
                            <Link
                                textOverflow='ellipsis'
                                whiteSpace='nowrap'
                                overflow='hidden'
                                maxW='85vw'
                                w='full'
                                as={ReactLink}
                                _hover={{
                                    textDecoration: 'none',
                                }}
                                to={encodeURI(f.name)}
                            >
                                {f.name}
                            </Link>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
            <Box
                w='full'
                h='75vh'
                id='video-player'
            >
            </Box>
            <Center
                mt='2'
                w='full'
            >
                <HStack spacing='2'>
                    <Button
                        colorScheme='orange'
                        as={chakra.a}
                        href={`vlc://${link}`}
                    >
                        VLC
                    </Button>
                </HStack>
            </Center>
        </Box>
    );
};

export default Video;
