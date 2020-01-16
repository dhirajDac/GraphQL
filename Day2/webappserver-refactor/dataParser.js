const url = require('url');

module.exports = function(req, res, next){
    const urlObj = url.parse(req.url);
    req['urlObj'] = urlObj;
    console.log(urlObj);
    next();
}