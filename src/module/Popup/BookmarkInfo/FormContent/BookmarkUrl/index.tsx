import TagButton from '@common/component/TagButton.tsx';
import RemoveSlash from "@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/RemoveSlash.tsx";
import ToggleHash from "@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/ToggleHash.tsx";
import ToggleParams from "@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/ToggleParams.tsx";
import ToggleProtocol from "@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/ToggleProtocol.tsx";
import useBookmarkUrl from '@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/useBookmarkUrl.ts';
import { TCustomFormItem } from '@typing.ts';
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import styled from 'styled-components';

const BookmarkUrl: TCustomFormItem<{
  path: string
  fullPath: string
}, {
  defaultFullPath: string
}> = (props) => {
  const url = useBookmarkUrl(props.defaultFullPath);

  useEffect(() => {
    props.onChange?.({path: url.path.value, fullPath: url.fullPath});
  }, [url.fullPath]);

  const STextArea = styled(TextArea)`
      cursor      : default;
      user-select : none;
      word-break  : break-all;
  `;

  const reset = () => {
    url.reset();
  };

  return <>
    <STextArea
      autoSize={true}
      id={props.id}
      readOnly
      value={props.value?.fullPath}
    />
    <RemoveSlash handler={url.path}/>
    <ToggleProtocol handler={url.protocol}/>
    <ToggleParams handler={url.params}/>
    <ToggleHash handler={url.hash}/>
    {props.defaultFullPath !== url.fullPath
      && <TagButton onClick={reset}>还原</TagButton>
    }
  </>;
};
export default BookmarkUrl;
