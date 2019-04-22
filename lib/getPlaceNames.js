import getPlacesToGo from './getPlacesToGo.js'

function getPlaceNames() {
	var placesToGo = getPlacesToGo()
	return Object.keys(placesToGo)
}

export default getPlaceNames