let stored_message

// Listen for navigation to the target web page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url == "https://auth.cityu.edu.hk/"
    && !stored_message) {
    // Create a new tab with a button to initiate the Bluetooth connection
    chrome.tabs.create({ url: "bluetooth.html" });
    return;
  } else if (stored_message) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, stored_message);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.tab && sender.tab.url.startsWith("chrome-extension:") && message.account && message.password) {
    stored_message = message;
    chrome.tabs.query({ url: "https://auth.cityu.edu.hk/*" }, tabs => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        // Send a message to the content script in the matching tab
        chrome.tabs.sendMessage(tabId, stored_message);
      }
    });
  } else if (message.clear === true) {
    stored_message = null;
  }
});

