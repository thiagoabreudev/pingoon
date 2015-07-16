var longitude;
var latitude;
document.addEventListener("deviceready", onDeviceReady, false);
var opcoes;
var watchID;

function onDeviceReady() {
//    navigator.geolocation.getCurrentPosition(onSucces, onError);
    capturaLocalizacao();
}

function capturaLocalizacao() {
//    navigator.geolocation.getCurrentPosition(onSucces, onError,
//        {timeout: 30000, maximumAge: 3000, enableHighAccuracy: true});
    watchID = navigator.geolocation.watchPosition(onSucces, onError,
        {timeout: 30000, maximumAge: 3000, enableHighAccuracy: true});
//    watchID = navigator.geolocation.watchPosition(onSucces, onError, opcoes);
}

//function mostrarMapa() {
//    var mapa_foto = document.getElementById('mapa_foto');
//    mapa_foto.src = "https://maps.googleapis.com/maps/api/staticmap?" +
//        "center=" + window.vLatitude + "," +
//        window.vLongitude + "&markers=" + window.vLatitude +
//        "," + window.vLongitude + "&zoom=16&size=280x280&maptype=roadmap";
//}

function onSucces(position){
    document.getElementById('latitude').innerHTML = 'Lat: ' + position.coords.latitude.toString();
    document.getElementById('longitude').innerHTML = 'Long: ' + position.coords.longitude.toString();
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
//    enviar();
}

function onError(error){
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n' );
}