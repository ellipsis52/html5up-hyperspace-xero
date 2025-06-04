import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    currency: "CHF",
    description: "",
  });

  const [transactions, setTransactions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/saferpay/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Erreur lors de la création du paiement.");
      }
    } catch (error) {
      console.error("Erreur API:", error);
    }
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Montant", "Devise", "Description"],
      ...transactions.map((t) => [t.amount, t.currency, t.description]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Historique des Transactions", 20, 10);
    doc.autoTable({
      head: [["Montant", "Devise", "Description"]],
      body: transactions.map((t) => [t.amount, t.currency, t.description]),
    });
    doc.save("transactions.pdf");
  };

  return (
    <div className="min-h-screen p-6 text-black bg-white dark:bg-black dark:text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Montant</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded dark:bg-black dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block">Devise</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded dark:bg-black dark:text-white"
          >
            <option value="CHF">CHF</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <label className="block">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded dark:bg-black dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 text-white bg-black rounded hover:bg-gray-800"
        >
          Payer
        </button>
      </form>

      <div className="mt-10">
        <h2 className="mb-2 text-xl font-bold">Transactions</h2>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 mr-2 text-white bg-black rounded hover:bg-gray-800"
        >
          Exporter CSV
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
        >
          Exporter PDF
        </button>
        <ul className="mt-4 space-y-2">
          {transactions.map((t, index) => (
            <li key={index} className="p-2 border border-gray-300 rounded">
              {t.amount} {t.currency} — {t.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentForm;
