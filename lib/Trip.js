class Trip {
	constructor() {
		this.components = []
	}
	push(component) {
		this.components.push(component)
	}
	toHtml() {
		return this.components.map(x => `<p>${x.toHtml()}</p>`).join("\n")
	}
}

export default Trip
