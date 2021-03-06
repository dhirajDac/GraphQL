const http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url),
        query = querystring.parse(urlObj.query),
        resourceName = urlObj.pathname;

    if (resourceName !== '/calculator'){
        res.statusCode = 404;
        res.end();
        return;
    }
    if (req.method === 'GET'){
        const op = query.op,
            x = parseInt(query.x),
            y = parseInt(query.y);
        console.log(op, x, y);
        const result = calculator[op](x,y);

        res.write(result.toString());
        res.end();
    } else {
        let rawData = '';
        req.on('data', chunk => rawData += chunk);
        req.on('end', () => {
            console.log(rawData);
            const body = querystring.parse(rawData);
            const op = body.op,
                x = parseInt(body.x),
                y = parseInt(body.y);
            console.log(op, x, y);
            const result = calculator[op](x, y);
            res.write(result.toString());
            res.end();
        })
    }
})
server.listen(8085);
server.on('listening', () => console.log('App Server listening on 8085'));