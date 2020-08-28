'use strict';

((chrome) => {
	// Store options
	chrome.runtime.onInstalled.addListener(() => {
		chrome.storage.local.set({
			opts: {
				qc: true,
				store: true,
				sharedPost: true,
				inclKeyword: true,
				yt: false,
			}
		});
	});

	// Fetch anything by background
	chrome.runtime.onConnect.addListener((port) => {
		port.onMessage.addListener((msg) => {
			if (msg.url) fetch(msg.url).then((data) => data.json()).then((data) => {
				port.postMessage({ response: data });
			});
		});
	});
})(chrome);