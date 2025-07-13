// api/validate-auth0.js

export default function handler(req, res) {
    if (req.method === "POST") {
        // ⚠️ Ceci est un test — à sécuriser en production
        const {
            code
        } = req.body;

        if (code) {
            res.status(200).json({
                success: true
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Missing code."
            });
        }
    } else {
        res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }
}