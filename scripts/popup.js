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

  console.log(opts);
  for (var inpName in opts) {
    let input = document.querySelector(`[name=${inpName}][type='checkbox']`);

    input.checked = opts[inpName];
    if (opts[inpName]) input.parentElement.classList.add("checked");
    if (opts[inpName] && inpName === "contains_keywords") $("#div_contains_keywords").show();
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

$(document).ready(function () {
  $('#pac').tagsinput('items');
  $('#pac').change(function () {
    if ($(this).val() != '') {
      $('#checkbox_contains_keywords').prop('checked', true).change();
      chrome.storage.local.set({
        keywords: $(this).val()
      });
    } else {
      $('#checkbox_contains_keywords').prop('checked', false).change();
    }
  });
  $('[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      $(this).parent('label').addClass('checked');
    } else {
      $(this).parent('label').removeClass('checked');
    }
  });
  $('#checkbox_contains_keywords').change(function () {
    if ($(this).is(':checked')) {
      $("#div_contains_keywords").show();
      $(".bootstrap-tagsinput").find('input').focus();
    } else {
      $("#div_contains_keywords").hide();
    }
  });
});