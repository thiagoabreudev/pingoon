var longitude;
var latitude;
document.addEventListener("deviceready", onDeviceReady, false);
var opcoes = { timeout: 30000 };
var watchID;

function onDeviceReady() {
//    var opcoes = { timeout: 3000 };
//    watchID = navigator.geolocation.watchPosition(mapaSucesso, mapaErro, opcoes);
}

function capturaLocalizacao(){
    watchID = navigator.geolocation.watchPosition(mapaSucesso, mapaErro, opcoes);
}

function mapaSucesso(posicao) {
    latitude = posicao.coords.latitude;
    longitude = posicao.coords.longitude;
}

function mapaErro(msg) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n'
    );
}

function mostrarMapa(){
    var mapa_foto = document.getElementById('mapa_foto');
    mapa_foto.src = "https://maps.googleapis.com/maps/api/staticmap?"+
        "center="+window.vLatitude+","+
        window.vLongitude+"&markers="+window.vLatitude+
        "," + window.vLongitude+"&zoom=16&size=280x280&maptype=roadmap";
}

mostrarMapa();