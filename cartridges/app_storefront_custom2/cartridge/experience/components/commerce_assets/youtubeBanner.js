'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');


module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.videoID = content.id;
    model.title = content.alt;
    model.bannerSize = content.size;
    
    return new Template('experience/components/commerce_assets/youtubeBanner').render(model).text;
};
