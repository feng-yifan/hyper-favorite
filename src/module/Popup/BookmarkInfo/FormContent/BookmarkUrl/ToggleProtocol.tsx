import { TExport, TProtocol } from '@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/useBookmarkUrl.ts';
import { Tag } from "antd";
import { useEffect, useState } from "react";

const ToggleProtocol = (props: { handler: TExport<TProtocol> }) => {

  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    setClickable(props.handler.value === 'http' || props.handler.value === 'https');
  }, [props.handler.value]);

  const toggleProtocol = () => {
    switch (props.handler.value) {
      case 'https':
        props.handler.setter('http');
        break;
      case 'http':
        props.handler.setter('https');
        break;
    }
  };

  return <>
    {clickable
      ? <Tag
        className={'clickable'}
        onClick={toggleProtocol}
      >{props.handler.value === 'http' ? 'https' : 'http'}</Tag>
      : null
    }
  </>;
};

export default ToggleProtocol;
