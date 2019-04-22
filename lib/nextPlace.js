import compare from './compare.js'
import coordsToKm from './coordsToKm.js'
import getPlaceByName from './getPlaceByName.js'
import getPlacesToGo from './getPlacesToGo.js'

function nextPlace(placeNames, currentSpot) {
	const nextPlace = placeNames.map(name => getPlaceByName(name)).sort(function(a, b) {
		return compare(coordsToKm(a.coords, currentSpot.place.coords), coordsToKm(b.coords, currentSpot.place.coords))
	})[0]
	const index = placeNames.indexOf(nextPlace.name)
	if (index !== -1) {
		placeNames.splice(index, 1)
	}
	return index !== -1 ? nextPlace : null
}

export default nextPlace