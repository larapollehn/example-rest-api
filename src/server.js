const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.PORT;

// start http server 
http.createServer(app).listen(port, () => logger.log('info' ,'Server is running on port ' + port));
