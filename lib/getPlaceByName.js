import getPlacesToGo from './getPlacesToGo.js'

function getPlaceByName(name) {
	return getPlacesToGo()[name]
}

export default getPlaceByName