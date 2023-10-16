var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {

    let viewData = res.json({ msg : 'asd asd' });

    res.setViewData(viewData);

    next();
});



module.exports = server.exports();

