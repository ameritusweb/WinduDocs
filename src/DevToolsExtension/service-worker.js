chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    chrome.storage.local.set({ 'activeTabId': currentTab.id });
});

chrome.tabs.onActivated.addListener(handleTabActivated);

async function handleTabActivated(activeInfo) {
    try {
        if (activeInfo.tabId === -1)
        {
            return;
        }
        chrome.storage.local.set({ 'activeTabId': activeInfo.tabId });
      console.log("Success.");
    } catch (error) {
        console.error(error);
    }
  }