import TripComponent from './TripComponent.js'

class ActivityComponent extends TripComponent {
	constructor(place, start, end) {
		super()
		this.place = place
		this.start = start
		this.end = end
	}
	toString() {
		return `📍 ${this.place.name} from ${new Date(this.start).toString()} to ${new Date(this.end).toString()} 📍`
	}
}

export default ActivityComponent