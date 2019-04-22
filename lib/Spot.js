import moment from '../libs/moment.js'

class Spot {
	constructor (place, time) {
		this.place = place
		this.time = time
	}
	toString() {
		const format = 'MMMM D, h:mm A'
		return `${this.place.name} at ${moment(this.time).format(format)}`
	}
}

export default Spot