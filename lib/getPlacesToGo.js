import Place from './Place.js'
import placesToGo from './placesToGo.js'

function getPlacesToGo () {
	if (!getPlacesToGo._result) {
		let copy = {}
		for (var key in placesToGo) {
			if (!placesToGo.hasOwnProperty(key)) continue
			copy[key] = new Place(key, placesToGo[key].coords)
		}
		getPlacesToGo._result = copy
	}
	return getPlacesToGo._result
}

export default getPlacesToGo