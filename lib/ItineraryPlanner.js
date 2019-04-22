import planTrip from './planTrip.js'

class ItineraryPlanner {
	
	constructor() {
		this.trip = planTrip()
	}
	
	render() {
		return this.trip.render()
	}
	
}

export default ItineraryPlanner