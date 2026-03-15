import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {

	const rows = await sql`
		SELECT card_name, illustration_id, art_uri, alt_text
		FROM illustrations
		WHERE verified = true
		ORDER BY card_name
	`

	function escapeCSV(value) {
		if (value === null || value === undefined) return ""
		return `"${String(value).replace(/"/g, '""')}"`
	}

	let csv = "Card Name,Illustration ID,Art URI,Alt Text\n"

	rows.forEach(r => {
		csv += [
			escapeCSV(r.card_name),
			escapeCSV(r.illustration_id),
			escapeCSV(r.art_uri),
			escapeCSV(r.alt_text)
		].join(",") + "\n"
	})

	res.setHeader("Content-Type", "text/csv")
	res.setHeader("Content-Disposition", "attachment; filename=AltScry_Cards.csv")

	res.status(200).send(csv)
}