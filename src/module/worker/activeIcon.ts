import bookmark_active from '@assert/images/bma64.png';
import BookmarkRepository from '@repository/BookmarkRepository.ts';
import helper from "src/framework/helper";

const bookmarkRepository = new BookmarkRepository();

/**
 * 插件首次加载时，获取所有处于 complete 状态的标签页，并高亮图标
 */
chrome.tabs.query({status: 'complete'}).then(tabs => {
  tabs.map((tab) => {
    if (helper.tab.hasUrlAndTitle(tab)) {
      bookmarkRepository.getByFullPath(tab.url).then(bookmark => {
        if (bookmark) {
          chrome.action.setIcon({path: bookmark_active, tabId: tab.id});
          chrome.action.setBadgeText({text: bookmark.tags.length.toString(), tabId: tab.id});
        }
      });
    }
  });
});

/**
 * 当页面状态变更为已完成时，高亮 icon
 */
chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (helper.tab.hasUrlAndTitle(tab)) {
    bookmarkRepository.getByFullPath(tab.url).then(bookmark => {
      if (bookmark) {
        chrome.action.setIcon({path: bookmark_active, tabId});
        chrome.action.setBadgeText({text: bookmark.tags.length.toString(), tabId});
      }
    });
  }
});
