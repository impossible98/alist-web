import { Box } from '@chakra-ui/layout';
import React, { lazy, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import useFileUrl from '../../../hooks/useFileUrl';
import useUnfold from '../../../hooks/useUnfold';
import request from '../../../utils/public';
import { FileProps, IContext } from '../context';

export const type = 2;
export const exts = [];

declare namespace aliyun {
    class Config {
        setToken(token: { token: string }): any;
    }
    function config(options: { mount: Element; url: string }): Config;
}

const Pdf = lazy(() => import('./pdf'));

const Office = ({ file }: FileProps) => {
    const { pathname } = useLocation();
    const { password } = useContext(IContext);
    let fileUrl = useFileUrl();
    const { unfold, setShowUnfold } = useUnfold(false);
    const [show, setShow] = React.useState<string>('');
    const [pdf, setPdf] = React.useState('');
    const refresh = () => {
        if (file.driver === 'AliDrive') {
            request
                .post('preview', { path: pathname, password: password })
                .then((resp) => {
                    const res = resp.data;
                    if (res.code !== 200) {
                        return;
                    }
                    const docOptions = aliyun.config({
                        mount: document.querySelector('#office-preview')!,
                        url: res.data.preview_url,
                    });
                    docOptions.setToken({ token: res.data.access_token });
                });
        } else {
            // if (file.driver === "Native")
            if (file.name.endsWith('.pdf')) {
                setPdf(fileUrl());
                setShow('pdf');
            } else {
                setShow('office');
            }
            setShowUnfold!(true);
        }
    };
    useEffect(() => {
        refresh();
    }, []);
    return (
        <Box
            w='full'
            h={unfold ? 'full' : '75vh'}
            pos={unfold ? 'fixed' : 'unset'}
            left={unfold ? '0' : 'unset'}
            top={unfold ? '0' : 'unset'}
            id='office-preview'
            transition='all 0.3s'
            backdropFilter='blur(10px)'
            className='office-preview-box'
        >
            {show === 'office' && (
                <iframe
                    width='100%'
                    height='100%'
                    src={`https://view.officeapps.live.com/op/view.aspx?src=${
                        encodeURIComponent(
                            fileUrl(),
                        )
                    }`}
                    frameBorder='0'
                />
            )}
            {show === 'pdf' && <Pdf url={pdf} unfold={unfold || false} />}
        </Box>
    );
};

export default Office;
