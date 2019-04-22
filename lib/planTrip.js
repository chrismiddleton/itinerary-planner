import ActivityComponent from './ActivityComponent.js'
import getArrivalSpot from './getArrivalSpot.js'
import getDepartureSpot from './getDepartureSpot.js'
import getPlaceNames from './getPlaceNames.js'
import nextPlace from './nextPlace.js'
import planTravel from './planTravel.js'
import SleepComponent from './SleepComponent.js'
import Spot from './Spot.js'
import Trip from './Trip.js'

// TODO: separate out into more subfunctions
// TODO: properly order travel legs by closeness
// TODO: don't "sleep" at places like Globe Theater - i.e. distinction between attraction and location
// TODO: allow enough time to arrive back at original destination
// TODO: allow for setting constraints and meetup points
// TODO: fix issue where sleep starts a little later than it should
// TODO: make time spent at attractions default to 3 hours
// TODO: account for lunch and dinner
// TODO: allow ranking of locations

function planTrip() {
	const wakeHour = 8
	const sleepHour = 22
	// TODO: handle currency
	let dollars = 2000
	// TODO: assuming car rental for now
	// TODO: look up car rental cost
	const carRentalCost = 200
	dollars -= carRentalCost
	const arrivalSpot = getArrivalSpot()
	const departureSpot = getDepartureSpot()
	const trip = new Trip(arrivalSpot, departureSpot)
	let placeNames = getPlaceNames()
	let currentSpot = arrivalSpot
	// TODO: handling of price
	while (currentSpot.time < departureSpot.time && placeNames.length > 0) {
		const currentSpotBeforeTravel = currentSpot
		const randomPlace = nextPlace(placeNames)
		let travelComponent = planTravel(currentSpot, randomPlace)
		{
			const currentHour = moment(currentSpot.time).hour()
			const sleepTime = currentHour < sleepHour ?
				moment(currentSpot.time).hour(sleepHour) :
				moment(currentSpot.time).add(1, 'day').hour(sleepHour)
			const wakeTime = currentHour < wakeHour ?
				moment(currentSpot.time).hour(wakeHour) :
				moment(currentSpot.time).add(1, 'day').hour(wakeHour)
			if (travelComponent.destination.time > sleepTime) {
				// sleep first
				const sleep = new SleepComponent(currentSpot.place, currentSpot.time, wakeTime)
				trip.push(sleep)
				currentSpot = new Spot(currentSpot.place, wakeTime)
				// TODO: assuming enough time now
				travelComponent = planTravel(currentSpot, randomPlace)
			}
		}
		if (travelComponent.destination.time >= departureSpot.time) {
			currentSpot = currentSpotBeforeTravel
			break
		}
		trip.push(travelComponent)
		currentSpot = travelComponent.destination
				
		// TODO: Assuming stay of 8 hours for now
		const activityDuration = moment.duration(8, 'hours').asMilliseconds()
		const currentHour = moment(currentSpot.time).hour()
		// TODO: make sure this sleep algorithm is basically correct
		const sleepTime = currentHour < sleepHour ?
			moment(currentSpot.time).hour(sleepHour) :
			moment(currentSpot.time).add(1, 'day').hour(sleepHour)
		const wakeTime = currentHour < wakeHour ?
			moment(currentSpot.time).hour(wakeHour) :
			moment(currentSpot.time).add(1, 'day').hour(wakeHour)
		if (currentSpot.time + activityDuration > sleepTime) {
			if (sleepTime > currentSpot.time) {
				// do part of the activity first
				const activityPart1Duration = sleepTime - currentSpot.time
				const activityPart1EndTime = currentSpot.time + activityPart1Duration
				const activityPart1 = new ActivityComponent(currentSpot.place, currentSpot.time, activityPart1EndTime)
				trip.push(activityPart1)
				currentSpot = new Spot(currentSpot.place, activityPart1EndTime)
				const sleep = new SleepComponent(currentSpot.place, currentSpot.time, wakeTime)
				trip.push(sleep)
				currentSpot = new Spot(currentSpot.place, wakeTime)
				// do the rest of the activity (and assume we have enough time for it (TODO))
				const activityPart2Duration = activityDuration - activityPart1Duration
				const activityPart2EndTime = currentSpot.time + activityPart2Duration
				const activityPart2 = new ActivityComponent(currentSpot.place, currentSpot.time, activityPart2EndTime)
				trip.push(activityPart2)
				currentSpot = new Spot(currentSpot.place, activityPart2EndTime)
			} else {
				const sleep = new SleepComponent(currentSpot.place, currentSpot.time, wakeTime)
				trip.push(sleep)
				// advance to next day first, and then assume we have enough time (TODO)
				currentSpot = new Spot(currentSpot.place, wakeTime)
				// do the whole activity
				const activityEndTime = currentSpot.time + activityDuration
				const activity = new ActivityComponent(currentSpot.place, currentSpot.time, activityEndTime)
				trip.push(activity)
				currentSpot = new Spot(currentSpot.place, activityEndTime)
			}
		} else {
			// do the whole activity
			const activityEndTime = currentSpot.time + activityDuration
			const activity = new ActivityComponent(currentSpot.place, currentSpot.time, activityEndTime)
			trip.push(activity)
			currentSpot = new Spot(currentSpot.place, activityEndTime)
		}
	}
	// TODO: check equality here
	if (currentSpot.place.name !== departureSpot.place.name) {
		const lastTravelComponent = planTravel(currentSpot, departureSpot)
		trip.push(lastTravelComponent)
	}
	return trip
}

export default planTrip