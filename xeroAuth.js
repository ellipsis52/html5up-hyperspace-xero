// xeroAuth.js
const express = require('express');
const passport = require('passport');
const {
    Strategy
} = require('passport-google-oauth20');
const axios = require('axios');

const router = express.Router();

// Configuration de Passport pour Xero OAuth
passport.use(new Strategy({
    clientID: process.env.XERO_CLIENT_ID,
    clientSecret: process.env.XERO_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/xero/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Stocke l'access token pour les appels API ultérieurs
    done(null, {
        accessToken
    });
}));

// Route de login
router.get('/login', passport.authenticate('google', {
    scope: ['profile']
}));

// Route de callback après authentication Xero
router.get('/callback', passport.authenticate('google', {
        failureRedirect: '/'
    }),
    async (req, res) => {
        // Une fois authentifié, récupérer l'access token et rediriger l'utilisateur
        const accessToken = req.user.accessToken;

        // Faire un appel à l'API Xero avec l'access token pour récupérer les endpoints
        const xeroData = await axios.get('https://api.xero.com/api.xro/2.0/AccountingEndpoints', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // Retourner la réponse ou rediriger vers la page principale
        res.redirect('/dashboard');
    }
);

module.exports = router;