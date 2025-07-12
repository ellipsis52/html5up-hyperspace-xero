require('dotenv').config();
const fetch = require("node-fetch");

module.exports = async (req, res) => {
    const {
        code
    } = req.query;

    if (!code) {
        return res.status(400).send("⛔ Code d'autorisation manquant.");
    }

    const {
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        TOKEN_ENDPOINT,
        XERO_DASHBOARD
    } = process.env;

    const tokenParams = {
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI
    };

    try {
        const tokenRes = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tokenParams)
        });

        const tokenData = await tokenRes.json();

        if (tokenData.access_token) {
            // 🎟 Ici, tu peux stocker le token dans une session, ou le crypter dans un cookie.
            console.log("✅ Jeton OAuth2 reçu :", tokenData.access_token);

            // 🔁 Redirection vers Xero
            res.writeHead(302, {
                Location: XERO_DASHBOARD
            });
            return res.end();
        } else {
            console.error("❌ Échec de l'obtention du jeton :", tokenData);
            return res.status(401).json({
                error: "Auth failed",
                details: tokenData
            });
        }
    } catch (err) {
        console.error("🔥 Erreur serveur :", err);
        return res.status(500).json({
            error: "Erreur interne du serveur"
        });
    }
};