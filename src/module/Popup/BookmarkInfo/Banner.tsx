import Bookmark from '@domain/bookmark/Bookmark.ts';
import { Alert, AlertProps } from 'antd';
import styled from 'styled-components';

const Banner = (props: { bookmark?: Bookmark }) => {
  const message = props.bookmark
    ? '当前标签页已经加入书签'
    : '当前标签页尚未加入书签';

  const type: AlertProps['type'] = props.bookmark
    ? 'success'
    : 'info';

  const SAlert = styled(Alert)`
      margin-bottom : 16px;
  `;

  return <>
    <SAlert message={message} showIcon type={type}/>
  </>;
};

export default Banner;
