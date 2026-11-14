let gpsWatchId = null;
console.log("GPS FILE LOADED");
let previousPosition = null;
let totalDistance = 0;
let lastPosition = 0;

function startGpsTracking() {
    console.log("GPS TRACKING STARTED");
    if (!navigator.geolocation) {
        alert("GPS is not supported");
        return;
    }

    previousPosition = null;
    totalDistance = 0;

    gpsWatchId = navigator.geolocation.watchPosition(
        function(position) {
            
            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude;



            console.log("GPS working:", position.coords.latitude, position.coords.longitude);
            console.log("GPS accuracy:", position.coords.accuracy);
             latitude = position.coords.latitude;
             longitude = position.coords.longitude;

            if (previousPosition) {
                totalDistance += calculateDistance(
                    previousPosition.latitude,
                    previousPosition.longitude,
                    latitude,
                    longitude
                );

                document.getElementById("distance").innerText =
                    totalDistance.toFixed(3);
            }

            previousPosition = {
                latitude: latitude,
                longitude: longitude
            };
        },
        function(error) {
            alert("Unable to access GPS. Check permission.");
        },
        {
            enableHighAccuracy: true
        }
    );
}

function stopGpsTracking() {
    if (gpsWatchId !== null) {
        navigator.geolocation.clearWatch(gpsWatchId);
        gpsWatchId = null;
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );
}