/**
 * Created by supersig on 16/05/15.
 */

function enviar(){

//  Pegando os dados do formulario para enviar para o servidor
    var cont = 0;
    var url = "http://192.168.0.103:8081/criaocorrencia?";
    var ocorrencia_titulo = document.getElementById('titulo').value;
    var ocorrencia_descricao = document.getElementById('descricao').value;
    var ocorrencia_foto = document.getElementById('input_foto').value;
    var ocorrencia_longitude = document.getElementById('ocorrencia_longitude').value;
    var ocorrencia_latitude = document.getElementById('ocorrencia_latitude').value;
    url = url + "ocorrencia_titulo=" + ocorrencia_titulo + ";";
    url = url + "ocorrencia_descricao=" + ocorrencia_descricao + ";";
    url = url + "ocorrencia_longitude=" + ocorrencia_longitude + ";";
    url = url + "ocorrencia_latitude=" + ocorrencia_latitude + ";";
    url = url + "ocorrencia_foto=" + ocorrencia_foto;
//  Conecta com o servidor

    var formulario = document.getElementById('formulario');
    var f = new FormData();
    var conexao = new XMLHttpRequest();
    conexao.open("POST", url, true );
    conexao.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    conexao.send(f);
//  Valida mensagem de retorno
    conexao.onreadystatechange = function(){
        if (conexao.status == 200 && conexao.responseText != "" && cont == 0){
            cont = cont + 1;
            alert(conexao.responseText);
            window.location = "index.html";
        }
    };
}