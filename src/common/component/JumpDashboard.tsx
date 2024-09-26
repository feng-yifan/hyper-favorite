import { PATH_ENTRANCE_DASHBOARD } from "@constant.ts";
import { THasChildren, TRoutePath } from "@typing.ts";
import { ExportOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";

const JumpDashboard = (props: THasChildren<{
  buttonProps?: Exclude<ButtonProps, 'onClick' | 'icon'>
  to: TRoutePath
}>) => {
  const jump = () => {
    chrome.tabs.create({url: `${PATH_ENTRANCE_DASHBOARD}#${props.to}`});
  };

  return <>
    <Button
      {...props.buttonProps}
      icon={<ExportOutlined/>}
      onClick={jump}
    >{props.children}</Button>
  </>;
};

export default JumpDashboard;
