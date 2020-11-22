function appendHTML() {
	if (document.readyState !== "complete") return;
	if (document.querySelector("#gxcl_flickr")) return;
	if (!document.querySelector(".view.is-ready")) return;
	let btn = new DOMParser().parseFromString(`
		<div id="gxcl_flickr" style="display: none;background: rgba(255, 255, 255, .5);width: fit-content;border-radius: 1em;margin: .5em 0 0 .5em;">
			<a href="#" style="color: #000;text-decoration: none;padding: .5em 1em;font-size: 1.2em;">Download</a>
		</div>
	`, "text/html").querySelector("div"),
		view = document.querySelector(".view.is-ready");
	btn.querySelector("a").onclick = (ev) => {
		ev.preventDefault();
		new Promise((resolve) => {
			let sizesTable = ["o", "6k", "5k", "f", "4k", "3k", "k", "h", "b", "c", "z", "w", "n", "m", "t", "q", "s"],
				photoId = (new URL(document.URL)).pathname.match(/[^\\\/]+/g)[2],
				photoSizes = JSON.parse(document.querySelector(".modelExport").outerHTML.match(/(?<=modelExport:\s?)\{.*\}/g)).main["photo-models"][0].sizes,
				largest = `https:${photoSizes[sizesTable.find((curr) => (curr in photoSizes))].url}`;
			if (largest.includes(photoId)) {
				resolve(largest);
			} else {
				fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=621b3655c517a25e35ec61f6b9e4fbf3&photo_id=${ photoId }&format=json&nojsoncallback=1`)
					.then((res) => res.json())
					.then((res) => res.sizes.size.slice(-1)[0].source)
					.then((res) => resolve(res));
			}
		}).then((a) => {
			chrome.runtime.sendMessage({ download: a });
		});
	};
	view.onmouseover = (mouse) => {
		document.querySelector("#gxcl_flickr").style.display = "block";
	};
	view.onmouseleave = (mouse) => {
		document.querySelector("#gxcl_flickr").style.display = "none";
	}
	view.appendChild(btn);
	console.log("injected.", view);
}

appendHTML();
document.onreadystatechange = () => appendHTML();