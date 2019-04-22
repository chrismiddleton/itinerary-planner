class Trip {
	constructor() {
		this.components = []
	}
	push(component) {
		this.components.push(component)
	}
	toString() {
		return this.components.join("\n")
	}
}

export default Trip
