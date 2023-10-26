'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');


module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.postID = content.id;
    model.title = content.alt;
    model.description = content.description;
    model.bannerSizeWidth = content.instagramBannerSizeWidthInput;
    model.bannerSizeHeight = content.instagramBannerSizeHeightInput


    return new Template('experience/components/commerce_assets/instagramBanner').render(model).text;
};
