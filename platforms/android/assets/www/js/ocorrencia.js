
/**
 * Created by supersig on 10/05/15.
 */

function insere_ocorrencia(){
    alert("Entrei no insere_ocorrencia")
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO ocorrencia (id, ocorrencia_id) VALUES(?, ?)", [1, 1],
            function (tx, res) {
                alert("entrei no function");
                alert("Insert id: " + res.insertId);
            })
    });
}