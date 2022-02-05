import { useContext } from 'react';
import { File, IContext } from '../pages/list/context';
import { useEncrypt } from './useEncrypt';
import useFolderLink from './useFolderLink';
const useFileUrl = (proxy = false) => {
    const link = useFolderLink(proxy);
    const encrypt = useEncrypt();
    const { files } = useContext(IContext);
    return (file: File | undefined = undefined) => {
        if (!file) {
            file = files[0];
        }
        let url = link;
        if (!url.endsWith(file.name)) {
            url = `${url}/${file.name}`;
        }
        return encrypt(url);
    };
};
export default useFileUrl;
