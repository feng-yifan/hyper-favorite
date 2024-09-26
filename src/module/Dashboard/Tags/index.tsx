import TagTree from "@module/Dashboard/Tags/TagTree.tsx";
import CreateTagService from '@service/tag/CreateTagService.ts';
import { Button, FormProps, Input } from "antd";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";

type TFrom = {
  name: string
  parentId?: string
}

const Tags = () => {

  const onFinish: FormProps<TFrom>['onFinish'] = (values) => {
    const parentId = values.parentId
      ? parseInt(values.parentId)
      : undefined;
    new CreateTagService().handle(values.name, parentId);
  };

  return <>
    <Form<TFrom>
      onFinish={onFinish}
    >
      <FormItem label={'父标签'} name={'parentId'}>
        <Input/>
      </FormItem>
      <FormItem
        label={'标签名称'}
        name={'name'}
        rules={[{required: true, message: '名称必须填写'}]}
      >
        <Input/>
      </FormItem>
      <FormItem>
        <Button htmlType={'submit'}>添加</Button>
      </FormItem>
    </Form>
    <TagTree/>
  </>;
};

export default Tags;
