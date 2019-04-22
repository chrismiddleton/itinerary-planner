import moment from '../libs/moment.js'
import TripComponent from './TripComponent.js'

class SleepComponent extends TripComponent {

	constructor(place, start, end) {
		super()
		this.place = place;
		this.start = start;
		this.end = end;
	}
	
	toHtml() {
		const format = 'h:mm A'
		return `🛌 Sleep in <b>${this.place.name}</b> from <b>${moment(this.start).format(format)}</b> until <b>${moment(this.end).format(format)}</b>`
	}
	
}

export default SleepComponent