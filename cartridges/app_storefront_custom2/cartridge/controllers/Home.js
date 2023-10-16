var server = require('server');
var HookMgr = require('dw/system/HookMgr')

server.extend(module.superModule);

server.append('Show', function (req, res, next) {

    var viewData = { msg : 'asd asd' };
    var result; 

    if (HookMgr.hasHook("app.home.extendViewData")) {
        result = HookMgr.callHook("app.home.extendViewData", "extendViewData",{viewData:viewData,value:"custom hook baby"});
    }
    res.json(result);
    next();
});



module.exports = server.exports();

