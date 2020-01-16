const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator'),
    port = 8080;

const staticResExtns = [ '.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.json', '.xml'];

function isStatic(resourceName){
    const resExtn = path.extname(resourceName);
    return staticResExtns.indexOf(resExtn) >= 0;
}

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url),
        resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
    if (isStatic(resourceName)){
        const resourcePath = path.join(__dirname, resourceName);
        console.log(req.method + '\t' + urlObj.pathname);
        if (!fs.existsSync(resourcePath)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resourcePath).pipe(res);
    } else if (urlObj.pathname === '/calculator'){
        if (req.method === 'GET') {
           
            const result = serveCalc.handleCalculator(urlObj.query);

            res.write(result.toString());
            res.end();
        } else {
            let rawData = '';
            req.on('data', chunk => rawData += chunk);
            req.on('end', () => {                               
                const result = serveCalc.handleCalculator(rawData);
                res.write(result.toString());
                res.end();
            })
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(port);
server.on('listening', () => console.log(`Server listening on ${port}..!!`))