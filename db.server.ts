// app/utils/db.server.ts
import { Pool } from "pg"

// Create a connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false // required by Neon
	}
})

export default pool
export async function query(text: string, params?: any[]) {
	const client = await pool.connect()
	try {
		const res = await client.query(text, params)
		return res
	} catch (err) {
		console.error("Database query error:", err)
		throw err
	} finally {
		client.release()
	}
}
export async function closePool() {
	await pool.end()
	console.log("Database connection pool closed")
}
export async function initializeDatabase() {
	try {
		await pool.query("SELECT NOW()")
		console.log("Database connection established")
	} catch (err) {
		console.error("Database connection error:", err)
		throw err
	}
}
