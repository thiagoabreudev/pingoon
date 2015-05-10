/**
 * Created by supersig on 01/05/15.
 */


function client(){
    alert("Passei no cliente");
    var titulo = document.getElementById('titulo').value;
    var url_action = 'http://192.168.0.103:8081/criaocorrencia?ocorrencia_titulo='
            + titulo;
    document.form_ocorrencia.action=url_action
}

