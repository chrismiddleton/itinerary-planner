import ActivityComponent from './ActivityComponent.js'
import getArrivalSpot from './getArrivalSpot.js'
import getDepartureSpot from './getDepartureSpot.js'
import getPlaceNames from './getPlaceNames.js'
import nextPlace from './nextPlace.js'
import planTravel from './planTravel.js'
import Spot from './Spot.js'
import Trip from './Trip.js'

function planTrip() {
	// TODO: handle currency
	let dollars = 2000
	// TODO: assuming car rental for now
	// TODO: look up car rental cost
	const carRentalCost = 200
	dollars -= carRentalCost
	const arrivalSpot = getArrivalSpot()
	const departureSpot = getDepartureSpot()
	const trip = new Trip()
	let placeNames = getPlaceNames()
	let currentSpot = arrivalSpot
	// TODO: handling of price
	while (currentSpot.time < departureSpot.time && placeNames.length > 0) {
		const randomPlace = nextPlace(placeNames)
		const travelComponent = planTravel(currentSpot, randomPlace)
		trip.push(travelComponent)
		currentSpot = travelComponent.destination
		
		// TODO: Assuming stay of 18 hours for now
		const activityDuration = 1000 * 60 * 60 * 18
		const placeDepartureTime = currentSpot.time + activityDuration
		const activity = new ActivityComponent(currentSpot.place, currentSpot.time, placeDepartureTime)
		trip.push(activity)
		currentSpot = new Spot(currentSpot.place, placeDepartureTime)
	}
	// TODO: check equality here
	if (currentSpot.place.name !== departureSpot.place.name) {
		const lastTravelComponent = planTravel(currentSpot, departureSpot)
		trip.push(lastTravelComponent)
	}
	return trip
}

export default planTrip