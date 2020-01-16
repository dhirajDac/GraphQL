const http = require('http'),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    notFoundHandler = require('./notFoundHandler'),
    app = require('./app'),
    port = 8085;

app.use(dataParser);
app.use(serveStatic);
app.use(serveCalculator);
app.use(notFoundHandler);

const server = http.createServer(app);

server.listen(port);
server.on('listening', () => console.log(`Server listening on ${port}..!!`))