const service = require('./service');
const PORT = process.env.PORT || 80;
const config = {
    logger: null,
		basicAuth: null
};

// Create an express app instance
var express_app = service.init(config);

const server = express_app.listen(PORT)

module.exports = server;
