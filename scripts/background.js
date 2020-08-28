'use strict';

(function (chrome) {
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