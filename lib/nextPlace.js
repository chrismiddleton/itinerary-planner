import getPlacesToGo from './getPlacesToGo.js'

function nextPlace(placeNames) {
	const randomIndex = Math.floor(Math.random() * placeNames.length)
	const randomPlaceName = placeNames[randomIndex]
	placeNames.splice(randomIndex, 1)
	return getPlacesToGo()[randomPlaceName]
}

export default nextPlace