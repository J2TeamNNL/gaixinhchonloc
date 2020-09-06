'use strict';

var link_avatar = "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-1/cp0/c0.0.80.80a/p80x80/91871764_1323740761159860_7711545584477274112_o.jpg?_nc_cat=111&_nc_sid=1eb0c7&_nc_ohc=AQvmZY8hqIYAX_vhFf9&_nc_ht=scontent.fhan2-2.fna&oh=4c5a556c869fefc8b00bb1ccdad3a674&oe=5F65FFD6";
var link_api = "https://gxcl.info/api.php";
var link_page = "https://facebook.com/gaixinhchonloc";
var link_photo, width, height, div;
var ads = false,
    shared_post = false,
    store = false,
    contains_keywords = false,
    keywords = [];
chrome.storage.local.get("opts", function (_ref) {
  var opts = _ref.opts;

  if (opts.ads) {
    ads = true;
  }

  if (opts.shared_post) {
    shared_post = true;
  }

  if (opts.store) {
    store = true;
  }

  if (opts.contains_keywords) {
    contains_keywords = true;
    chrome.storage.local.get("keywords", function (result) {
      keywords = result.keywords.split(',');
    });
  }
});

(function (chrome) {
  jQuery(document).ready(function ($) {
    if (store) {
      hideStoreButton();
    }

    $(window).scroll(function () {
      if (ads) {
        // bài quảng cáo
        div = $('[aria-label="Sponsored"]').closest("div[data-pagelet^=\"FeedUnit\"]").first();

        if (div.length == 0) {
          div = $('[aria-label="Được tài trợ"]').closest("div[data-pagelet^=\"FeedUnit\"]").first();
        }

        executeDiv(div, chrome.i18n.getMessage('ads'));
      }

      if (shared_post) {
        // bài chia sẻ
        div = $('[data-testid="Keycommand_wrapper_feed_attached_story"]').closest("div[data-pagelet^=\"FeedUnit\"]").first();
        executeDiv(div, chrome.i18n.getMessage('shared_post'));
      }

      if (contains_keywords) {
        // bài hoặc bình luận chứa từ khoá
        for (var i = 0; i < keywords.length; i++) {
          div = $("span[class^=\"oi732d6d ik7dh3pa d2edcug0 hpfvmrgz qv66sw1b c1et5uql a8c37x1j muag1w35 enqfppq2 jq4qci2q a3bd9o3v knj5qynh oo9gr5id\"]:contains(".concat(keywords[i], ")")).closest("div[data-pagelet^=\"FeedUnit\"]").first();

          if (div.length != 0) {
            executeDiv(div, chrome.i18n.getMessage('post'));
          } else {
            $("div[class=\"kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql\"]:contains(".concat(keywords[i], "):not('.ex-replaced')")).html("\n                            ".concat(chrome.i18n.getMessage('comment'), " ").concat(chrome.i18n.getMessage('notification'), " <a href=\"https://facebook.com/gaixinhchonloc\">").concat(chrome.i18n.getMessage('appName'), ".</a>\n                        ")).addClass('ex-replaced');
          }
        }
      }
    });
  });
})(chrome);

function executeDiv(this_div, type) {
  if (this_div.length !== 0) {
    // loại bỏ khỏi danh sách cũ
    this_div.removeAttr('data-pagelet'); // tìm div thông tin bài đăng

    var div_parent = this_div.find("a[aria-hidden=\"true\"]").closest('div:not([class])').next(); // chỉnh ảnh

    changePagePicture(this_div); // chỉnh tên Page

    changePageName(this_div); // xoá hết thông tin bài đăng gốc

    div_parent.empty();
    div_parent.next().empty();
    appendText(div_parent, type);
    replaceWithImage(div_parent);
    chrome.runtime.sendMessage({
      updateBadge: ""
    });
  }
}

function hideStoreButton() {
  // bỏ nút quảng cáo
  $('[aria-label="Marketplace"]').closest("li").hide();
}

function changePagePicture(this_div) {
  this_div.find("a[aria-hidden=\"true\"]").closest('div').html("\n        <a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl oo9gr5id gpro0wi8 lrazzd5p\"\n           href=\"".concat(link_page, "\" role=\"link\" tabindex=\"0\">\n            <img src=\"").concat(link_avatar, "\" style=\"height: 40px; width: 40px; border-radius:50%\">\n        </a>\n    "));
}

function changePageName(this_div) {
  this_div.find('strong').closest('div').html("\n        <a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl oo9gr5id gpro0wi8 lrazzd5p\"\n           href=\"".concat(link_page, "\" role=\"link\" tabindex=\"0\">\n            <strong>").concat(chrome.i18n.getMessage('appName'), "</strong>\n        </a>\n    "));
}

function appendText(this_div_parent, type) {
  this_div_parent.append("\n        <div class=\"ecm0bbzt hv4rvrfc ihqw7lf3 dati1w0a\">\n            <div class=\"j83agx80 cbu4d94t ew0dbk1b irj2b8pg\">\n                <div class=\"qzhwtbm6 knvmm38d\">\n                    <span dir=\"auto\"\n                          class=\"oi732d6d ik7dh3pa d2edcug0 qv66sw1b c1et5uql a8c37x1j muag1w35 enqfppq2 jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m\">\n                        <div dir=\"auto\" style=\"text-align: start;\">".concat(type, " ").concat(chrome.i18n.getMessage('notification'), " <a href=\"https://facebook.com/gaixinhchonloc\">").concat(chrome.i18n.getMessage('appName'), ".</a></div>\n                    </span>\n                </div>\n            </div>\n        </div>\n    "));
}

function replaceWithImage(this_div_parent) {
  var background = chrome.runtime.connect({
    name: "bg"
  });
  background.postMessage({
    url: link_api
  });
  background.onMessage.addListener(function (msg) {
    link_photo = msg.response.link;
    width = msg.response.width;
    height = msg.response.height;
    this_div_parent.append("\n            <div class=\"l9j0dhe7\">\n                <div class=\"l9j0dhe7\">\n                <a href=\"".concat(link_photo, "\" target=\"_blank\" role=\"link\" tabindex=\"0\" class=\"oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 a8c37x1j mg4g778l btwxx1t3 pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb lzcic4wl abiwlrkh p8dawk7l tm8avpzi\">\n                    <div class=\"bp9cbjyn tqsryivl j83agx80 cbu4d94t ni8dbmo4 stjgntxs l9j0dhe7 k4urcfbm\"\n                         style=\"background-color: rgb(11, 6, 12);\">\n                        <div\n                            style=\"max-width:100%;min-width:500px;width:calc((100vh + -325px) * 0.6666666666666666);height:625px\">\n                            <div class=\"do00u71z ni8dbmo4 stjgntxs l9j0dhe7\" style=\"padding-top:150%\">\n                                 <img\n                                    width=\"").concat(width, "\"\n                                    height=\"").concat(height, "\"\n                                    class=\"i09qtzwb n7fi1qx3 datstx6m pmk7jnqg j9ispegn kr520xx4 k4urcfbm bixrwtb6\"\n                                    src=\"").concat(link_photo, "\">\n                            </div>\n                        </div>\n                    </div>\n                    </a>\n                </div>\n            </div>\n        "));
  });
}