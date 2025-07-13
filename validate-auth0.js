// api/validate-auth0.js

export default function handler(req, res) {
    if (req.method === "POST") {
        // ⚠️ Ceci est un test — à sécuriser en production
        const {
            code
        } = req.body;

        if (code) {
            res.status(200).json({
                success: true
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Missing code."
            });
        }
    } else {
        res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }
} <
script src = "https://cdn.auth0.com/js/auth0/9.19/auth0.min.js" > < /script> <
script >
    const webAuth = new auth0.WebAuth({
        domain: 'mylogin.netmanagement.online',
        clientID: 'qnLTr3RJKM9gHOFbhbUKmtkinOwKEfc4',
        redirectUri: 'https://netmanagement.online/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    webAuth.login({
        realm: 'Username-Password-Authentication', // nom de ta base de données Auth0 (change si besoin)
        username: username,
        password: password
    }, function (err) {
        if (err) {
            alert('Erreur de connexion : ' + err.description);
        }
    });
});

// Gestion du callback Auth0 après connexion réussie
webAuth.parseHash(function (err, authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
        // Stocke tokens et redirige vers dashboard
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        window.location.href = 'https://netmanagement.online/dashboard/stripe-xero';
    } else if (err) {
        console.error(err);
        alert('Erreur lors de l’authentification.');
    }
}); <
/script>/ / server.js
import express from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser JSON
app.use(express.json());

// Configuration de la validation JWT via JWKS (clé publique d’Auth0)
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true, // mise en cache des clés publiques
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://mylogin.netmanagement.online/.well-known/jwks.json' // Remplace par ton domaine Auth0
    }),
    audience: 'https://netmanagement.online/api', // Remplace par l’audience configurée dans Auth0
    issuer: 'https://mylogin.netmanagement.online/', // Ton domaine Auth0 avec slash final
    algorithms: ['RS256']
});

// Route protégée qui valide le token
app.post('/api/validate-auth0', checkJwt, (req, res) => {
    // Si on arrive ici, le token est validé par le middleware
    res.json({
        success: true,
        message: 'Token validé avec éclat !'
    });
});

// Route test simple
app.get('/', (req, res) => {
    res.send('Bienvenue dans le backend étoilé de Netmanagement.online');
});

app.listen(port, () => {
    console.log(`Backend cosmique lancé sur le port ${port}`);
});