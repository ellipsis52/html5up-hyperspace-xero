// webhook.js
const express = require('express');
const stripe = require('./stripe');
const endpointSecret = 'whsec_yourSecretKey'; // Ta clé secrète du webhook

const router = express.Router();

router.post('/webhook', express.raw({
    type: 'application/json'
}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook error:", err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gérer l'événement de paiement réussi
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        // Traitement des informations de session et de commission ici
        console.log("Payment was successful!", session);
    }

    res.status(200).send('Received Webhook');
});

module.exports = router;