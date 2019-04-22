import moment from '../libs/moment.js'
import TripComponent from './TripComponent.js'

class ActivityComponent extends TripComponent {
	constructor(place, start, end) {
		super()
		this.place = place
		this.start = start
		this.end = end
	}
	toHtml() {
		const format = 'h:mm A'
		return `📍 Experience <b>${this.place.name}</b> from <b>${moment(this.start).format(format)}</b> ` +
			`to <b>${moment(this.end).format(format)}</b>`
	}
}

export default ActivityComponent