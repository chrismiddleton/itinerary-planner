import TravelComponent from './TravelComponent.js'

class CarTravelComponent extends TravelComponent {

	constructor(origin, destination) {
		super(origin, destination)
	}
	
	toHtml() {
		return `🚗 Travel by car, departing from <b>${this.origin}</b>, arriving at <b>${this.destination}</b>`
	}
	
}

export default CarTravelComponent