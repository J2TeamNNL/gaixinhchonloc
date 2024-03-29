'use strict';
let array = {};
$('#poc').tagsinput('items');
$('#pog').tagsinput('items');

// Replacing i18n contents
for (let html of Array.from(document.querySelectorAll(".msg"))) {
    let msg = html.innerHTML.replace(/__MSG_(.*)__/g, function (match, msg) {
        return chrome.i18n.getMessage(msg);
    });
    html.innerHTML = msg;
}
// Apply stored settings
chrome.storage.sync.get(["keywords", "name", "opts"], function ({opts, keywords,name}) {
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
    for (let i = 0; i < keywords.length; i++) {
        $('#poc').tagsinput('add', keywords[i]);
    }
}
function showAndFillName(name){
    $("#div_contains_name").show();
    for (let i = 0; i < name.length; i++) {
        $('#pog').tagsinput('add', name[i]);
    }
}
// Listen on certain changes
$("input[type='checkbox']").change(function() {
    if (this.checked) {
        $(this).parent('label').addClass('checked');
    } else {
        $(this).parent('label').removeClass('checked');
    }

    array[this.name] = this.checked;

    chrome.storage.sync.set({
        opts: array
    });
});
$('#poc').change(function () {
    chrome.storage.sync.set({
        keywords: $(this).val().split(',')
    });
    if ($(this).val() != '') {
        $('#checkbox_contains_keywords').prop('checked', true).change();
    } else {
        $('#checkbox_contains_keywords').prop('checked', false).change();
    }
});
$('#pog').change(function () {
    chrome.storage.sync.set({
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
        chrome.storage.sync.get(["keywords"], function ({keywords}) {
            showAndFillKeywords(keywords);
        });
        $("#poc").focus();
    } else {
        $("#div_contains_keywords").hide();
    }
});
$('#checkbox_contains_name').change(function () {
    if (this.checked) {
        chrome.storage.sync.get(["name"], function ({name}) {
            showAndFillName(name);
        });
        $("#pog").focus();
    } else {
        $("#div_contains_name").hide();
    }
});
