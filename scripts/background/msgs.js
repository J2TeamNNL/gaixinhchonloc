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
	var fncTable = {
		download: () => _download(msg.download),
		updateBadge: () => _updateBadge(++blocked_counter, msg.updateBadge.color)
	};
	fncTable[Object.keys(msg)[0]]();
});