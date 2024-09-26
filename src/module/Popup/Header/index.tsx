import { GithubOutlined, HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Layout, Typography } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Header = (props: { changeTheme: ReactNode, title?: ReactNode }) => {
  const SContainer = styled.div`
      z-index  : 2000;
      position : fixed;
      top      : 0;
      width    : 100%;
  `;
  const SDivider = styled(Divider)`
      margin : 0;
  `;
  return <>
    <SContainer>
      <Layout>
        <Flex align={'center'} gap={'8px'} justify={'space-between'}>
          <ButtonGroup>
            <Button icon={<LeftOutlined/>} type={'text'}/>
            <Button icon={<HomeOutlined/>} type={'text'}/>
          </ButtonGroup>
          <Typography.Text>{props.title}</Typography.Text>
          <ButtonGroup>
            <Button icon={<GithubOutlined/>} type={'text'}/>
            {props.changeTheme}
          </ButtonGroup>
        </Flex>
        <SDivider/>
      </Layout>
    </SContainer>
  </>;
};

export default Header;
