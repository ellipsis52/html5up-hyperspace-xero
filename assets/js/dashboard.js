document.addEventListener("DOMContentLoaded", () => {
  fetch("https://netmanagement.online/api/xero/transactions")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#xero-table tbody");
      data.transactions.forEach(tx => {
        const row = `<tr>
          <td>${tx.date}</td>
          <td>${tx.description}</td>
          <td>${tx.amount} CHF</td>
        </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
      });
    })
    .catch(err => {
      console.error(err);
      document.querySelector("#xero-table tbody").innerHTML = "<tr><td colspan='3'>Erreur de chargement.</td></tr>";
    });
});

