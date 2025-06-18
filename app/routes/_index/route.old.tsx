import Map from "~/routes/_index/map.server"
import { useLoaderData } from "@remix-run/react"

export { loader } from "./map.server"

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
