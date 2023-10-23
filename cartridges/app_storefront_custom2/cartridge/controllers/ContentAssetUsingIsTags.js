'use strict';

/**
 * @namespace ContentAssetUsingIsTags
 */

var server = require('server');

var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var { validate } = require('*/cartridge/scripts/customer/validateCustomer');

/**
 * ContentAssetUsingIsTags-Show : This end point will render a content asset in full storefront ContentAssetUsingIsTags
 * @name Base/ContentAssetUsingIsTags-Show
 * @function
 * @memberof ContentAssetUsingIsTags
 * @param {middleware} - cache.applyDefaultCache
 * @param {middleware} - consentTracking.consent
 * @param {querystringparameter} - cid - the id of the content asset to be displayed in a full ContentAssetUsingIsTags
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.get('Show', cache.applyDefaultCache, consentTracking.consent, function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var Logger = require('dw/system/Logger');
    var PageMgr = require('dw/experience/PageMgr');
    var ContentModel = require('*/cartridge/models/content');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    var page = PageMgr.getPage(req.querystring.cid);

    let customer = req.currentCustomer;

    if (page != null && page.isVisible()) {
        if (!page.hasVisibilityRules()) {
            res.cachePeriod = 168; // eslint-disable-line no-param-reassign
            res.cachePeriodUnit = 'hours'; // eslint-disable-line no-param-reassign
        }

        res.page(page.ID, {});
    } else {

        var apiContent = validate(
            customer.profile,
            () => {
                return ContentMgr.getContent(req.querystring.cid + "Logged");
            },
            () => {
                return ContentMgr.getContent(req.querystring.cid + "Guest");
            }
        );;

        if (apiContent) {
            var content = new ContentModel(apiContent, 'content/contentAssetUsingIsTags');

            pageMetaHelper.setPageMetaData(req.pageMetaData, content);
            pageMetaHelper.setPageMetaTags(req.pageMetaData, content);

            var stringifiedContent = validate(
                customer.profile,
                () => {
                    stringifiedContent = content.body.toString();
                    return stringifiedContent.replace('{0}', `{${customer.profile.firstName}}`);
                },
                () => {
                    return;
                }
            );;

            if (content.template) {
                res.render(content.template, { content: content, customer: customer, stringifiedContent: stringifiedContent });
            } else {
                Logger.warn('Content asset with ID {0} is offline', req.querystring.cid);
                res.render('/components/content/offlineContent');
            }
        } else {
            Logger.warn('Content asset with ID {0} was included but not found', req.querystring.cid);
        }
    }

    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();