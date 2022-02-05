import { Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import Box from '@mui/material/Box';
import axios from 'axios';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import useFileUrl from '../../../hooks/useFileUrl';
import { FileProps, IContext } from '../context';
import '../styles/github-markdown.css';

export const type = 5;
export const exts = [];

function Markdown({ file, readme }: FileProps) {
    const [content, setContent] = React.useState('');
    const { getSetting } = React.useContext(IContext);
    let link = useFileUrl(true)(file);
    const refresh = () => {
        if (readme) {
            if (file.type === -1) {
                link = file.url;
            }
        }
        axios
            .get(link, {
                responseType: 'blob',
            })
            .then(async (resp) => {
                const blob = resp.data;
                let res = await blob.text();
                if (res.includes('�')) {
                    const decoder = new TextDecoder('gbk');
                    res = decoder.decode(await blob.arrayBuffer());
                }
                if (file.name.endsWith('.md')) {
                    setContent(res);
                } else {
                    setContent(
                        '```' + file.name.split('.').pop() + '\n' + res + '\n' + '```',
                    );
                }
            });
    };
    React.useEffect(() => {
        refresh();
        return () => {
            setContent('');
        };
    }, []);
    if (content) {
        return (
            <Box className='markdown-body'>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                        rehypeRaw,
                        [rehypeHighlight, { ignoreMissing: true }],
                    ]}
                >
                    {content}
                </ReactMarkdown>
            </Box>
        );
    } else {
        return (
            <Center w='full'>
                <Spinner color={getSetting('icon color')} size='xl' />
            </Center>
        );
    }
}

export default Markdown;
