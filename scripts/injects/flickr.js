function appendHTML() {
	if (document.readyState !== "complete") return;
	if (document.querySelector("#gxcl_flickr")) return;
	let btn = new DOMParser().parseFromString(`
		<div id="gxcl_flickr" style="display: none;background: rgba(255, 255, 255, .5);width: fit-content;border-radius: 1em;margin: .5em 0 0 .5em;">
			<a href="#" style="color: #000;text-decoration: none;padding: .5em 1em;font-size: 1.2em;">Download</a>
		</div>
	`, "text/html").querySelector("div"),
		view = document.querySelector(".view.is-ready");
	btn.querySelector("a").onclick = (ev) => {
		ev.preventDefault();
		fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=621b3655c517a25e35ec61f6b9e4fbf3&photo_id=${ (new URL(document.URL)).pathname.match(/[^\\\/]+/g)[2] }&format=json&nojsoncallback=1`)
			.then((res) => res.json())
			.then((res) => res.sizes.size.slice(-1)[0].source)
			.then((a) => {
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