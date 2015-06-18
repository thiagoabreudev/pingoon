var pictureSource;
var destinationType;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function fotoSucesso(imageData){
    document.getElementById('imagem').type='image';
    var imagem = document.getElementById('imagem');
    var input_img = document.getElementById('input_foto');
    imagem.src = "data:image/jpeg;base64," + imageData;
    input_img.value = imageData;

}

function fotoFalha(msg){
    alert("Erro: " + msg);
}

function capturarFoto(){
    navigator.camera.getPicture(fotoSucesso, fotoFalha, { quality: 50,
        destinationType: destinationType.DATA_URL});
}