import getPlaceByName from './getPlaceByName.js'
import Spot from './Spot.js'

function getDepartureSpot() {
	// Edinburgh, UK
	return new Spot(getPlaceByName('Edinburgh'), new Date(2019, 4, 27, 9).getTime())
}

export default getDepartureSpot