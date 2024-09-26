import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "@assert/logo/bookmark-active.svg";
import { routesInsideDefaultLayout, TRoute } from "@module/Dashboard/routes.tsx";
import { useState } from "react";
import { PATH_ROUTE_HOME } from "@constant.ts";
import { ConfigProvider } from "antd";
import useToggleTheme from "@common/hook/useToggleTheme.tsx";
import { Prefix } from "@framework/helper/storage.ts";

type TRenderSetting = {
  headerRender?: false;
  footerRender?: false;
  menuRender?: false;
  menuHeaderRender?: false;
};
type TMenuItem = MenuDataItem & TRenderSetting

const DefaultLayout = () => {
  const navigate = useNavigate();
  const [pathname, setPathname] = useState<string>(window.location.hash.replace(/^#/g, ''));
  const {algorithms, changeTheme} = useToggleTheme({storageKey: Prefix.THEME_DASHBOARD, showTextOutside: true});

  const convertRoutesToMenuItem = (routes: TRoute[]): TMenuItem[] => routes.map(route => {
    const menuItem: TMenuItem = {};
    menuItem.path = route.path;
    menuItem.name = route.name;
    menuItem.hideInMenu = route.hideInMenu ?? false;
    if (route.useLayout === false) {
      menuItem.menuRender = false;
      menuItem.headerRender = false;
      menuItem.footerRender = false;
    }
    if (route.children) {
      menuItem.children = convertRoutesToMenuItem(route.children);
    }
    return menuItem;
  });

  return <ConfigProvider
    button={{autoInsertSpace: false}}
    theme={{
      algorithm: [...algorithms],
      cssVar: true,
      token: {
        fontFamily: 'LXGW WenKai Mono Screen',
      },
    }}
  >
    <ProLayout
      actionsRender={() => changeTheme}
      layout={'mix'}
      location={{pathname}}
      logo={logo}
      menuDataRender={() => convertRoutesToMenuItem(routesInsideDefaultLayout)}
      menuItemRender={(item, defaultDom) => {
        return item.path
          ? <Link to={item.path} onClick={() => setPathname(item.path!)}>{defaultDom}</Link>
          : defaultDom;
      }}
      onMenuHeaderClick={() => {
        navigate(PATH_ROUTE_HOME);
        setPathname(PATH_ROUTE_HOME);
      }}
      title={'Hyper Bookmark'}
    >
      <Outlet/>
    </ProLayout>
  </ConfigProvider>;
};

export default DefaultLayout;
