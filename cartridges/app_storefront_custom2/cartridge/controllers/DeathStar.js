'use strict';

/**
 * @namespace DeathStar
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var deathStarService = require('*/cartridge/scripts/services/deathStarData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * DeathStar-Show : This endpoint is called when a shopper navigates to the DeathStar page
 * @name Base/DeathStar-Show
 * @function
 * @memberof DeathStar
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 */

server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {

    var deathStarData = JSON.parse(deathStarService.getDeathStarData());

    res.render("services/DeathStar", { deathStarData: deathStarData })

    next();
});

module.exports = server.exports();
