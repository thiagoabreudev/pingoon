var longitude;
var latitude;
document.addEventListener("deviceready", onDeviceReady, false);
var opcoes = { timeout: 3000 };
watchID = navigator.geolocation.watchPosition(mapaSucesso, mapaErro, opcoes);

function onDeviceReady() {
    var opcoes = { timeout: 3000 };
    watchID = navigator.geolocation.watchPosition(mapaSucesso, mapaErro, opcoes);
}

function mapaSucesso(posicao) {
    var longitude = document.getElementById('ocorrencia_longitude');
    var latitude  = document.getElementById('ocorrencia_latitude');
    longitude.value = posicao.coords.latitude;
    latitude.value = posicao.coords.longitude;
    window.vLatitude = posicao.coords.latitude;
    window.vLongitude = posicao.coords.longitude;
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