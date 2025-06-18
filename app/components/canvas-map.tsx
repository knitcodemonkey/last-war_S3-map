import React, { useEffect, useRef } from "react"

type MapObject = {
	coords: string
	level: number
	city_type: string
	owner: string
	percentage: number
	x: number
	y: number
}

type Props = {
	cities: MapObject[]
	strongholds: MapObject[]
	onClickCell?: (info: MapObject) => void
}

export default function CanvasMap({ cities, strongholds, onClickCell }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		// Setup
		canvas.width = 1000
		canvas.height = 1000
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// Draw strongholds (75x75 squares centered at x, y)
		for (const sh of strongholds) {
			ctx.fillStyle = "rgba(255, 0, 0, 0.6)" // red-ish
			ctx.fillRect(sh.x - 37.5, sh.y - 37.5, 75, 75)

			ctx.fillStyle = "black"
			ctx.font = "10px sans-serif"
			ctx.fillText(sh.coords, sh.x - 30, sh.y - 42)
		}

		// Draw cities (5x5 dots at corners)
		for (const city of cities) {
			ctx.fillStyle = "green"
			ctx.fillRect(city.x - 25, city.y - 25, 50, 50)

			// Optional label
			if (city.percentage >= 7.5) {
				ctx.fillStyle = "black"
				ctx.font = "8px sans-serif"
				ctx.fillText(city.coords, city.x + 6, city.y)
			}
		}
	}, [cities, strongholds])

	// Add click handler
	const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current
		if (!canvas || !onClickCell) return

		const rect = canvas.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const match = [...cities, ...strongholds].find((obj) => {
			return Math.abs(obj.x - x) < 10 && Math.abs(obj.y - y) < 10
		})

		if (match) onClickCell(match)
	}

	return (
		<div className="border shadow-md w-[1000px] h-[1000px] overflow-auto">
			<canvas
				ref={canvasRef}
				className="w-full h-full bg-white cursor-pointer"
				onClick={handleClick}
			/>
		</div>
	)
}
