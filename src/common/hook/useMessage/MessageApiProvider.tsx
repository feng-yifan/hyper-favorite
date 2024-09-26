import { MessageApiContext } from '@common/hook/useMessage/index.ts';
import { THasChildren } from '@typing.ts';
import { message } from 'antd';
import React from 'react';

const MessageApiProvider: React.FC<THasChildren> = (props) => {
  const [api, contentHolder] = message.useMessage();
  return <>
    <MessageApiContext.Provider value={api}>
      {contentHolder}
      {props.children}
    </MessageApiContext.Provider>
  </>;
};

export default MessageApiProvider;
