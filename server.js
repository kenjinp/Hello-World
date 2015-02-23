// requirements
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    fileServer = require('./fileServer'),
    qs = require('querystring');

module.exports = http.createServer(function (req, res) { ;
    var uri = url.parse(req.url).pathname,
        file = path.join(process.cwd(), uri);

    //route everything else to serve files
        fileServer(file, uri, req, res);
});
