import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VanillaApp() {
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [xeroContactId, setXeroContactId] = useState("");
  const [xeroDescription, setXeroDescription] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [loading, setLoading] = useState({
    xeroPaymentOut: false,
    cryptoPayment: false,
    gptQuery: false, // Loading state for GPT-4 query
  });
  const [xeroPaymentOutResponse, setXeroPaymentOutResponse] = useState(null);
  const [cryptoPayments, setCryptoPayments] = useState([]);
  const [gptResponse, setGptResponse] = useState(null); // Store GPT-4 response
  const [question, setQuestion] = useState(""); // Store user input question
  const [errors, setErrors] = useState({
    xeroPaymentOut: null,
    cryptoPayment: null,
    gptQuery: null, // Error handling for GPT query
  });

  // Handle GPT-4 query
  const handleGptQuery = async () => {
    setLoading((prev) => ({ ...prev, gptQuery: true }));
    setErrors((prev) => ({ ...prev, gptQuery: null }));
    try {
      const response = await fetch("/api/gpt/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) throw new Error("Échec de la requête GPT-4.");
      const data = await response.json();
      setGptResponse(data.answer); // Store the GPT-4 answer
    } catch (error) {
      setErrors((prev) => ({ ...prev, gptQuery: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, gptQuery: false }));
    }
  };

  // Handle Xero Payment Out
  const handleXeroPaymentOut = async () => {
    setLoading((prev) => ({ ...prev, xeroPaymentOut: true }));
    setErrors((prev) => ({ ...prev, xeroPaymentOut: null }));
    try {
      const response = await fetch("/api/xero/payment-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iban,
          amount,
          contactId: xeroContactId,
          description: xeroDescription,
        }),
      });
      if (!response.ok) throw new Error("Échec du paiement Xero.");
      const data = await response.json();
      setXeroPaymentOutResponse(data);
    } catch (error) {
      setErrors((prev) => ({ ...prev, xeroPaymentOut: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, xeroPaymentOut: false }));
    }
  };

  // Handle Crypto Payment to OKX
  const handleCryptoPayment = async () => {
    setLoading((prev) => ({ ...prev, cryptoPayment: true }));
    setErrors((prev) => ({ ...prev, cryptoPayment: null }));
    try {
      const response = await fetch("/api/okx/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iban,
          amount,
          currency: selectedCurrency,
        }),
      });
      if (!response.ok) throw new Error("Échec du paiement OKX.");
      const data = await response.json();
      setCryptoPayments((prev) => [...prev, data]);
    } catch (error) {
      setErrors((prev) => ({ ...prev, cryptoPayment: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, cryptoPayment: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-3">
      {/* Section Paiement Xero */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Paiement sortant (Xero)</h2>
          <Label htmlFor="xeroContactId">ID Contact Xero</Label>
          <Input
            id="xeroContactId"
            value={xeroContactId}
            onChange={(e) => setXeroContactId(e.target.value)}
            placeholder="12345678-aaaa-bbbb-cccc-ddddeeeeffff"
          />
          <Label htmlFor="iban">IBAN</Label>
          <Input
            id="iban"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            placeholder="Votre IBAN"
          />
          <Label htmlFor="amount">Montant</Label>
          <Input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100.00"
          />
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={xeroDescription}
            onChange={(e) => setXeroDescription(e.target.value)}
            placeholder="Paiement fournisseur"
          />
          <Button
            onClick={handleXeroPaymentOut}
            disabled={loading.xeroPaymentOut}
          >
            {loading.xeroPaymentOut ? "Paiement..." : "Effectuer le paiement Xero"}
          </Button>
          {errors.xeroPaymentOut && (
            <p className="text-sm text-red-500">{errors.xeroPaymentOut}</p>
          )}
        </CardContent>
      </Card>

      {/* Section Paiement vers OKX (Cryptomonnaies) */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Paiement vers OKX (Cryptomonnaies)</h2>
          <Label htmlFor="cryptoCurrency">Cryptomonnaie</Label>
          <select
            id="cryptoCurrency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="input"
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">Tether (USDT)</option>
          </select>
          <Label htmlFor="amount">Montant</Label>
          <Input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100.00"
          />
          <Label htmlFor="iban">IBAN</Label>
          <Input
            id="iban"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            placeholder="Votre IBAN"
          />
          <Button
            onClick={handleCryptoPayment}
            disabled={loading.cryptoPayment}
          >
            {loading.cryptoPayment ? "En cours..." : "Envoyer le paiement"}
          </Button>
          {errors.cryptoPayment && (
            <p className="text-sm text-red-500">{errors.cryptoPayment}</p>
          )}
        </CardContent>
      </Card>

      {/* Section GPT-4 Interaction */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Interagir avec GPT-4</h2>
          <Label htmlFor="question">Posez une question à GPT-4</Label>
          <Input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Votre question ici"
          />
          <Button
            onClick={handleGptQuery}
            disabled={loading.gptQuery}
          >
            {loading.gptQuery ? "Chargement..." : "Poser la question"}
          </Button>
          {errors.gptQuery && (
            <p className="text-sm text-red-500">{errors.gptQuery}</p>
          )}
          {gptResponse && (
            <div className="p-4 mt-4 bg-gray-100 border rounded">
              <h3 className="font-bold">Réponse de GPT-4 :</h3>
              <p>{gptResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tableau des Paiements */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="text-xl font-bold">Historique des paiements</h3>
          <table className="min-w-full border border-collapse table-auto">
            <thead>
              <tr>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Cryptomonnaie / Xero</th>
                <th className="p-2 border">Montant</th>
                <th className="p-2 border">Statut</th>
              </tr>
            </thead>
            <tbody>
              {/* Paiement Xero */}
              {xeroPaymentOutResponse && (
                <tr>
                  <td className="p-2 border">Xero</td>
                  <td className="p-2 border">Paiement Xero</td>
                  <td className="p-2 border">{xeroPaymentOutResponse.amount}</td>
                  <td className="p-2 border">{xeroPaymentOutResponse.status}</td>
                </tr>
              )}
              {/* Paiements OKX (Cryptomonnaies) */}
              {cryptoPayments.map((payment, index) => (
                <tr key={index}>
                  <td className="p-2 border">OKX</td>
                  <td className="p-2 border">{payment.currency}</td>
                  <td className="p-2 border">{payment.amount}</td>
                  <td className="p-2 border">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
