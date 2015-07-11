/**
 * Created by supersig on 16/05/15.
 */

var db;
var host;
var opcoes = { timeout: 3000 };
//var host = '192.168.43.158:8081/';
//var host = 'http://52.25.81.7:8081/';
//var host = 'http://192.168.0.105:8081/';
//var host = 'http://192.168.2.2:8081/'; //Roteador pingoon
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("pingoon", "1.0", "Pingoon", 200000);
    db.transaction(criaDB, erroDB, sucessoDB);
    carregarCongiguracoes();
    totaisRegistros();
    var opcoes = { timeout: 3000 };
    watchID = navigator.geolocation.watchPosition(mapaSucesso, mapaErro, opcoes);
}

function criaDB(tx) {
//    tx.executeSql('DROP TABLE ocorrencia');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ocorrencia(id ' +
        'INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'ocorrencia_titulo varchar(200), ' +
        'ocorrencia_descricao text, ' +
        'ocorrencia_foto text, ' +
        'ocorrencia_latitude varchar(50), ' +
        'ocorrencia_longitude varchar(50), ' +
        'ocorrencia_id INTEGER, ' +
        'status varchar(1))');

    var sqlConfiguracao = 'CREATE TABLE IF NOT EXISTS configuracao(id ' +
                      'INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                      'configuracao_ip varchar(15), ' +
                      'configuracao_porta varchar(4))';

    tx.executeSql(sqlConfiguracao)
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
        "'" + window.ocorrencia_longitude + "'," + +window.ocorrencia_id + "," +
        "'" + '1' + "')";
    tx.executeSql(sql);
}

function sucessoSalvar() {
    alert("Ocorrencia N°" + window.ocorrencia_id + " criada com sucesso");
    window.location = "index.html";
}

function recuperaTotais() {
    db.transaction(recuperaRegistro, erroDB);
}

function recuperaRegistro(tx) {
    tx.executeSql("SELECT ocorrencia_id FROM ocorrencia", [], registroSucesso, erroDB);
}

function registroSucesso(tx, results) {
    var pesquisaOcoIds = [];
    var tamanho = results.rows.length;
    for (var i = 0; i < tamanho; i++) {
        pesquisaOcoIds[i] = results.rows.item(i).ocorrencia_id;
//        alert(results.rows.item(i).ocorrencia_id);
    }
    recuperaServidor(pesquisaOcoIds);
}


// Parte referente a comunicacao com o webservice e pedidos dos status das ocorrencias
function recuperaServidor(ids) {
    var url = window.host + "pesquisa";
    url += "?ocorrencia_ids=" + ids + ';';
    var conexao = new XMLHttpRequest();
    conexao.open('GET', url, false);
    conexao.send();
    if (conexao.status == 200 && conexao.responseText != '') {
        window.ret = jQuery.parseJSON(conexao.responseText);
        window.tamanho = ret.dados.length;
        window.ocorrencia_update_id = false;
        window.status_updade = false;
        window.esboco = 0;
        window.visualizado = 0;
        window.atendimento = 0;
        window.corrigido = 0;
        window.cancelado = 0;
        db.transaction(atualizarStatusRegistros, erroDB);
    }
}

function atualizarStatusRegistros(tx) {
    for (var i = 0; i < tamanho; i++) {
        sql = "UPDATE ocorrencia SET status ='" + ret.dados[i].state + "' WHERE ocorrencia_id = " + ret.dados[i].id;
        tx.executeSql(sql, [], sucesso, erroDB);
    }
    totaisRegistros();
}

function totaisRegistros() {
    db.transaction(recuperaTotaisRegistros, erroDB);
}

function recuperaTotaisRegistros(tx) {
    tx.executeSql('SELECT status, count(id) AS total FROM ocorrencia GROUP BY status', [],
        registrosTotaisSucesso,
        erroDB);
}

