const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // ← Clé secrète Stripe
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Paiement Hyperspace',
        },
        unit_amount: 5000, // Montant en centimes : 50,00 €
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://netmanagement.online/success',
    cancel_url: 'https://netmanagement.online/cancel',
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Serveur Stripe prêt sur port 4242'));
