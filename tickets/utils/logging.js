const axios = require('axios');

exports.logError = async (req, statuscode, method, api, details, userId) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        const ipaddress = ip.split(':')[3]
        const log = { statuscode, method, api, details, userId, ipaddress };
        await axios.post('http://localhost:5007/logging/log', log);
    } catch (err) {
        console.error('Log failed', err.message);
    }
}

