'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var deathStarService = require('*/cartridge/scripts/deathStarData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {

    var deathStarData = JSON.parse(deathStarService.getDeathStarData());

    res.render("DeathStar", { deathStarData: deathStarData })

    next();
});

module.exports = server.exports();
