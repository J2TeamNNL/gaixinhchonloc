'use strict';

for (var _i = 0, _Array$from = Array.from(document.querySelectorAll(".msg")); _i < _Array$from.length; _i++) {
  var html = _Array$from[_i];
  var msg = html.innerHTML.replace(/__MSG_(.*)__/g, function (match, msg) {
    return chrome.i18n.getMessage(msg);
  });
  html.innerHTML = msg;
}

chrome.storage.local.get("opts", function (_ref) {
  var opts = _ref.opts;

  for (var inpName in opts) {
    if (inpName) document.querySelector("[name='".concat(inpName, "'][type='checkbox']")).checked = opts[inpName];
  }
});

document.body.onchange = function (a) {
  var values = {};

  for (var _i2 = 0, _Array$from2 = Array.from(document.querySelectorAll("input[type='checkbox']")); _i2 < _Array$from2.length; _i2++) {
    var checkbox = _Array$from2[_i2];
    values[checkbox.name] = checkbox.checked;
  }

  chrome.storage.local.set({
    opts: values
  });
};