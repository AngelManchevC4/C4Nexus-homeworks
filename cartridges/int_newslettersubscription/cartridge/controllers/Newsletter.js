'use strict';

/**
 * @namespace Newsletter
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');


server.get('Show', server.middleware.https,csrfProtection.generateToken ,consentTracking.consent, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils');

    var newsletterForm = server.forms.getForm('newsletter');
    newsletterForm.clear();

    res.render('newsletter/newsletterForm', {
        newsletterForm: newsletterForm

    });

    next();
});

server.post(
    'Subscribe',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var Transaction = require('dw/system/Transaction');
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Resource = require('dw/web/Resource');
        var URLUtils = require('dw/web/URLUtils');
        // 1

        var type = "Newsletter-Homework";

        var CustomObjectMgr = require('dw/object/CustomObjectMgr');

        var newsletterForm = server.forms.getForm('newsletter');
        var form = newsletterForm;
        var newsletterResult = CustomObjectMgr.getCustomObject(type,newsletterForm.email.value);

        if (newsletterForm.valid) {
            Transaction.wrap(function () {
                var newsletterEntry = CustomObjectMgr.createCustomObject(type, newsletterForm.email.value);
                newsletterEntry.custom.firstName = newsletterForm.firstname.value;
                newsletterEntry.custom.lastName = newsletterForm.lastname.value;
                newsletterEntry.custom.gender = newsletterForm.gender.value;
            })
        }

        res.redirect('Newsletter-Show');

        return next();
    }
);

module.exports = server.exports();
