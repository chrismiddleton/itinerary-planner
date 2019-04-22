class Place {
	constructor(name, coords) {
		this.name = name;
		this.coords = coords;
	}
}

var placesToGo = {
	'London': {coords: [51.5074, -0.1278]},
	'Edinburgh': {coords: [55.9413,  -3.3454]},
	'Snowdonia National Park': {coords: [52.9928497, -4.0798148]},
	'Peak District National Park': {coords: [53.2350257, -1.7536802]},
	'Arthur\'s Seat': {coords: [55.9441048, -3.179342]},
	'Edinburgh Castle': {coords: [55.9485977, -3.2021022]},
	'Bath': {coords: [51.3801748, -2.3995495]},
	'Oxford': {coords: [51.7505018, -1.3176278]},
	'The Globe Theatre': {coords: [51.7469487, -2.3695451]},
	'Skye': {coords: [57.362466, -6.7784411]},
	'Isle of Mull': {coords: [56.4605455, -6.2959244]},
	'Liverpool': {coords: [53.4123001, -3.0561425]},
	'Wembley Stadium': {coords: [51.5560241, -0.2817075]},
	'Loch Lomond': {coords: [56.1561173, -4.8985087]},
	'Loch Ness': {coords: [57.2740951, -4.7818649]},
	'Ben nevis': {coords: [56.7968789, -5.0210601]},
	'Urquhart castle': {coords: [57.3241428, -4.4441899]},
	'Harry Potter Studio Tour': {coords: [51.6902558, -0.4212624]},
	'Cardiff': {coords: [51.5023268, -3.27509]},
	'Cambridge, UK': {coords: [52.1989266, 0.0499472]},
	'Brighton, UK': {coords: [50.8375054, -0.1762297]},
	'Newcastle upon Tyne': {coords: [55.0024886, -1.7969269]},
	'York, UK': {coords: [53.958677, -1.1508031]},
	'Bristol, UK': {coords: [51.468619, -2.731145]},
	'Cotswolds AONB': {coords: [51.7688201, -2.1265194]}
};

function getPlacesToGo () {
	if (!getPlacesToGo._result) {
		var copy = {};
		for (var key in placesToGo) {
			if (!placesToGo.hasOwnProperty(key)) continue;
			copy[key] = new Place(key, placesToGo[key].coords);;
		}
		getPlacesToGo._result = copy;
	}
	return getPlacesToGo._result;
}

function getPlaceByName(name) {
	// TODO: inefficient
	return getPlacesToGo()[name];
}

function getArrivalSpot() {
	// London, UK
	// TODO: handle timezones
	return new Spot(getPlaceByName('London'), new Date(2019, 4, 18, 9).getTime());
}

function getDepartureSpot() {
	// Edinburgh, UK
	return new Spot(getPlaceByName('Edinburgh'), new Date(2019, 4, 27, 9).getTime());
}

function kmToMi (km) {
	return km * 0.621371;
}

function miToKm (mi) {
	return mi * 1.60934;
}

function averageSpeed() {
	return 50;
}

// https://www.movable-type.co.uk/scripts/latlong.html
function coordsToKm(coords1, coords2) {	
	var lat1 = coords1[0], lon2 = coords1[1];
	var lat2 = coords2[0], lon2 = coords2[1];
	var R = 6371e3; // metres
	var φ1 = lat1.toRadians();
	var φ2 = lat2.toRadians();
	var Δφ = (lat2-lat1).toRadians();
	var Δλ = (lon2-lon1).toRadians();

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	return d;
}

class Spot {
	constructor (place, time) {
		this.place = place;
		this.time = time;
	}
	toString() {
		return `${this.place.name} at ${new Date(this.time).toString()}`
	}
}

class TripComponent {}

class ActivityComponent extends TripComponent {
	constructor(place, start, end) {
		super();
		this.place = place;
		this.start = start;
		this.end = end;
	}
	toString() {
		return `📍 ${this.place.name} from ${new Date(this.start).toString()} to ${new Date(this.end).toString()} 📍`;
	}
}

class TravelComponent extends TripComponent {}

class CarTravelComponent extends TravelComponent {
	constructor(origin, destination) {
		super();
		this.origin = origin;
		this.destination = destination;
	}
	toString() {
		return `🚗 Travel by car, departing from ${this.origin}, arriving at ${this.destination} 🚗`;
	}
}

function getPlaceNames() {
	var placesToGo = getPlacesToGo();
	return Object.keys(placesToGo);
}

function nextPlace(placeNames) {
	var randomIndex = Math.floor(Math.random() * placeNames.length);
	var randomPlaceName = placeNames[randomIndex];
	placeNames.splice(randomIndex, 1);
	var randomPlace = getPlacesToGo()[randomPlaceName];
	return randomPlace;
}

function planTravel(origin, destination) {
	if (!(destination instanceof Spot)) {
		// TODO: Assuming it takes 3 hours for now
		var travelDuration = 1000 * 60 * 60 * 3;
		var destinationArrivalTime = origin.time + travelDuration;
		destination = new Spot(destination, destinationArrivalTime);
	}
	// TODO: Assuming car travel for now
	return new CarTravelComponent(origin, destination);
}

class Trip {
	constructor() {
		this.components = [];
	}
	push(component) {
		this.components.push(component);
	}
	toString() {
		return this.components.join("\n");
	}
}

function planTrip() {
	// TODO: handle currency
	var dollars = 2000;
	// TODO: assuming car rental for now
	// TODO: look up car rental cost
	var carRentalCost = 200;
	dollars -= carRentalCost;
	var arrivalSpot = getArrivalSpot();
	var departureSpot = getDepartureSpot();
	var trip = new Trip();
	var placeNames = getPlaceNames();
	var currentSpot = arrivalSpot;
	// TODO: handling of price
	while (currentSpot.time < departureSpot.time && placeNames.length > 0) {
		var randomPlace = nextPlace(placeNames);
		var travelComponent = planTravel(currentSpot, randomPlace);
		trip.push(travelComponent);
		currentSpot = travelComponent.destination;
		
		// TODO: Assuming stay of 18 hours for now
		var activityDuration = 1000 * 60 * 60 * 18;
		var placeDepartureTime = currentSpot.time + activityDuration;
		var activity = new ActivityComponent(currentSpot.place, currentSpot.time, placeDepartureTime)
		trip.push(activity);
		currentSpot = new Spot(currentSpot.place, placeDepartureTime);
	}
	// TODO: check equality here
	if (currentSpot.place.name !== departureSpot.place.name) {
		var lastTravelComponent = planTravel(currentSpot, departureSpot);
		trip.push(lastTravelComponent);
	}
	return trip;
}

var randomTrip = planTrip();
var div = document.createElement('div');
div.innerHTML = randomTrip.toString().split(/\n/g).map(x => `<p>${x}</p>`).join('\n');
document.body.appendChild(div);