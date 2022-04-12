'use strict';
// Config
let ads = false, shared_post = false, store = false, contains_keywords = false, contains_name = false,
    array_keywords = [], array_name = [];

let link = {
        avatar: `https://graph.facebook.com/668664313334178/picture?type=large`,
        api: `https://gxcl.info/api.php`,
        page: `https://facebook.com/gaixinhchonloc`,
        photo: ""
    }
let width, height, div;

let classes = {
    cmt_name: "nc684nl6",
    cmt_text: "kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql",
    cmt_img: "j83agx80 bvz0fpym c1et5uql",
    div_cmt: "g3eujd1d ni8dbmo4 stjgntxs"
}
let href_name_page = `
    <a class="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl oo9gr5id gpro0wi8 lrazzd5p"
       href="${link.page}" role="link" tabindex="0">
        <strong>${chrome.i18n.getMessage('appName')}</strong>
    </a>
`;

chrome.storage.sync.get(["opts","keywords","name"], ({opts, keywords,name}) => { // Update Config
    if (opts.ads) ads = true;
    if (opts.shared_post) shared_post = true;
    if (opts.store) store = true;
    if (opts.contains_keywords) {
        contains_keywords = true;
        array_keywords = keywords;
    }
    if (opts.contains_name) {
        contains_name = true;
        array_name = name;
    }
});

function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
(function ($) {
    $.fn.regex = function (keywords, fn, fn_a) {
        var fn = fn || $.fn.text;
        let pattern = new RegExp(keywords, "g");
        return this.filter(function () {
            return pattern.test(removeAscent(fn.apply($(this), fn_a)));
        });
    };
})(jQuery);

(function (chrome) {
    jQuery(document).ready(function ($) {
        if (store) $('a[href*="marketplace"]').closest(`li`).hide(); // bỏ nút quảng cáo

        $(window).scroll(function () {
            let i;
            if (ads) {
                // bài quảng cáo
                div = $('[aria-label="Sponsored"]').closest(`div[data-pagelet^="FeedUnit"]`).first();
                if (div.length === 0) div = $('[aria-label="Được tài trợ"]').closest(`div[data-pagelet^="FeedUnit"]`).first();
                if (div.length !== 0) executeDiv(div, chrome.i18n.getMessage('ads'));
            }
            if (shared_post) {
                // bài chia sẻ
                div = $('[data-testid="Keycommand_wrapper_feed_attached_story"]').closest(`div[data-pagelet^="FeedUnit"]`).first();
                executeDiv(div, chrome.i18n.getMessage('shared_post'));
            }
            if (contains_name) {
                // trang hoặc nhóm chứa tên
                for (i = 0; i < array_name.length; i++) {
                    div = getDivGroup(array_name[i]);
                    if (div.length === 0) div = getDivPage(array_name[i]);
                    if (div.length === 0) div = getDivCommentByName(array_name[i]);
                }
            }
            if (contains_keywords) {
                // bài hoặc bình luận chứa từ khoá
                for (i = 0; i < array_keywords.length; i++) {
                    div = getDivPost(array_keywords[i]);
                    if (div.length === 0) getDivComment(array_keywords[i]);
                }
            }
        });
    });
})(chrome);

function getDivCommentByName(name) {
    div = $(`div[class="${classes.cmt_name}"]:not('.ex-replaced')`)
        .regex(name)
        .html(href_name_page)
        .addClass('ex-replaced') // thêm class là đã loại trừ
        .closest(`div[class='${classes.div_cmt}']`); // tìm đến div tổng

    div.find(`div[class='${classes.cmt_img}']`).remove(); // tìm đến div con có hình ảnh rồi loại bỏ nó
    div.find(`div[class='${classes.cmt_text}']`)
        .addClass('ex-replaced') // thêm class là đã loại trừ
        .html(`
           ${chrome.i18n.getMessage('pog')} ${chrome.i18n.getMessage('contains_name').toLowerCase()} ${chrome.i18n.getMessage('notification')}
           <a href="https://facebook.com/gaixinhchonloc">${chrome.i18n.getMessage('appName')}</a>
           .
        `);
}

function getDivComment(keyword) {
    $(`div[class="${classes.cmt_text}"]:not('.ex-replaced')`)
        .regex(keyword)
        .html(`
           ${chrome.i18n.getMessage('comment')} ${chrome.i18n.getMessage('contains_keywords').toLowerCase()} ${chrome.i18n.getMessage('notification')}
           <a href="https://facebook.com/gaixinhchonloc">${chrome.i18n.getMessage('appName')}</a>
           .
        `)
        .addClass('ex-replaced') // thêm class là đã loại trừ
        .closest(`div[class='${classes.div_cmt}']`) // tìm đến div tổng
        .find(`div[class='${classes.cmt_img}'`).remove(); // tìm đến div con có hình ảnh rồi loại bỏ nó
}

