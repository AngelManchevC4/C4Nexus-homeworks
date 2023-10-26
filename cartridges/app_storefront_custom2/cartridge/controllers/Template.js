"use strict";

/**
 * @namespace Template
 */

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");
var userLoggedIn = require("*/cartridge/scripts/middleware/userLoggedIn");

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Template-Show : This endpoint is called when a shopper navigates to the Template page
 * @name Base/Template-Show
 * @function
 * @memberof Template
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get(
    "Show",
    consentTracking.consent,
    cache.applyDefaultCache,
    function (req, res, next) {
        res.render("homework/test");
        next();
    },
    pageMetaData.computedPageMetaData
);

module.exports = server.exports();