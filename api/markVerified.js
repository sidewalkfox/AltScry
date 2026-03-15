import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type")

	if (req.method === "OPTIONS") {
		return res.status(200).end()
	}

	const { illustrationID } = req.body;

	await sql`
		UPDATE illustrations
		SET verified = true
		WHERE illustration_id = ${illustrationID}
		AND alt_text IS NOT NULL
		and alt_text != ''
	`

	res.status(200).json({ success: true });
}