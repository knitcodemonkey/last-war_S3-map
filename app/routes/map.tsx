// app/routes/map.tsx
import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { query } from "~/utils/db.server"

export const loader: LoaderFunction = async () => {
	const cities = await query("SELECT * FROM cities")
	const strongholds = await query("SELECT * FROM strongholds")
	return { cities, strongholds }
}

export default function Map() {
	const { cities, strongholds } = useLoaderData()

	return (
		<div className="p-4 grid grid-cols-13 grid-rows-13 gap-2">
			{strongholds.map((sh: any) => (
				<div key={sh.id} className="border p-2 text-sm">
					<div className="font-bold">
						{sh.level} {sh.city_type}
					</div>
					<div>
						{sh.percentage}% {sh.buff}
					</div>
					<div>{sh.owner}</div>
					<div>
						{sh.expiration
							? new Date(sh.expiration).toLocaleString()
							: "Expired"}
					</div>
				</div>
			))}
		</div>
	)
}
