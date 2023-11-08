"use strict";

function getDeathStarData() {
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    var deathStarData = LocalServiceRegistry.createService("http.starwars.deathstardata", {
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET");
            return args
        },
        parseResponse: function (svc, client) {
            return client.text
        },

        filterLogMessage: function (msg) {
            let message = msg.replace(/"cost_in_credits":"\d+"/, '"cost_in_credits":"$$$$$$$$$$$$$$$$$$$$$$$$$$$$"');
            return message;
        },
    })

    var response = deathStarData.call().object;

    return response;
}
module.exports = {
    getDeathStarData: getDeathStarData
}