chrome.runtime.onMessage.addListener((message) => {
  if (message.new_tab) {
    chrome.tabs.create({
      url: message.url,
    });
  } else {
    chrome.tabs.update({
      url: message.url,
    });
  }
});
