import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import saferpayRouter from "./routes/saferpay.mjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/saferpay", saferpayRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API serveur démarré sur le port ${PORT}`);
});

