import TagButton from '@common/component/TagButton.tsx';
import { TCustomFormItem } from '@typing.ts';
import TextArea from "antd/es/input/TextArea";
import { ChangeEventHandler } from 'react';

const BookmarkName: TCustomFormItem<string, {
  defaultName: string
}> = (props) => {
  // 移除两端空格，中间的多个空格压缩为一个空格
  const removeExtraSpace = () => {
    props.onChange?.(props.value!.trim().replace(/\s+/g, ' '));
  };

  const reset = () => {
    props.onChange?.(props.defaultName);
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    props.onChange?.(e.target.value);
  };

  return <>
    <TextArea
      autoSize
      id={props.id}
      value={props.value}
      onChange={onChange}
    />
    <TagButton onClick={removeExtraSpace}>缩紧空格</TagButton>
    {props.value !== props.defaultName
      && <TagButton onClick={reset}>还原</TagButton>
    }
  </>;
};

export default BookmarkName;
