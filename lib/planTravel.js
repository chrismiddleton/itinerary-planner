import CarTravelComponent from './CarTravelComponent.js'
import coordsToKm from './coordsToKm.js'
import kmToMi from './kmToMi.js'
import moment from '../libs/moment.js'
import Spot from './Spot.js'

function planTravel(origin, destination) {
	if (!(destination instanceof Spot)) {
		const milesBetween = kmToMi(coordsToKm(origin.place.coords, destination.coords))
		// See issue #18.
		const averageMph = 50
		const travelHours = milesBetween / averageMph
		const travelDuration = moment.duration(travelHours, 'hours').asMilliseconds()
		const destinationArrivalTime = origin.time + travelDuration
		destination = new Spot(destination, destinationArrivalTime)
	}
	// See issue #19.
	return new CarTravelComponent(origin, destination)
}

export default planTravel