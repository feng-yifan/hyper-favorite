import Tab = chrome.tabs.Tab;

/**
 * 判断 tab 是否具有 title 与 url 属性
 * @param tab
 */
const hasUrlAndTitle = (tab: Tab | undefined): tab is Required<Tab> => {
  return tab?.url !== undefined && tab?.title !== undefined;
};

/**
 * 获取当前标签页对象
 */
const getCurrentTab = async () => {
  return await chrome.tabs.query({active: true, currentWindow: true}).then(tabs => tabs[0]);
};

const tab = {
  hasUrlAndTitle,
  getCurrentTab,
};

export default tab;
