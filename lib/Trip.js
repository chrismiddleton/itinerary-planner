class Trip {
	constructor(arrivalSpot, departureSpot) {
		this.arrivalSpot = arrivalSpot;
		this.departureSpot = departureSpot;
		this.components = []
	}
	push(component) {
		this.components.push(component)
	}
	render() {
		const container = document.createElement('div')
		const title = document.createElement('h2')
		title.innerHTML = `Your Trip from ${this.arrivalSpot} to ${this.departureSpot}`
		container.appendChild(title)
		const details = document.createElement('div')
		details.innerHTML = this.components.map(x => `<p>${x.toHtml()}</p>`).join("\n")
		container.appendChild(details)
		return container
	}
}

export default Trip
