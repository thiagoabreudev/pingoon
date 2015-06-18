var db;

function abrirDB(){
    db = window.openDatabase("pingoon", "1.0", "pingoon");
    db.transaction(crarDB, error, sucess);
}

function criarDB(tx){
    tx.executeSql("" +
        +"CREATE TABLE IF NOT EXISTS ocorrencia ("
        +"id INTEGER PRIMARY KEY AUTOINCREMENT,"
        +"ocorrencia_id INTEGER,"
        +"ocorrencia_titulo TEXT,"
        +"ocorrencia_descricao TEXT,"
        +"ocorrencia_foto TEXT,"
        +"ocorrencia_longitude TEXT,"
        +"ocorrencia_latitude TEXT)")
}

function error(err){
    alert("Ocorreu erro ao criar banco de dados");
}

function salvar(tx){
    var ocorrencia = documento.getElementById('ocorrencia');
    sql = "INSERT INTO ocorrencia" +
        "(ocorrecia_id, " +
        "ocorrencia_titulo, " +
        "ocorrencia_descricao, " +
        "ocorrencia_foto" +
        "ocorrencia_longitude" +
        "ocorrencia_latitude)" +
        "VALUES("+ 1 + ", '', '', '', '', '' )";
    tx.execute(sql);
}
