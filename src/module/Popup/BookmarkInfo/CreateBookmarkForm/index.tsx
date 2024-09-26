import { SaveOutlined } from '@ant-design/icons';
import useMessage from '@common/hook/useMessage';
import Bookmark from '@domain/bookmark/Bookmark.ts';
import { TFormContent } from '@module/Popup/BookmarkInfo/FormContent/typing.ts';
import CreateBookmarkService from '@service/bookmark/CreateBookmarkService.ts';
import { THasChildren } from '@typing.ts';
import { Button, FormProps } from 'antd';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';

const CreateBookmarkForm: React.FC<THasChildren<{
  setBookmark: Dispatch<Bookmark>
}>> = (props) => {
  const SFormItem = styled(FormItem)`
      margin-bottom : 0;
  `;
  const [loading, setLoading] = useState(false);
  const message = useMessage();

  const createBookmark: FormProps['onFinish'] = (values: Required<TFormContent>) => {
    setLoading(true);
    new CreateBookmarkService().handle({
      name: values.name,
      path: values.pathInfo.path,
      fullPath: values.pathInfo.fullPath,
      tags: values.tags,
    }).then((bookmark) => {
      setLoading(false);
      props.setBookmark(bookmark);
      message.success('书签创建成功');
    });
  };

  return <>
    <Form onFinish={createBookmark}>
      {props.children}
      <SFormItem>
        <Button
          htmlType={'submit'}
          icon={<SaveOutlined/>}
          loading={loading}
          type={'primary'}
        >创建并保存</Button>
      </SFormItem>
    </Form>
  </>;
};
export default CreateBookmarkForm;
