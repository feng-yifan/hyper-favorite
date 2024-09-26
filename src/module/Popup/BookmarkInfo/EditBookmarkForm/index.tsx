import { SaveOutlined } from '@ant-design/icons';
import Bookmark from '@domain/bookmark/Bookmark.ts';
import { TFormContent } from '@module/Popup/BookmarkInfo/FormContent/typing.ts';
import UpdateBookmarkService from '@service/bookmark/UpdateBookmarkService.ts';
import { THasChildren } from '@typing.ts';
import { Button, FormProps } from 'antd';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';

const EditBookmarkForm: React.FC<THasChildren<{
  bookmark: Bookmark
  setBookmark: Dispatch<Bookmark>
}>> = (props) => {
  const SFormItem = styled(FormItem)`
      margin-bottom : 0;
  `;
  const [loading, setLoading] = useState(false);

  const edit: FormProps['onFinish'] = (values: Required<TFormContent>) => {
    setLoading(true);
    props.bookmark.update({
      name: values.name,
      path: values.pathInfo.path,
      fullPath: values.pathInfo.fullPath,
      tags: values.tags,
    });
    props.setBookmark(props.bookmark);
    new UpdateBookmarkService().handle(props.bookmark).then(() => {
      setLoading(false);
    });
  };
  return <>
    <Form onFinish={edit}>
      {props.children}
      <SFormItem>
        <Button
          htmlType={'submit'}
          icon={<SaveOutlined/>}
          loading={loading}
          type={'primary'}
        >修改并保存</Button>
      </SFormItem>
    </Form>
  </>;
};

export default EditBookmarkForm;
