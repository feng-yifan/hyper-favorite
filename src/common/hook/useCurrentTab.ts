import Tab = chrome.tabs.Tab;
import TabUpdatedEvent = chrome.tabs.TabUpdatedEvent;
import { TParameter } from '@typing.ts';
import { useEffect, useState } from "react";
import helper from "src/framework/helper";

const useCurrentTab = () => {
  const [currentTab, setCurrentTab] = useState<Tab>();

  useEffect(() => {
    helper.tab.getCurrentTab().then(setCurrentTab);
  }, []);

  useEffect(() => {
    chrome.tabs.onUpdated.addListener(tabUpdateEventListener);
  }, []);

  const tabUpdateEventListener: TParameter<TabUpdatedEvent['addListener'], 0> = (_, __, tab) => {
    setCurrentTab(currentTab => updateTab(currentTab, tab));
  };

  const updateTab = (currentTab: undefined | Tab, updatedTab: Tab) => {
    return currentTab && currentTab.id === updatedTab.id
      ? updatedTab
      : currentTab;
  };

  return currentTab;
};

export default useCurrentTab;
