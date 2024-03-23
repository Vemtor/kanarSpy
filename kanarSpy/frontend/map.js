var map = L.map('map').setView([50.0647, 19.9450], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Funkcja obsługująca kliknięcie na mapę


let lat;
let lng;





function onMapClick(e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    console.log('Kliknięto na punkt o współrzędnych: ' + lat + ', ' + lng);
    if (lat < 50.19408179988888 && lng < 20.176359883279822 && lat > 49.94682715686282 && lng > 19.76911621123617) {
        var popup = L.popup()
            .setLatLng(e.latlng)
            .setContent(createForm())
            .openOn(map);

    } else {
        alert("Na ten moment wspieramy tylko Kraków i okolice")
    }

}

function createForm() {
    var form = '<form onsubmit="saveBusStopData(event)">' +
        'Numer linii: <input type="text" id="busLine"><br>' +
        'Przystanek autobusowy: <input type="text" id="busStop"><br>' +
        '<input type="submit" value="Zapisz">' +
        '</form>';
    return form;
}

function saveBusStopData(e) {
    e.preventDefault();
    var busLine = document.getElementById('busLine').value;
    var busStop = document.getElementById('busStop').value;
    var data = {
        'birthTime': new Date().toISOString(),
        'line': busLine,
        'stop': busStop,
        'coordinates': `${lat},${lng}`
    };
    console.log(JSON.stringify(data));
    async function postData(url = "http://localhost:8080/api/kanars", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    postData("http://localhost:8080/api/kanars", data).then((data) => {
        fetchKanars();

    });
}

map.on('click', onMapClick);


const fetchKanars = async () => {
    const baseUrl = "http://localhost:8080/api/kanars";
    const response = await fetch(baseUrl);

    if (!response.ok) {
        throw new Error("Mamy problem z fetch api");
    }

    const responseJson = await response.json();

    const responseData = responseJson._embedded.kanars;


    const loadedKanars = [];

    for (const key in responseData) {
        loadedKanars.push({
            id: responseData[key].id,
            date: responseData[key].date,
            line: responseData[key].line,
            stop: responseData[key].stop,
            coordinates: responseData[key].coordinates,

        })
    }



    return (loadedKanars);



};

var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolokalizacja nie jest obsługiwana przez tę przeglądarkę.");
    }
}

// Funkcja do wyświetlania lokalizacji użytkownika na mapie
function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);
    marker.bindPopup('Twoja lokalizacja').openPopup();
    map.setView([lat, lng], 13);
}

// Wywołanie funkcji getUserLocation podczas ładowania strony
window.onload = getUserLocation;





async function addKanar() {
    var serverResponse = await fetchKanars();

    serverResponse.forEach(kanar => {
        //var kanarDateXD = kanar.date;
        //kanarDateXD.setMinutes(kanarDateXD.getMinutes() + 1); // Dodanie 5 minut
        //var newDate = kanarDateXD.toISOString(); // Konwersja na format ISO

        //if (newDate > new Date().toISOString()) {
        var coordinates = kanar.coordinates.split(',');
        var latitude = parseFloat(coordinates[0]);
        var longitude = parseFloat(coordinates[1]);
        var marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup('Linia: ' + kanar.line + '<br>Przystanek: ' + kanar.stop);
        //}
    });
    console.log(serverResponse)
    fetchKanars();
}

addKanar();

// Wywołanie funkcji addBusStops co 5 sekund
setInterval(addKanar, 5000);