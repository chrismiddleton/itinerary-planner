import degToRad from './degToRad.js'

// https://www.movable-type.co.uk/scripts/latlong.html
function coordsToKm(coords1, coords2) {	
	var lat1 = coords1[0], lon1 = coords1[1]
	var lat2 = coords2[0], lon2 = coords2[1]
	// in km
	var R = 6371
	var φ1 = degToRad(lat1)
	var φ2 = degToRad(lat2)
	var Δφ = degToRad(lat2 - lat1)
	var Δλ = degToRad(lon2 - lon1)

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ/2) * Math.sin(Δλ/2)
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

	var d = R * c
	return d
}

export default coordsToKm