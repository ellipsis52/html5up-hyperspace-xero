import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// stripe/index.js
import express from 'express';
import { handleStripeWebhook } from './webhookHandler.js';

const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  try {
    const { event, message } = await handleStripeWebhook(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    if (message) {
      // Ici tu pourrais enregistrer ce message, l’envoyer par email, ou le loguer avec art
      console.log('Message poétique généré:', message);
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
