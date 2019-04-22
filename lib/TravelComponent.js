import TripComponent from './TripComponent.js'

class TravelComponent extends TripComponent {

	constructor(origin, destination) {
		super()
		this.origin = origin
		this.destination = destination
	}

}

export default TravelComponent
