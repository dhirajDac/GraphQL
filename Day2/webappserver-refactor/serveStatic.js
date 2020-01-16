const path = require('path'),
    fs = require('fs');

const staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.json', '.xml'];

function isStatic(resourceName) {
    const resExtn = path.extname(resourceName);
    return staticResExtns.indexOf(resExtn) >= 0;
}

module.exports = function(req, res){
    const resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)) {
        const resourcePath = path.join(__dirname, resourceName);
        console.log(resourcePath);
        if (!fs.existsSync(resourcePath)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        //fs.createReadStream(resourcePath).pipe(res); - This is ready asynchronous
        const fileContent=fs.readFileSync(resourcePath,{encoding:'utf8'});
        res.write(fileContent);
        res.end();
    } 
}