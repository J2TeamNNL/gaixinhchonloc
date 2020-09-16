'use strict';
let array = {};
$('#poc').tagsinput('items');
$('#pog').tagsinput('items');

for (var _i = 0, _Array$from = Array.from(document.querySelectorAll(".msg")); _i < _Array$from.length; _i++) {
    var html = _Array$from[_i];
    var msg = html.innerHTML.replace(/__MSG_(.*)__/g, function (match, msg) {
        return chrome.i18n.getMessage(msg);
    });
    html.innerHTML = msg;
}

chrome.storage.local.get(["keywords", "name", "opts"], function ({opts, keywords,name}) {
    array = opts;
    $.each(opts,function(key, val){
        if(val){
            let input = $(`input[name="${key}"]`);
            input.prop('checked',val).parent().addClass('checked');

            if (key === "contains_keywords") {
                showAndFillKeywords(keywords);
            }
            if (key === "contains_name") {
                showAndFillName(name);
            }
        }
    });
});
function showAndFillKeywords(keywords){
    $("#div_contains_keywords").show();
    for (var i = 0; i < keywords.length; i++) {
        $('#poc').tagsinput('add', keywords[i]);
    }
}
function showAndFillName(name){
    $("#div_contains_name").show();
    for (var i = 0; i < name.length; i++) {
        $('#pog').tagsinput('add', name[i]);
    }
}

$("input[type='checkbox']").change(function() {
    if (this.checked) {
        $(this).parent('label').addClass('checked');
    } else {
        $(this).parent('label').removeClass('checked');
    }

    array[this.name] = this.checked;

    chrome.storage.local.set({
        opts: array
    });
});

$('#poc').change(function () {
    chrome.storage.local.set({
        keywords: $(this).val().split(',')
    });
    if ($(this).val() != '') {
        $('#checkbox_contains_keywords').prop('checked', true).change();
    } else {
        $('#checkbox_contains_keywords').prop('checked', false).change();
    }
});
$('#pog').change(function () {
    chrome.storage.local.set({
        name: $(this).val().split(',')
    });
    if ($(this).val() != '') {
        $('#checkbox_contains_name').prop('checked', true).change();
    } else {
        $('#checkbox_contains_name').prop('checked', false).change();
    }
});

$('#checkbox_contains_keywords').change(function () {
    if (this.checked) {
        chrome.storage.local.get(["keywords"], function ({keywords}) {
            showAndFillKeywords(keywords);
        });
        $("#poc").focus();
    } else {
        $("#div_contains_keywords").hide();
    }
});
$('#checkbox_contains_name').change(function () {
    if (this.checked) {
        chrome.storage.local.get(["name"], function ({name}) {
            showAndFillName(name);
        });
        $("#pog").focus();
    } else {
        $("#div_contains_name").hide();
    }
});
