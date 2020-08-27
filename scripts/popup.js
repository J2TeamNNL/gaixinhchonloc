'use strict';

chrome.storage.local.get("opts", ({opts: opts}) => {
	console.log(opts);
	for (let inpName in opts) if (inpName) document.querySelector(`[name='${inpName}'][type='checkbox']`).checked = opts[inpName];
});

document.body.onchange = (a) => {
	let values = {};
	for (let checkbox of Array.from(document.querySelectorAll("input[type='checkbox']"))) values[checkbox.name] = checkbox.checked;
	chrome.storage.local.set({ opts: values });
};