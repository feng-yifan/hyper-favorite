import { PATH_ROUTE_HOME, PATH_ROUTE_TAGS } from "@constant.ts";
import DefaultLayout from "@module/Dashboard/DefaultLayout.tsx";
import Tags from "@module/Dashboard/Tags";
import { MenuDataItem } from "@ant-design/pro-components";
import { NonIndexRouteObject } from "react-router-dom";

export type TRoute = Omit<NonIndexRouteObject, 'children' | 'Component'>
  & Omit<MenuDataItem, 'children' | keyof NonIndexRouteObject>
  & {
  children?: TRoute[]
  uesLayout?: false
}

export const routesInsideDefaultLayout: TRoute[] = [{
  path: PATH_ROUTE_TAGS,
  name: '标签',
  element: <Tags/>,
}];

const routes: TRoute[] = [{
  element: <DefaultLayout/>,
  children: [
    {path: PATH_ROUTE_HOME, element: <h1>HOME</h1>},
    ...routesInsideDefaultLayout,
  ],
}, {
  path: '*',
  element: <div>Error 404</div>,
}];

export default routes;
