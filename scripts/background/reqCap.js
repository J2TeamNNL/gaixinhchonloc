chrome.webRequest.onBeforeRequest.addListener((catches) => {
	let urlTable = {
		"https://t.flickr.com/com.snowplowanalytics.snowplow/tp2": () => {
			chrome.tabs.executeScript(catches.tabId, {
				file: "scripts/injects/flickr.js", // [Optional] || Path from the root of ext. Ex: Err: injectScript/script.js | Success: js/injectScript/script.js
			});
		}
	}
	if (catches.url in urlTable) urlTable[catches.url]();
}, { urls: ["<all_urls>"], types: ["main_frame", "xmlhttprequest", "media"] });