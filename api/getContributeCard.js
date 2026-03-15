import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {

	res.setHeader("Access-Control-Allow-Origin", "*")

	const rows = await sql`
		SELECT card_name, illustration_id, art_uri
		FROM illustrations
		WHERE verified = false
		AND (alt_text IS NULL OR alt_text = '')
		ORDER BY random()
		LIMIT 1
	`

	res.status(200).json(rows.length ? rows[0] : null)
}