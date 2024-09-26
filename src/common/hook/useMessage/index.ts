import { MessageInstance } from 'antd/es/message/interface';
import { createContext, useContext } from 'react';

export const MessageApiContext = createContext(null as unknown as MessageInstance);

const useMessage = () => {
  const api = useContext(MessageApiContext);
  return {
    ...api,
  };
};

export default useMessage;
