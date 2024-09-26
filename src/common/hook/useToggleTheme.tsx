import {MoonOutlined, SunOutlined} from '@ant-design/icons';
import {Button, ButtonProps, DropdownProps, MappingAlgorithm, MenuProps, theme as themeAlgorithms} from 'antd';
import Dropdown from 'antd/es/dropdown/dropdown';
import {ReactNode, useEffect, useMemo, useState} from 'react';
import store from 'store2';

type TThemeSetting = 'dark' | 'light' | 'auto';
type TTheme = Exclude<TThemeSetting, 'auto'>

const useToggleTheme = (props?: {
    defaultTheme?: TThemeSetting     // 默认主题
    showTextOutside?: boolean // 外部 Dropdown 是否展示文字
    storageKey?: string       // 是否在 local storage 中托管主题设置
    dropdownProps?: DropdownProps
    dropdownButtonProps?: Omit<ButtonProps, 'children'>
}) => {
    const getDefaultThemeSetting = () => props?.storageKey
        ? store.get(props.storageKey, props.defaultTheme ?? 'auto')
        : props?.defaultTheme ?? 'auto';
    const preferDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemDefaultTheme: TTheme = preferDarkTheme ? 'dark' : 'light';
    const systemDefaultThemeIcon = useMemo(() => preferDarkTheme ? <MoonOutlined/> : <SunOutlined/>, [preferDarkTheme]);
    const [userThemeSetting, setUserThemeSetting] = useState<TThemeSetting>(getDefaultThemeSetting);
    const [theme, setTheme] = useState<TTheme>(systemDefaultTheme);
    const [algorithms, setAlgorithms] = useState<MappingAlgorithm[]>([]);
    const [btnContent, setBtnContent] = useState<ReactNode>('');

    useEffect(() => {
        if (theme === 'dark') {
            setAlgorithms([themeAlgorithms.darkAlgorithm]);
        } else {
            setAlgorithms([themeAlgorithms.defaultAlgorithm]);
        }
    }, [theme]);

    useEffect(() => {
        if (userThemeSetting === 'dark') {
            setTheme('dark');
        } else if (userThemeSetting === 'light') {
            setTheme('light');
        } else {
            setTheme(systemDefaultTheme);
        }
    }, [systemDefaultTheme, userThemeSetting]);

    useEffect(() => {
        if (theme === 'dark') {
            setBtnContent(<><MoonOutlined/>{props?.showTextOutside && ' 黑暗模式'}</>);
        } else if (theme === 'light') {
            setBtnContent(<><SunOutlined/>{props?.showTextOutside && ' 明亮模式'}</>);
        } else {
            setBtnContent(<>{systemDefaultThemeIcon}{props?.showTextOutside && ' 跟随系统'}</>);
        }
    }, [theme, props?.showTextOutside, systemDefaultThemeIcon]);

    const dropDownMenu: MenuProps = {
        items: [
            {label: '明亮模式', key: 'light', icon: <SunOutlined/>},
            {label: '黑暗模式', key: 'dark', icon: <MoonOutlined/>},
            {label: '跟随系统', key: 'auto', icon: systemDefaultThemeIcon},
        ],
        onClick: (e) => {
            setUserThemeSetting(e.key as TThemeSetting);
            storeTheme(e.key as TThemeSetting);
        },
    };

    const storeTheme = (theme: TThemeSetting) => {
        if (props?.storageKey) {
            store.set(props.storageKey, theme);
        }
    };

    return {
        algorithms,
        changeTheme: <>
            <Dropdown {...props?.dropdownProps} menu={dropDownMenu}>
                <Button {...props?.dropdownButtonProps} children={btnContent}/>
            </Dropdown>
        </>,
    };
};

export default useToggleTheme;
