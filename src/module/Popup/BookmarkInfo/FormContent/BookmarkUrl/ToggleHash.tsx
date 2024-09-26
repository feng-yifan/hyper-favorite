import TagButton from "@common/component/TagButton.tsx";
import { TExport, THash } from '@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/useBookmarkUrl.ts';

const ToggleHash = (props: { handler: TExport<THash> }) => {

  const toggleHash = () => {
    props.handler.setter({
      value: props.handler.value.value,
      enable: !props.handler.value.enable,
    });
  };

  return <>
    {props.handler.value.value && <TagButton
      onClick={toggleHash}
      textStyleDeleted={props.handler.value.enable}
    >{props.handler.value.value}</TagButton>
    }
  </>;
};

export default ToggleHash;
