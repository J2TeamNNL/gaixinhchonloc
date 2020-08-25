'use strict';

(function (chrome) {
  var link_avatar = "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-1/cp0/c0.0.80.80a/p80x80/91871764_1323740761159860_7711545584477274112_o.jpg?_nc_cat=111&_nc_sid=1eb0c7&_nc_ohc=AQvmZY8hqIYAX_vhFf9&_nc_ht=scontent.fhan2-2.fna&oh=4c5a556c869fefc8b00bb1ccdad3a674&oe=5F65FFD6";
  var link_api = "https://gxcl.info/api.php";
  var link_page = "https://facebook.com/gaixinhchonloc";
  var link_photo, width, height, div_parent;
  jQuery(document).ready(function ($) {
    $('[aria-label="Marketplace"]').closest("li").remove();
    $(window).scroll(function () {
      var div = $('[aria-label="Sponsored"]').closest("div[data-pagelet^=\"FeedUnit_\"]").first();

      if (div.length == 0) {
        div = $('[aria-label="Được tài trợ"]').closest("div[data-pagelet^=\"FeedUnit_\"]").first();
      }

      var div_parent;

      if (div.length != 0) {
        div.removeAttr('data-pagelet'); // chỉnh ảnh

        div.find("a[aria-hidden=\"true\"]").empty();
        div.find("a[aria-hidden=\"true\"]").attr('href', link_page);
        div.find("a[aria-hidden=\"true\"]").append("<img src=\"".concat(link_avatar, "\" style=\"height: 40px; width: 40px; border-radius:50%\">")); //    chỉnh tên Page

        div.find('strong').text('Gái Xinh Chọn Lọc');
        div.find('strong').parent('a').attr('href', link_page); // thêm ảnh
        // div_parent = div.find(`div[dir='auto']`).parent('div').empty();

        div_parent = div.find("a[aria-hidden=\"true\"]").closest('div:not([class])').next();
        div_parent.empty();
        div_parent.next().empty();
        div_parent.append("\n                    <div class=\"ecm0bbzt hv4rvrfc ihqw7lf3 dati1w0a\">\n                        <div class=\"j83agx80 cbu4d94t ew0dbk1b irj2b8pg\">\n                            <div class=\"qzhwtbm6 knvmm38d\">\n                                <span dir=\"auto\"\n                                      class=\"oi732d6d ik7dh3pa d2edcug0 qv66sw1b c1et5uql a8c37x1j muag1w35 enqfppq2 jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m\">\n                                    <div class=\"kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql\">\n                                        <div dir=\"auto\" style=\"text-align: start;\">Qu\u1EA3ng c\xE1o n\xE0y \u0111\u01B0\u1EE3c \u1EA9n b\u1EDFi ti\u1EC7n \xEDch <a href=\"https://facebook.com/gaixinhchonloc\">G\xE1i Xinh Ch\u1ECDn L\u1ECDc.</a></div>\n                                    </div>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                ");
        var background = chrome.runtime.connect({
          name: "bg"
        });
        background.postMessage({
          url: link_api
        });
        background.onMessage.addListener(function (msg) {
          link_photo = msg.response.response.posts[0].photos[0].original_size.url;
          width = msg.response.response.posts[0].photos[0].original_size.width;
          height = msg.response.response.posts[0].photos[0].original_size.height;
          div_parent.append("\n                        <div class=\"l9j0dhe7\">\n                            <div class=\"l9j0dhe7\">\n                            <a href=\"".concat(link_photo, "\" target=\"_blank\" role=\"link\" tabindex=\"0\" class=\"oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 a8c37x1j mg4g778l btwxx1t3 pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb lzcic4wl abiwlrkh p8dawk7l tm8avpzi\">\n                                <div class=\"bp9cbjyn tqsryivl j83agx80 cbu4d94t ni8dbmo4 stjgntxs l9j0dhe7 k4urcfbm\"\n                                     style=\"background-color: rgb(11, 6, 12);\">\n                                    <div\n                                        style=\"max-width:100%;min-width:500px;width:calc((100vh + -325px) * 0.6666666666666666);height:625px\">\n                                        <div class=\"do00u71z ni8dbmo4 stjgntxs l9j0dhe7\" style=\"padding-top:150%\">\n                                             <img\n                                                width=\"").concat(width, "\"\n                                                height=\"").concat(height, "\"\n                                                class=\"i09qtzwb n7fi1qx3 datstx6m pmk7jnqg j9ispegn kr520xx4 k4urcfbm bixrwtb6\"\n                                                src=\"").concat(link_photo, "\">\n                                        </div>\n                                    </div>\n                                </div>\n                                </a>\n                            </div>\n                        </div>\n                    // "));
        });
      }
    });
  });
})(chrome);