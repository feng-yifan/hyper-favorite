import useCurrentTab from '@common/hook/useCurrentTab.ts';
import useToggleTheme from '@common/hook/useToggleTheme.tsx';
import helper from '@framework/helper';
import {Prefix} from '@framework/helper/storage.ts';
import BookmarkInfo from '@module/Popup/BookmarkInfo';
import Header from '@module/Popup/Header';
import {ConfigProvider, Layout, Skeleton, theme} from 'antd';
import styled from 'styled-components';
import {Suspense} from 'react';

const Popup = () => {
  const {algorithms, changeTheme} = useToggleTheme({
    storageKey: Prefix.THEME_POPUP,
    dropdownButtonProps: {type: 'text'},
  });
  const currentTab = useCurrentTab();

  const SContainer = styled('div')`
      padding: 8px;
      margin-top: 28.8px;
  `;

  return <>
    <ConfigProvider
      button={{autoInsertSpace: false}}
      theme={{
        algorithm: [...algorithms, theme.compactAlgorithm],
        cssVar: true,
        token: {
          fontFamily: 'LXGW WenKai Mono Screen',
        },
      }}
    >
      <Suspense fallback={123}>
        {currentTab && helper.tab.hasUrlAndTitle(currentTab)
          ? <>
            <Header changeTheme={changeTheme} title={'Home'}/>
            <Layout>
              <SContainer>
                <BookmarkInfo currentTab={currentTab}/>
              </SContainer>
            </Layout>
          </>
          : <Skeleton/>
        }
      </Suspense>
    </ConfigProvider>
  </>;
};

export default Popup;
