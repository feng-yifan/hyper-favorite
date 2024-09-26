import MessageApiProvider from '@common/hook/useMessage/MessageApiProvider.tsx';
import Popup from "@module/Popup/index.tsx";
import { Layout } from 'antd';
import React from "react";
import '@module/Popup/main.less';
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MessageApiProvider>
      <Layout>
        <Popup/>
      </Layout>
    </MessageApiProvider>
  </React.StrictMode>,
);
