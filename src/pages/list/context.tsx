import { Center, Spinner, useToast } from '@chakra-ui/react';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClimbingBoxLoader } from 'react-spinners';
import useLocalStorage from '../../hooks/useLocalStorage';
import admin from '../../utils/admin';
import request from '../../utils/public';

export interface File {
    name: string;
    size: number;
    type: number;
    driver: string;
    updated_at: string;
    thumbnail: string;
    url: string;
    size_str?: string;
    time_str?: string;
}

export interface Resp<T> {
    code: number;
    message: string;
    data: T;
}

export interface Meta {
    driver: string;
    upload: boolean;
    total: number;
}

export interface PathResp {
    type: TypeType;
    meta: Meta;
    files: File[];
}

export interface FileProps {
    file: File;
    readme?: boolean;
}

interface Setting {
    key: string;
    value: string;
    // type: string;
}

var Settings: Setting[] = [];

export const getSetting = (key: string): string => {
    const setting = Settings.find((setting) => setting.key === key);
    return setting ? setting.value : '';
};

type TypeType =
    | 'file'
    | 'folder'
    | 'error'
    | 'loading'
    | 'unauthorized'
    | 'nexting';

interface Sort {
    orderBy?: 'name' | 'updated_at' | 'size';
    reverse: boolean;
}

interface Page {
    page_num: number;
    page_size: number;
}

export interface ContextProps {
    files: File[];
    setFiles: (files: File[]) => void;
    type: TypeType;
    setType: (type: TypeType) => void;
    show: string;
    setShow?: (show: string) => void;
    getSetting: (key: string) => string;
    showUnfold?: boolean;
    setShowUnfold?: (showFolder: boolean) => void;
    unfold?: boolean;
    setUnfold?: (fold: boolean) => void;
    lastFiles: File[];
    setLastFiles: (files: File[]) => void;
    password: string;
    setPassword?: (password: string) => void;
    settingLoaded: boolean;
    msg: string;
    setMsg: (msg: string) => void;
    sort: Sort;
    setSort: (sort: Sort) => void;
    multiSelect: boolean;
    setMultiSelect: (value: boolean | ((val: boolean) => boolean)) => void;
    selectFiles: File[];
    setSelectFiles: (files: File[]) => void;
    meta: Meta;
    setMeta: (meta: Meta) => void;
    loggedIn: boolean;
    page: Page;
    setPage: (page: Page) => void;
}

export const IContext = createContext<ContextProps>({
    files: [],
    setFiles: () => {},
    type: 'folder',
    show: 'list',
    getSetting: getSetting,
    lastFiles: [],
    setLastFiles: () => {},
    password: '',
    settingLoaded: false,
    msg: '',
    setMsg: () => {},
    sort: { reverse: false },
    setSort: () => {},
    multiSelect: false,
    setMultiSelect: () => {},
    selectFiles: [],
    setSelectFiles: () => {},
    setType: () => {},
    meta: { driver: '', upload: false, total: 0 },
    setMeta: () => {},
    loggedIn: false,
    page: { page_num: 1, page_size: 30 },
    setPage: () => {},
});

const IContextProvider = (props: any) => {
    const toast = useToast();
    const { t } = useTranslation();
    const [files, setFiles] = React.useState<File[]>([]);
    const [lastFiles, setLastFiles] = React.useState<File[]>([]);
    const [type, setType] = React.useState<TypeType>('loading');
    const [msg, setMsg] = useState('');
    const [settingLoaded, setSettingLoaded] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState<string>(
        localStorage.getItem('password') || '',
    );
    const [sort, setSort] = useState<Sort>({
        orderBy: undefined,
        reverse: false,
    });
    const [multiSelect, setMultiSelect] = useLocalStorage('multiSelect', false);
    const [selectFiles, setSelectFiles] = useState<File[]>([]);

    const [show, setShow] = React.useState<string>(
        localStorage.getItem('show') || 'list',
    );

    const [page, setPage] = React.useState<Page>({
        page_num: 1,
        page_size: 30,
    });

    const initialSettings = useCallback(() => {
        request
            .get('settings')
            .then((resp) => {
                const res = resp.data;
                if (res.code === 200) {
                    Settings = res.data;
                    document.title = getSetting('title') || 'Alist';
                    const version = getSetting('version') || 'Unknown';
                    console.log(
                        `%c Alist %c ${version} %c https://github.com/Xhofe/alist`,
                        'color: #fff; background: #5f5f5f',
                        'color: #fff; background: #4bc729',
                        '',
                    );
                    if (getSetting('favicon')) {
                        const link = (document.querySelector("link[rel*='icon']")
                            || document.createElement('link')) as HTMLLinkElement;
                        link.type = 'image/x-icon';
                        link.rel = 'shortcut icon';
                        link.href = getSetting('favicon');
                        document.getElementsByTagName('head')[0].appendChild(link);
                    }
                    setPage({
                        ...page,
                        page_size: parseInt(getSetting('default page size') || '30'),
                    });
                    setSettingLoaded(true);
                } else {
                    toast({
                        title: t(res.message),
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            })
            .catch((err) => {
                toast({
                    title: t('Error'),
                    description: err.message,
                    status: 'error',
                    duration: null,
                });
            });
    }, []);
    const login = useCallback(() => {
        if (!localStorage.getItem('admin-token')) {
            return;
        }
        admin.get('login').then((resp) => {
            if (resp.data.code === 200) {
                setLoggedIn(true);
            }
        });
    }, []);

    useEffect(() => {
        initialSettings();
        login();
    }, []);

    const [showUnfold, setShowUnfold] = React.useState<boolean>(false);
    const [unfold, setUnfold] = React.useState<boolean>(false);

    const [meta, setMeta] = React.useState<Meta>({
        driver: '',
        upload: false,
        total: 0,
    });
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    if (!settingLoaded) {
        return (
            <Center w='full' h='100vh'>
                {/* <Spinner color={getSetting("icon color") || "#1890ff"} size="xl" /> */}
                <ClimbingBoxLoader color='#1890ff' loading={true} size={20} />
            </Center>
        );
    }
    return (
        <IContext.Provider
            value={{
                files,
                setFiles,
                type,
                setType,
                show,
                setShow,
                getSetting,
                showUnfold,
                setShowUnfold,
                unfold,
                setUnfold,
                lastFiles,
                setLastFiles,
                password,
                setPassword,
                settingLoaded,
                msg,
                setMsg,
                sort,
                setSort,
                multiSelect,
                setMultiSelect,
                selectFiles,
                setSelectFiles,
                meta,
                setMeta,
                loggedIn,
                page,
                setPage,
            }}
            {...props}
        />
    );
};

export default IContextProvider;
