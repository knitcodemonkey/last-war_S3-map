import { useLoaderData } from "@remix-run/react"
import { useState } from "react"
export { loader } from "./map.server"

const getBuffColor = (percentage: number, buff: string) => {
	const buffColor =
		percentage <= 10 ? Math.ceil(percentage) * 100 : percentage * 10
	switch (buff) {
		case "Iron":
			switch (percentage.toString()) {
				case "1":
					return `bg-amber-100 text-black`
				case "2":
					return `bg-amber-200 text-black`
				case "3":
					return `bg-amber-300 text-black`
				case "4":
					return `bg-amber-400 text-black`
				case "5":
					return `bg-amber-500 text-black`
				case "6":
					return `bg-amber-600 text-black`
				case "7.5":
					return `bg-amber-700 text-white`
				case "15":
					return `bg-amber-800 text-white`
				case "25":
					return `bg-amber-900 text-white`
				default:
					return `bg-gray-100 text-black` // Default case for unexpected values
			}
		case "Coin":
			return `bg-yellow-${buffColor} text-black`
		case "Gathering":
			return `#94c37d` // Custom color for Gathering
		case "Healing":
			return `#cc0100` // Custom color for Healing
		case "Training":
			return `bg-gray-${buffColor}` // Assuming Training uses gray
		case "Construction":
			return `bg-yellow-${buffColor}` // Assuming Construction uses yellow
		case "Trade":
			return `bg-brown-${buffColor}` // Assuming Trade uses brown
		case "Research":
			return `bg-blue-${buffColor}` // Assuming Research uses blue
		default:
			return `bg-gray-100` // Default to gray for unknown buffs
	}
}

const getOwnerColor = (owner: string) => {
	const colors: Record<string, string> = {
		FKU: "bg-teal-800 text-white",
		KVN: "bg-purple-300 text-black",
		K7K: "bg-rose-300 text-black"
	}
	return colors[owner] || "bg-gray-100 text-black" // Default color for unknown owners
}

export default function Map() {
	const { strongholds } = useLoaderData<typeof loader>()
	const [viewMode, setViewMode] = useState("Show Buffs")

	return (
		<div className="p-4">
			<div className="mb-4 flex">
				<label htmlFor="viewMode" className="mr-2 font-semibold">
					View Mode:
				</label>
				<select
					id="viewMode"
					value={viewMode}
					onChange={(e) => setViewMode(e.target.value)}
					className="border rounded px-2 py-1"
				>
					<option>Show Buffs</option>
					<option>Show Owners</option>
				</select>
			</div>

			<CanvasMap
				cities={cities}
				strongholds={strongholds}
				onClickCell={(cell) => alert(JSON.stringify(cell, null, 2))}
			/>

			<div
				className="grid gap-1 grid-flow-col"
				style={{
					gridTemplateColumns: "repeat(13, 99px)",
					gridTemplateRows: "repeat(13, 99px)"
				}}
			>
				{strongholds.map((sh: any) => {
					const expiration = sh.expiration && new Date(sh.expiration)
					const isExpired = expiration && expiration.getTime() < Date.now()

					return (
						<div
							key={sh.coords}
							className={`flex flex-col text-xs border whitespace-pre-wrap text-center justify-center p-1 text-wrap-none ${
								viewMode === "Show Buffs"
									? getBuffColor(sh.percentage, sh.buff)
									: getOwnerColor(sh.owner)
							}`}
						>
							{viewMode === "Show Buffs" ? (
								<>
									<p>Level {sh.level}</p>
									<p>{sh.city_type}</p>
									<p>
										{sh.percentage}% {sh.buff}
									</p>
								</>
							) : (
								`${sh.owner}\n${
									expiration
										? isExpired
											? "Expired"
											: `${expiration.toLocaleDateString()}\n${expiration.toLocaleTimeString()}`
										: "Expired"
								}`
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
