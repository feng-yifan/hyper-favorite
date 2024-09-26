import JumpDashboard from '@common/component/JumpDashboard.tsx';
import Bookmark from '@domain/bookmark/Bookmark.ts';
import BookmarkName from '@module/Popup/BookmarkInfo/FormContent/BookmarkName';
import BookmarkTags from '@module/Popup/BookmarkInfo/FormContent/BookmarkTags';
import BookmarkUrl from '@module/Popup/BookmarkInfo/FormContent/BookmarkUrl';
import { TFormContent } from '@module/Popup/BookmarkInfo/FormContent/typing.ts';
import FormItem from 'antd/es/form/FormItem';
import Tab = chrome.tabs.Tab;

const FormContent = (props: {
  bookmark?: Bookmark
  currentTab: Required<Tab>
}) => {
  const defaultName = props.bookmark?.name ?? props.currentTab.title;
  return <>
    <FormItem<TFormContent>
      initialValue={defaultName}
      label={'书签名称'}
      name={'name'}
      rules={[{required: true, message: '书签名称不能为空'}]}
    >
      <BookmarkName defaultName={defaultName}/>
    </FormItem>
    <FormItem<TFormContent>
      initialValue={{fullPath: props.currentTab.url}}
      label={'书签地址'}
      name={'pathInfo'}
      rules={[{required: true, message: '书签地址不能为空'}]}
    >
      <BookmarkUrl defaultFullPath={props.currentTab.url}/>
    </FormItem>
    <FormItem<TFormContent>
      initialValue={props.bookmark?.tags ?? []}
      label={[
        <span key={1}>标签</span>,
        <JumpDashboard buttonProps={{size: 'small', type: 'text'}} to={'/tags'} key={2}/>,
      ]}
      name={'tags'}
    >
      <BookmarkTags/>
    </FormItem>
  </>;
};

export default FormContent;