function getDivPost(keyword) {
    let class_post_text = ["ecm0bbzt hv4rvrfc ihqw7lf3 dati1w0a", "dati1w0a ihqw7lf3 hv4rvrfc ecm0bbzt"];
    for (let i = 0; i < class_post_text.length; i++) {
        div = $(`div[data-pagelet^="FeedUnit"]`).has(`div[class="${class_post_text[i]}"]`).regex(keyword).first();
        if (div.length !== 0) {
            executeDiv(div, chrome.i18n.getMessage('post'));
            break;
        }
    }
    return div;
}

function getDivGroup(name) {
    let class_div_name = ["jq4qci2q ekzkrbhg a3bd9o3v"];
    for (let i = 0; i < class_div_name.length; i++) {
        div = $(`div[data-pagelet^="FeedUnit"]`).has(`div[class="${class_div_name[i]}"]`).regex(name).first();
        if (div.length !== 0) {
            executeDiv(div, chrome.i18n.getMessage('group'));
            break;
        }
    }
    return div;
}

function getDivPage(name) {
    let class_div_name = ["jq4qci2q ekzkrbhg a3bd9o3v"];
    for (var i = 0; i < class_div_name.length; i++) {
        let div = $(`div[data-pagelet^="FeedUnit"]`).has(`strong`).regex(name).first();
        if (div.length !== 0) {
            executeDiv(div, chrome.i18n.getMessage('page'));
            break;
        }
    }
    return div;
}

function executeDiv(this_div, type) {
    // console.log(this_div);
    if (this_div.length !== 0) {
        this_div.removeAttr('data-pagelet'); // loại bỏ khỏi danh sách cũ
        let div_parent = this_div.find(`a[aria-hidden="true"]`).closest('div:not([class])').next(); // tìm div thông tin bài đăng

        changePagePicture(this_div); // chỉnh ảnh
        changePageName(this_div); // chỉnh tên Page

        // xoá hết thông tin bài đăng gốc
        div_parent.empty();
        div_parent.next().empty();
        appendText(div_parent, type);
        replaceWithImage(div_parent);
        chrome.runtime.sendMessage({updateBadge: ""});
    }
}

function changePagePicture(this_div) {
    this_div.find(`a[aria-hidden="true"]`).closest('div').html(`
        <a class="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl oo9gr5id gpro0wi8 lrazzd5p"
           href="${link.page}" role="link" tabindex="0">
            <img src="${link.avatar}" style="height: 40px; width: 40px; border-radius:50%">
        </a>
    `);
}

function changePageName(this_div) {
    let div = this_div.find('strong');
    if (div.length == 0) div = this_div.find(`div[class="jq4qci2q ekzkrbhg a3bd9o3v"]`);
    div.closest('div').html(href_name_page);
}

function appendText(this_div_parent, type) {
    this_div_parent.append(`
        <div class="ecm0bbzt hv4rvrfc ihqw7lf3 dati1w0a">
            <div class="j83agx80 cbu4d94t ew0dbk1b irj2b8pg">
                <div class="qzhwtbm6 knvmm38d">
                    <span dir="auto"
                          class="oi732d6d ik7dh3pa d2edcug0 qv66sw1b c1et5uql a8c37x1j muag1w35 enqfppq2 jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m">
                        <div dir="auto" style="text-align: start;">${type} ${chrome.i18n.getMessage('notification')} <a href="https://facebook.com/gaixinhchonloc">${chrome.i18n.getMessage('appName')}.</a></div>
                    </span>
                </div>
            </div>
        </div>
    `);
}

function replaceWithImage(this_div_parent) {
    let background = chrome.runtime.connect({name: "bg"});
    background.postMessage({url: link.api});
    background.onMessage.addListener((msg) => {
        link.photo = msg.response.link;
        width = msg.response.width;
        height = msg.response.height;
        this_div_parent.append(`
            <div class="l9j0dhe7">
                <div class="l9j0dhe7">
                <a href="${link.photo}" target="_blank" role="link" tabindex="0" class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 a8c37x1j mg4g778l btwxx1t3 pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb lzcic4wl abiwlrkh p8dawk7l tm8avpzi">
                    <div class="bp9cbjyn tqsryivl j83agx80 cbu4d94t ni8dbmo4 stjgntxs l9j0dhe7 k4urcfbm"
                         style="background-color: rgb(11, 6, 12);">
                        <div
                            style="max-width:100%;min-width:500px;width:calc((100vh + -325px) * 0.6666666666666666);height:625px">
                            <div class="do00u71z ni8dbmo4 stjgntxs l9j0dhe7" style="padding-top:150%">
                                 <img
                                    width="${width}"
                                    height="${height}"
                                    class="i09qtzwb n7fi1qx3 datstx6m pmk7jnqg j9ispegn kr520xx4 k4urcfbm bixrwtb6"
                                    src="${link.photo}">
                            </div>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
        `);
    });
};
