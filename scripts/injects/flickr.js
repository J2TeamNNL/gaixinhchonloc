function appendHTML() {
	setTimeout(() => {
		let btn = document.querySelector("a[title*='Download'] > i");
		if (btn && btn.parentElement.style.background != "green" && ["interactive", "complete"].includes(document.readyState)) {
			btn.parentElement.style.background = "green";
			btn.onclick = (ev) => {
				ev.preventDefault();
				new Promise((resolve) => {
					let sizesTable = ["o", "6k", "5k", "f", "4k", "3k", "k", "h", "b", "c", "z", "w", "n", "m", "t", "q", "s"],
						photoId = (new URL(document.URL)).pathname.match(/[^\\\/]+/g)[2],
						photoSizes = JSON.parse(document.querySelector(".modelExport").outerHTML.match(/(?<=modelExport:\s?)\{.*\}/g)).main["photo-models"][0].sizes,
						largest = `https:${photoSizes[sizesTable.find((curr) => (curr in photoSizes))].url}`;
					if (photoSizes && largest.includes(photoId)) {
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
			console.log("Injected.");
		}
	}, 1000);
}
appendHTML();
document.onreadystatechange = () => appendHTML();