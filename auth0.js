// auth0.js (à mettre dans ton backend Node.js)
const axios = require('axios');
const qs = require('querystring');

async function getTokenFromCode(code) {
    const data = {
        grant_type: 'authorization_code',
        client_id: 'qnLTr3RJKM9gHOFbhbUKmtkinOwKEfc4',
        client_secret: 'hzHG8TYaNBsPdcoQnYQiwCLVQtMYRjGVeEAMbJp3tC0BNFE-MBz8qiL5LMTTWdJk',
        code,
        redirect_uri: 'https://netmanagement.online/callback'
    };

    const response = await axios.post('https://mylogin.netmanagement.online/oauth/token', qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response.data;
}

module.exports = {
    getTokenFromCode
};