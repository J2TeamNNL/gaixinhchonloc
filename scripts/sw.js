"use strict";

var blocked_counter = 0;
function _updateBadge(text = "String", color = "#155997") {
	// Because the badge has limited space, it should have 4 characters or less.
	// Convert anything to string
	if (typeof text !== "string") text = "" + text;
	chrome.browserAction.setBadgeBackgroundColor({ color });
	chrome.browserAction.setBadgeText({ text });
}
function _download(url) {
	chrome.downloads.download({ url });
}

// Store options
chrome.runtime.onInstalled.addListener(function () {
	// Check synced settings
	chrome.storage.sync.get(["name", "keywords"], ({ name, keywords }) => {
		if (!(name && keywords)) {
			chrome.storage.sync.set({
				opts: {
					ads: true,
					store: true,
					shared_post: false,
					contains_keywords: false,
					contains_name: false,
					yt: false,
				},
				keywords: [],
				name: [],
			});
		}
		chrome.tabs.create({
			url: chrome.runtime.getURL("popup.html"),
			selected: true,
		});
	});
	// Notification after install
	chrome.notifications.create({
		type: "basic",
		title: chrome.i18n.getMessage("appName"),
		message: "Extension Installed!",
		iconUrl: `../${chrome.runtime.getManifest().icons[128]}`,
		silent: true
	});
});

// Open options page When Click To Icon
chrome.action.onClicked.addListener(function (a) {
	chrome.tabs.create({
		url: chrome.runtime.getURL("popup.html"),
		selected: true,
	});
});

// Long-lived connection
chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		fetch(msg.url)
			.then((data) => data.json())
			.then(function (data) {
				port.postMessage({
				response: data
			});
		});
	});
});

// Short-lived connection. Actually just send the msg and quit.
chrome.runtime.onMessage.addListener(function(msg, from, response) {
	let fncTable = {
		download: () => {
			if (Array.isArray(msg.download)) {
				for (let url of msg.download) _download(url);
			} else {
				_download(msg.download);
			}
		},
		updateBadge: () => _updateBadge(++blocked_counter, msg.updateBadge.color)
	};
	fncTable[Object.keys(msg)[0]]();
});