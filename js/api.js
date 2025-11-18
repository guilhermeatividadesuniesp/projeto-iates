function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    localStorage.setItem("mensagens", JSON.stringify(retorno));

    document.getElementById("resultadoMensagens").innerHTML = retorno.map(
        content => `${content.nome} | ${content.email} | <b>${content.mensagem}</b>`
    ).join('<br>');
}

function inserirMensagem(nome, email, textoMensagem) {

    var mensagem = {
        nome: nome,
        email: email,
        mensagem: textoMensagem
    }

    var inserir = $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });

    console.log(mensagem);
}

function validarUsuario(emailUsuario, senhaUsuario) {

    var objLoginSenha = {
            email: emailUsuario,
            senha: senhaUsuario
    }

    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    if (retorno == true) {
        location.href = 'mensagens.html';
    } else {
        alert('E-mail e Senha inválidos');
    }

    return retorno;
}