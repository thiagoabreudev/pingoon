/**
 * Created by supersig on 16/05/15.
 */

var db;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("pingoon", "1.0", "Pingoon", 200000);
    db.transaction(criaDB, erroDB, sucessoDB);
}

function criaDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ocorrencia(id ' +
        'INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'ocorrencia_titulo varchar(200), ' +
        'ocorrencia_descricao text, ' +
        'ocorrencia_foto text, ' +
        'ocorrencia_latitude varchar(50), ' +
        'ocorrencia_longitude varchar(50), ' +
        'ocorrencia_id INTEGER, ' +
        'status varchar(1))');
}

function erroDB(tx, err) {
    alert("Erro ao executar comado SQL: " + err);
}

function sucessoDB() {

}

function inserirDados(tx) {
    var sql = "INSERT INTO ocorrencia(ocorrencia_titulo, " +
        "ocorrencia_descricao, " +
        "ocorrencia_foto, " +
        "ocorrencia_latitude, " +
        "ocorrencia_longitude, " +
        "ocorrencia_id, " +
        "status) " +
        "VALUES ('" + window.ocorrencia_titulo + "'," +
        "'" + window.ocorrencia_descricao + "'," +
        "'" + window.ocorrencia_foto + "'," +
        "'" + window.ocorrencia_latitude + "'," +
        "'" + window.ocorrencia_longitude + "'," +
            + window.ocorrencia_id + "," +
        "'" + 'E' + "')";
    alert(sql);
    tx.executeSql(sql);
}

function sucessoSalvar() {
    alert("Ocorrencia N°" + window.ocorrencia_id + " criada com sucesso");
    window.location = "index.html";
}

function recuperaTotais(){
    db.transaction(recuperaRegistro, erroDB);
}

function recuperaRegistro(tx) {
    tx.executeSql("SELECT ocorrencia_id FROM ocorrencia", [], registroSucesso, erroDB);
}

function registroSucesso(tx, results) {
    var tamanho = results.rows.length;
    for (var i = 0; i < tamanho; i++) {
        alert(results.rows.item(i).ocorrencia_id);
    }
}

function enviar() {
//  Pegando os dados do formulario para enviar para o servidor
    var cont = 0;
    var url = "http://192.168.0.105:8081/criaocorrencia?";
    window.ocorrencia_titulo = document.getElementById('titulo').value;
    window.ocorrencia_descricao = document.getElementById('descricao').value;
    window.ocorrencia_foto = document.getElementById('input_foto').value;
    window.ocorrencia_longitude = document.getElementById('ocorrencia_longitude').value;
    window.ocorrencia_latitude = document.getElementById('ocorrencia_latitude').value;
    url = url + "ocorrencia_titulo=" + ocorrencia_titulo + ";";
    url = url + "ocorrencia_descricao=" + ocorrencia_descricao + ";";
    url = url + "ocorrencia_longitude=" + ocorrencia_longitude + ";";
    url = url + "ocorrencia_latitude=" + ocorrencia_latitude + ";";
    url = url + "ocorrencia_foto=" + ocorrencia_foto;
//  Conecta com o servidor

    var formulario = document.getElementById('formulario');
    var f = new FormData();
    var conexao = new XMLHttpRequest();
    conexao.open("POST", url, true);
    conexao.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    conexao.send(f);
//  Valida mensagem de retorno
    conexao.onreadystatechange = function () {
        if (conexao.status == 200 && conexao.responseText != "" && cont == 0) {
            cont = cont + 1;
            db.transaction(inserirDados, erroDB, sucessoSalvar);
            var resposta = jQuery.parseJSON(conexao.responseText);
            window.ocorrencia_id = resposta.id;
        }
    };
}