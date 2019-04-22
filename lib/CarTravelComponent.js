import TravelComponent from './TravelComponent.js'

class CarTravelComponent extends TravelComponent {
	constructor(origin, destination) {
		super()
		this.origin = origin
		this.destination = destination
	}
	toString() {
		return `🚗 Travel by car, departing from ${this.origin}, arriving at ${this.destination} 🚗`
	}
}

export default CarTravelComponent