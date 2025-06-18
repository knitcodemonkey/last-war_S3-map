// app/utils/db.server.ts
import { Pool, QueryResult, QueryResultRow } from "pg"

// Create a connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false // required by Neon
	}
})

// Optional: Log successful connections
pool.on("connect", () => {
	console.log("Postgres connected")
})

// City type matching the data structure
export type City = {
	x: string
	y: string
	coords: string
	level: string
	city_type: string
	buff: string
	percentage: string
	owner: string
	expiration: string
}

// Generic query function
export async function query<T extends QueryResultRow = QueryResultRow>(
	text: string,
	params?: unknown[]
): Promise<QueryResult<T>> {
	console.log("🟡 Executing query:", text)
	try {
		const res = await pool.query<T>(text, params)
		return res
	} catch (err) {
		console.error("Database query error:", err)
		throw err
	}
}

export default pool

// export async function query(text: string, params?: any[]) {
//   const res = await pool.query(text, params);
//   return res.rows;
// }
