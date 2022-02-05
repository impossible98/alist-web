import { Center, Image, Spinner } from '@chakra-ui/react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import * as React from 'react';
import useFileUrl from '../../../hooks/useFileUrl';
import { FileProps, IContext } from '../context';

export const type = 6;
export const exts = [];

function ImagePreview({ file }: FileProps) {
    const fileUrl = useFileUrl();
    const [url, setUrl] = React.useState('');
    const { getSetting, password } = React.useContext(IContext);
    React.useEffect(() => {
        setUrl(fileUrl(file));
    }, []);
    return (
        // <Center className='image-box' w='full'>
        //     <Image
        //         maxH='75vh'
        //         fallback={<Spinner color={getSetting('icon color') || '#1890ff'} size='xl' />}
        //         rounded='lg'
        //         src={url}
        //     />
        // </Center>

        <Box>
            <ImageList
                sx={{
                    borderRadius: '10px',
                    width: '80%',
                }}
                cols={1}
            >
                <ImageListItem>
                    <img
                        src={url}
                        loading='lazy'
                    />
                </ImageListItem>
            </ImageList>
        </Box>
    );
}

export default ImagePreview;
