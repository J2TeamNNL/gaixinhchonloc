'use strict';

(function (chrome) {
  // Store options
  chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({
      opts: {
        ads: true,
        store: true,
        shared_post: false,
        contains_keywords: false,
        yt: false
      }
    });
  }); // Fetch anything by background

  chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
      fetch(msg.url).then(function (data) {
        return data.json();
      }).then(function (data) {
        port.postMessage({
          response: data
        });
      });
    });
  });
})(chrome);