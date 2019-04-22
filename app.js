import planTrip from './lib/planTrip.js'

const randomTrip = planTrip()
const div = document.createElement('div')
div.innerHTML = randomTrip.toHtml()
document.body.appendChild(div)