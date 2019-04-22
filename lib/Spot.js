class Spot {
	constructor (place, time) {
		this.place = place
		this.time = time
	}
	toString() {
		return `${this.place.name} at ${new Date(this.time).toString()}`
	}
}

export default Spot