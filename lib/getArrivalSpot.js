import getPlaceByName from './getPlaceByName.js'
import Spot from './Spot.js'

function getArrivalSpot() {
	// London, UK
	// TODO: handle timezones
	return new Spot(getPlaceByName('London'), new Date(2019, 4, 18, 9).getTime())
}

export default getArrivalSpot