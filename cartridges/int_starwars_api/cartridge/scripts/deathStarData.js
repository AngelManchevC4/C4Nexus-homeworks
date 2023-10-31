var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

function getDeathStarData() {
    var deathStarData = LocalServiceRegistry.createService("http.starwars.deathstardata", {
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET")
            return args
        },
        parseResponse: function (svc, client) {
            return client.text
        },
        filterLogMessage(msg) {
            client
            return msg.replace(/cost_in_credits\: \".*?\"/, "cost_in_credits:$$$$$$$$$$$$$$$$$$$");
        }
    })

    var response = deathStarData.call().object;

    return response;
}
module.exports = {
    getDeathStarData: getDeathStarData
}
