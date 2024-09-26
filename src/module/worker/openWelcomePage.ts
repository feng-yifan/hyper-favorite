import OnInstalledReason = chrome.runtime.OnInstalledReason;

/**
 * 安装插件后启动欢迎页
 */
chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'onboarding.html',
    });
  }
});
