import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {

	res.setHeader("Access-Control-Allow-Origin", "*")

	const rows = await sql`
		SELECT card_name, illustration_id, art_uri, alt_text
		FROM illustrations
		WHERE verified = false
		AND alt_text IS NOT NULL
		AND alt_text != ''
		ORDER BY random()
		LIMIT 1
	`

	res.status(200).json(rows.length ? rows[0] : null)
}