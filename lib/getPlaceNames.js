import getPlacesToGo from './getPlacesToGo.js'

function getPlaceNames(num) {
	const placesToGo = getPlacesToGo()
	const placeNames = Object.keys(placesToGo)
	const chosenPlaceNames = []
	while (placeNames.length > 0 && num > 0) {
		const randomIndex = Math.floor(Math.random() * placeNames.length)
		chosenPlaceNames.push(placeNames[randomIndex])
		num--
	}
	return chosenPlaceNames
}

export default getPlaceNames