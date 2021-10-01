var dlDer = {
	get template() {
		let btn = new DOMParser().parseFromString(`<div class="_PKfi"><span class="jr7pM" style="vertical-align:middle"><span class="jr7pM"><button class="xBRdB" aria-label="Download"><span class="vq1BT"><svg height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg"><g id="Solid"><path d="m239.029 384.97a24 24 0 0 0 33.942 0l90.509-90.509a24 24 0 0 0 0-33.941 24 24 0 0 0 -33.941 0l-49.539 49.539v-262.059a24 24 0 0 0 -48 0v262.059l-49.539-49.539a24 24 0 0 0 -33.941 0 24 24 0 0 0 0 33.941z"/><path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z"/></g></svg></span></button></span></span></div>`, "text/html").querySelector("div");
		btn.onclick = this.download;
		return btn;
	},
	append() {
		let items = Array.from(document.querySelectorAll("footer[role='contentinfo'] > div:nth-child(2):not([dlbtn])"));
		for (let item of items) {
			item.setAttribute("dlbtn", 1);
			item.prepend(this.template);
		}
	},
	download({path}) {
		let article = path.filter((tag) => tag.localName == "article")[0],
			img = Array.from(article.querySelectorAll("img[alt*='mage']"), (cImg) => cImg?.srcset.split(" ")?.slice(-2, -1)?.[0]),
			vid = Array.from(article.querySelectorAll("source"), (cVid) => cVid.src),
			dlArr = [...img, ...vid];
		if (dlArr.length) chrome.runtime.sendMessage({download: dlArr});
	}
}, observer = new MutationObserver((list) => {
	if (list.filter(({target}) => target.outerHTML.includes("<img")).length) dlDer.append();
});

// Wait until the DOM is loaded.
document.onreadystatechange = () => {
	if (document.readyState == "complete") {
		dlDer.append();
		// Observe Body
		observer.observe(document.body, { childList: true, subtree: true }); // Start Observe
	}
}