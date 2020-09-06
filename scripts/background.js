'use strict'; // Functions

var blocked_counter = 0;

function _updateBadge() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "String";
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#155997"; // Because the badge has limited space, it should have 4 characters or less.
  // Convert anything to string

  if (typeof str !== "string") str = "" + str;
  chrome.browserAction.setBadgeBackgroundColor({
    color: color
  });
  chrome.browserAction.setBadgeText({
    text: str
  });
}

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
      },
      keywords: []
    });
    chrome.tabs.create({
      url: chrome.runtime.getURL("popup.html"),
      selected: true
    });
  }); // Long-lived connection

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
  }); // Short-lived connection. Actually just send the msg and quit.

  chrome.runtime.onMessage.addListener(function (msg, from, response) {
    var fncTable = {
      updateBadge: function updateBadge() {
        _updateBadge(++blocked_counter, msg.updateBadge.color);
      }
    };
    fncTable[Object.keys(msg)[0]]();
  }); // Open options page When Click To Icon

  chrome.browserAction.onClicked.addListener(function (a) {
    chrome.tabs.create({
      url: chrome.runtime.getURL("popup.html"),
      selected: true
    });
  });
})(chrome);