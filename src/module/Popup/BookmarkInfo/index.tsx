import Tab = chrome.tabs.Tab;
import Bookmark from '@domain/bookmark/Bookmark.ts';
import Banner from '@module/Popup/BookmarkInfo/Banner.tsx';
import CreateBookmarkForm from '@module/Popup/BookmarkInfo/CreateBookmarkForm';
import EditBookmarkForm from '@module/Popup/BookmarkInfo/EditBookmarkForm';
import FormContent from '@module/Popup/BookmarkInfo/FormContent';
import BookmarkRepository from '@repository/BookmarkRepository.ts';
import Card from 'antd/es/card/Card';
import { useEffect, useState } from 'react';

const BookmarkInfo = (props: { currentTab: Required<Tab> }) => {
  const [bookmark, setBookmark] = useState<Bookmark>();

  // 当标签页信息变化时，根据最新的标签页 URL 获取对应的书签
  useEffect(() => {
    new BookmarkRepository().getByFullPath(props.currentTab.url).then(setBookmark);
  }, [props.currentTab.url]);

  const formContent = <FormContent bookmark={bookmark} currentTab={props.currentTab}/>;

  return <>
    <Card bordered size={'small'}>
      <Banner bookmark={bookmark}/>
      {bookmark
        ? <EditBookmarkForm bookmark={bookmark} children={formContent} setBookmark={setBookmark}/>
        : <CreateBookmarkForm children={formContent} setBookmark={setBookmark}/>
      }
    </Card>
  </>;
};

export default BookmarkInfo;
