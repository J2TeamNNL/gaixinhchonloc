'use strict';

chrome.storage.local.get("opts", function (_ref) {
  var opts = _ref.opts;
  console.log(opts);

  for (var inpName in opts) {
    if (inpName) document.querySelector("[name='".concat(inpName, "'][type='checkbox']")).checked = opts[inpName];
  }
});

document.body.onchange = function (a) {
  var values = {};

  for (var _i = 0, _Array$from = Array.from(document.querySelectorAll("input[type='checkbox']")); _i < _Array$from.length; _i++) {
    var checkbox = _Array$from[_i];
    values[checkbox.name] = checkbox.checked;
  }

  chrome.storage.local.set({
    opts: values
  });
};