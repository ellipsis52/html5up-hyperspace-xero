export default function handler(req, res) {
    res.status(200).end('Hello Cron!');
}
export default function handler(req, res) {
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).end("Unauthorized");
    }

    // Ici tu peux lancer des actions : synchroniser Xero, envoyer des alertes, etc.
    res.status(200).end("🕰️ Cron job executed with grace.");
}