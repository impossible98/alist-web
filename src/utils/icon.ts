import {
    BsApple,
    // BsFillFolderFill,
    BsFileEarmarkWordFill,
    BsFillFileEarmarkExcelFill,
    BsFillFileEarmarkFontFill,
    BsFillFileEarmarkImageFill,
    BsFillFileEarmarkMinusFill,
    BsFillFileEarmarkMusicFill,
    BsFillFileEarmarkPdfFill,
    BsFillFileEarmarkPlayFill,
    BsFillFileEarmarkPptFill,
    BsFillFileEarmarkZipFill,
    BsFillMarkdownFill,
    BsWindows,
} from 'react-icons/bs';
import { DiAndroid } from 'react-icons/di';
import { FaBook, FaCompactDisc, FaDatabase } from 'react-icons/fa';
import { IoIosFolder } from 'react-icons/io';

const iconMap = {
    'dmg,ipa': BsApple,
    'exe,msi': BsWindows,
    'zip,gz,rar,7z,tar,jar,xz': BsFillFileEarmarkZipFill,
    apk: DiAndroid,
    db: FaDatabase,
    md: BsFillMarkdownFill,
    epub: FaBook,
    iso: FaCompactDisc,
};

const getIcon = (type: number, ext: string) => {
    if (type !== 1) {
        for (const [extensions, icon] of Object.entries(iconMap)) {
            if (extensions.split(',').includes(ext.toLowerCase())) {
                return icon;
            }
        }
    }
    switch (type) {
        case 1:
            return IoIosFolder;
        case 2: {
            if (ext === 'doc' || ext === 'docx') {
                return BsFileEarmarkWordFill;
            }
            if (ext === 'xls' || ext === 'xlsx') {
                return BsFillFileEarmarkExcelFill;
            }
            if (ext === 'ppt' || ext === 'pptx') {
                return BsFillFileEarmarkPptFill;
            } else {
                return BsFillFileEarmarkPdfFill;
            }
        }
        case 3:
            return BsFillFileEarmarkPlayFill;
        case 4:
            return BsFillFileEarmarkMusicFill;
        case 5:
            return BsFillFileEarmarkFontFill;
        case 6:
            return BsFillFileEarmarkImageFill;
        default:
            return BsFillFileEarmarkMinusFill;
    }
};

export default getIcon;
