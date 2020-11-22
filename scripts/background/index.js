"use strict";

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
		iconUrl: "../images/128.png",
		silent: true
	});

	/* Get user identity (logged in email + ID)
	Required permission: "identity", "identity.email"
	chrome.identity.getProfileUserInfo((uInfo) => console.log(uInfo));
	*/
});

// Open options page When Click To Icon
chrome.browserAction.onClicked.addListener(function (a) {
	chrome.tabs.create({
		url: chrome.runtime.getURL("popup.html"),
		selected: true,
	});
});