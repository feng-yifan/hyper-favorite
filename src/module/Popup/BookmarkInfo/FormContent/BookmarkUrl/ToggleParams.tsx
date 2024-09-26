import TagButton from "@common/component/TagButton.tsx";
import { TExport, TParam } from '@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/useBookmarkUrl.ts';

const ToggleParams = (props: { handler: TExport<TParam[]> }) => {

  const toggleParam = (index: number) => {
    const params = [...props.handler.value];
    params[index]['enable'] = !params[index]['enable'];
    props.handler.setter(params);
  };

  return <>
    {props.handler.value.map((param, index) => <TagButton
        key={index}
        onClick={() => toggleParam(index)}
        textStyleDeleted={!param.enable}
      >?{param.value}</TagButton>,
    )}
  </>;
};

export default ToggleParams;
