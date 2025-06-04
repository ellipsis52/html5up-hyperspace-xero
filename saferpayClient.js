export async function createPayment(amount, currency, description) {
    const response = await fetch("http://localhost:3000/api/saferpay/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency, description }),
    });
  
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Erreur lors de la création du paiement");
    }
  
    const data = await response.json();
    return data.redirectUrl;
  }
  