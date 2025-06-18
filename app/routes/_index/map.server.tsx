// app/routes/_index/map.server.ts
import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { query, City } from "~/utils/db.server"
import CanvasMap from "~/components/CanvasMap"

export const loader: LoaderFunction = async () => {
	console.log("🚀 Loader is running. Querying database...")
	const { rows: cities } = await query<City>(
		"SELECT * FROM cities ORDER BY x ASC, y DESC"
	)
	console.log("✅ Query completed. City Rows:", cities.length)
	const { rows: strongholds } = await query<City>(
		"SELECT * FROM strongholds ORDER BY x ASC, y DESC"
	)
	console.log("✅ Query completed. Stronghold Rows:", strongholds.length)
	return { strongholds, cities }
}

export default function MapPage() {
	const { strongholds, cities } = useLoaderData<typeof loader>()

	return (
		<div className="width-full">
			<h1>Map</h1>

			<CanvasMap
				cities={cities}
				strongholds={strongholds}
				onClickCell={(cell) => alert(JSON.stringify(cell, null, 2))}
			/>
		</div>
	)
}
