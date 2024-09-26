import Dashboard from "@module/Dashboard/index.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import '@module/Dashboard/main.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard/>
  </React.StrictMode>,
);
