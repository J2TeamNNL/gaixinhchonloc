'use strict';

// Functions
function updateBadge(str = "String", color = "#155997") {
  // Because the badge has limited space, it should have 4 characters or less.
  chrome.browserAction.setBadgeBackgroundColor({ color: color });
  chrome.browserAction.setBadgeText({ text: str });
}

(function (chrome) {
  // Long-lived connection
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

  // Short-lived connection. Actually just send the msg and quit.
  chrome.runtime.onMessage.addListener((msg, from, response) => {
    let fncTable = {
      updateBadge: function() {
        updateBadge(msg.updateBadge.text, msg.updateBadge.color);
      }
    };
    
    fncTable[Object.keys(msg)[0]]();
  });
})(chrome);