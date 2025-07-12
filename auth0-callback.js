// backend/routes/auth0-callback.js
const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const router = express.Router();

const AUTH0_DOMAIN = 'mylogin.netmanagement.online';
const CLIENT_ID = 'qnLTr3RJKM9gHOFbhbUKmtkinOwKEfc4';
const CLIENT_SECRET = 'TA_SECRET_ICI'; // 🔒 À ne jamais exposer côté client
const REDIRECT_URI = 'https://netmanagement.online/callback';

router.get('/callback', async (req, res) => {
    const {
        code
    } = req.query;

    if (!code) {
        return res.status(400).send('Missing authorization code.');
    }

    try {
        const tokenResponse = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, qs.stringify({
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const {
            access_token,
            id_token
        } = tokenResponse.data;

        // 🔐 Ici, tu peux stocker le token en session, cookie, ou rediriger avec un JWT
        res.redirect(`https://dashboard.stripe.com?token=${access_token}`);
    } catch (error) {
        console.error('Auth0 callback error:', error.response?.data || error.message);
        res.status(500).send('Erreur lors de la récupération du token.');
    }
});

module.exports = router;