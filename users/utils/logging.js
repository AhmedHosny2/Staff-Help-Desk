const axios = require('axios');

exports.logError = async (req, statuscode, method, api, details) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        const ipaddress = ip.split(':')[3]
        const token = req.cookies.authcookie;
        const log = { statuscode, method, api, details, token, ipaddress };
        console.log(log);
        await axios.post('http://localhost:5007/logging/log', log);
    } catch (err) {
        console.error('Log failed', err);
    }
}

