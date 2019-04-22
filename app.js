import planTrip from './lib/planTrip.js'

var randomTrip = planTrip();
var div = document.createElement('div');
div.innerHTML = randomTrip.toString().split(/\n/g).map(x => `<p>${x}</p>`).join('\n');
document.body.appendChild(div);