import helper from "@framework/helper";
import { Tag, TagProps } from "antd";
import styled from "styled-components";

const TagButton = (props: TagProps & {
  textStyleDeleted?: boolean
}) => {
  const STag = styled(Tag)`
      cursor               : pointer;
      margin-top           : 4px;
      text-decoration-line : ${props.textStyleDeleted ? 'line-through' : 'none'};
  `;
  return <STag {...helper.obj.cloneWithout(props, [
    'textStyleDeleted',
  ])}/>;
};

export default TagButton;
