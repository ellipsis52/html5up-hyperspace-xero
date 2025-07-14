function connectToXero() {
  window.location.href = "https://login.xero.com/identity/connect/authorize?client_id=TON_CLIENT_ID&response_type=code&redirect_uri=https://netmanagement.online/callback&scope=openid profile email accounting.transactions";
}

function auth0Login() {
  window.location.href = "https://TONDOMAINE.auth0.com/authorize?response_type=token&client_id=TON_CLIENT_ID&redirect_uri=https://netmanagement.online/dashboard";
}

function askGPT() {
  fetch("https://netmanagement.online/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: "Quel est l’état du compte aujourd’hui ?" })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("gpt-response").innerText = data.response || "Pas de réponse.";
  })
  .catch(err => {
    console.error(err);
    document.getElementById("gpt-response").innerText = "Erreur GPT.";
  });
}

