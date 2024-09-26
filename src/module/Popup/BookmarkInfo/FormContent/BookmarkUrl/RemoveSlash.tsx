import {TExport} from '@module/Popup/BookmarkInfo/FormContent/BookmarkUrl/useBookmarkUrl.ts';
import TagButton from "@common/component/TagButton.tsx";

const RemoveSlash = (props: { handler: TExport<string> }) => {
    return <>
        <TagButton
            className={'clickable'}
            onClick={() => {
                props.handler.setter(props.handler.value.replace(/\/$/g, ''));
            }}
        >清理 /</TagButton>
    </>
}

export default RemoveSlash;
