const axios = require('axios');
const { LOGGING_BASE_URL } = require('../services/BaseURLs');

exports.logError = async (req, statuscode, method, api, details) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        const ipaddress = ip.split(':')[3];
        let token;
        if (req.headers.cookie) {
            token = req.headers.cookie.split("=")[1];
        }
        const log = { statuscode, method, api, details, token, ipaddress };
        await axios.post(`${LOGGING_BASE_URL}log`, log, {
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.cookie,
            },
            credentials: "include",
        });

    } catch (err) {
        console.error('Log failed', err);
    }
}