function registrosTotaisSucesso(tx, results) {
//    T=(On)
    var tamanho = results.rows.length;
    window.esboco = "0";
    window.visualizado = "0";
    window.atendimento = "0";
    window.corrigido = "0";
    window.cancelado = "0";
    for (var i = 0; i < tamanho; i++) {
        window.status = results.rows.item(i).status;
        if (window.status == '1') {
            window.esboco = results.rows.item(i).total;
        } else if (window.status == '2') {
            window.visualizado = results.rows.item(i).total;
        } else if (window.status == '3') {
            window.atendimento = results.rows.item(i).total;
        } else if (window.status == '4') {
            window.corrigido = results.rows.item(i).total;
        } else if (window.status == '5') {
            window.cancelado = results.rows.item(i).total;
        }
    }
    document.getElementById('esboco').innerHTML = window.esboco.toString();
    document.getElementById('visualizado').innerHTML = window.visualizado.toString();
    document.getElementById('atendimento').innerHTML = window.atendimento.toString();
    document.getElementById('corrigido').innerHTML = window.corrigido.toString();
    document.getElementById('cancelado').innerHTML = window.cancelado.toString();
}

function mostraRegistros(status) {
    window.status = status;
    db.transaction(buscaOcorrencias, erroDB);
}

function buscaOcorrencias(tx) {
    tx.executeSql("SELECT ocorrencia_id FROM ocorrencia where status = '" + window.status + "'",
        [], buscaOcorrenciasSucesso, erroDB);
}

function buscaOcorrenciasSucesso(tx, results) {
    var tamanho = results.rows.length;
    var ocorrencia_html = "";
    for (var i = 0; i < tamanho; i++) {
        ocorrencia_html += "<p>Número: " + results.rows.item(i).ocorrencia_id + "</p>";
    }

    document.getElementById(window.status).innerHTML = ocorrencia_html;
}
function enviar() {
    //tirar se o envio não funcionar
    document.getElementById('novo').style="background: rgba (255,255,255, 0.6); z-indx:1";
//  Pegando os dados do formulario para enviar para o servidor
    var button_enviar = document.getElementById('icone_gravar');
    button_enviar.style.display = 'none';
    var button_camera = document.getElementById('icone_camera');
    button_camera.style.display = 'none';
    var button_cancelar = document.getElementById('icone_cancelar');
    button_cancelar.style.display = 'none';
    var cont = 0;
    var url = window.host + "criaocorrencia?";
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

function sucesso() {
}

//Configuracoes

function buttonSalvarConfig(){
    window.hostConfig = document.getElementById('configuracao_ip').value;
    window.portConfig = document.getElementById('configuracao_porta').value;
    db.transaction(inserirDadosConfig, erroDB, sucessoSalvarConfiguracao);
}


function inserirDadosConfig(tx) {
    var sql = "INSERT INTO configuracao(configuracao_ip, " +
        "configuracao_porta)" +
        "VALUES ('" + window.hostConfig + "'," +
        "'" + window.portConfig + "')";
    tx.executeSql(sql);
}

function carregarCongiguracoes() {
    db.transaction(recuperaConfig, erroDB);
}

function recuperaConfig(tx) {
    var sql = 'SELECT * FROM configuracao ORDER BY id DESC LIMIT 1';
    tx.executeSql(sql, [], alimentaConfig, erroDB);
}

function alimentaConfig(tx, results) {
//    T=(On)
    var tamanho = results.rows.length;
    window.hostConfig = "";
    window.portConfig = "";
    for (var i = 0; i < tamanho; i++) {
        window.hostConfig = results.rows.item(i).configuracao_ip;
        window.portConfig = results.rows.item(i).configuracao_porta;
    }
//    document.getElementById('configuracao_ip').value = window.hostConfig;
//    document.getElementById('configuracao_porta').value = window.portConfig;
    window.host = 'http://' + window.hostConfig + ':' + window.portConfig + '/';
}

function sucessoSalvarConfiguracao() {
    alert("Configuração salva com sucesso!");
    window.location = "index.html";
}