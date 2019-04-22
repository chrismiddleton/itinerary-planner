import CarTravelComponent from './CarTravelComponent.js'
import coordsToKm from './coordsToKm.js'
import kmToMi from './kmToMi.js'
import Spot from './Spot.js'

function planTravel(origin, destination) {
	if (!(destination instanceof Spot)) {
		const milesBetween = kmToMi(coordsToKm(origin.place.coords, destination.coords))
		// TODO: assuming 50 mph by car
		const averageMph = 50
		const travelHours = milesBetween / averageMph
		const travelDuration = travelHours * 1000 * 60 * 60
		const destinationArrivalTime = origin.time + travelDuration
		destination = new Spot(destination, destinationArrivalTime)
	}
	// TODO: Assuming car travel for now
	return new CarTravelComponent(origin, destination)
}

export default planTravel