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
    var element = document.getElementById('iframe-mapa');
//    var latitude = posicao.coords.latitude;
//    var longitude = posicao.coords.longitude;
    var link_mapa = "https://www.google.com/maps/embed/v1/view" +
        "?key=AIzaSyDVGKxIFqpd4Ov0UdiO_3vtwMWWAorJ_XM" +
        "&center=" + latitude.value + "," + longitude.value + "&zoom=18";
//        "&maptype=satellite";
    element.src = link_mapa;
}

function mapaErro(msg) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n'
    );
}
