import { createHashRouter, RouterProvider } from "react-router-dom";
import routes from "@module/Dashboard/routes.tsx";

const Dashboard = () => {
  return <>
    <RouterProvider router={createHashRouter(routes)}/>
  </>;
};

export default Dashboard;
