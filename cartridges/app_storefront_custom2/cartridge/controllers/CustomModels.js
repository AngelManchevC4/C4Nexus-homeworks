'use strict';

/**
 * @namespace CustomModels
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');


/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * CustomModels-Show : This endpoint is called when a shopper navigates to the CustomModels page
 * @name Base/CustomModels-Show
 * @function
 * @memberof CustomModels
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {serverfunction} - get
 */

server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var addressModel = require('*/cartridge/models/address');

    var address = new addressModel({ workAddress: "C4Nexus, sofia, bulgaria" })

    res.json({ address });

    next();
});


module.exports = server.exports();