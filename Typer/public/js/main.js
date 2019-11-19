var tempoInicial = $("#tempo-restante").text();
var campo = $(".campo-digitacao");

$(function(){
    tamanhoFrase();
    iniciaContador();
    iniciaCronometro();
    marcadores();
    $("#reinicia-jogo").click(reiniciaJogo);

});

function tamanhoFrase(){
    var frase = $("#sentence").text();
    var tamanho = frase.split(" ");
    $("#counter").text(tamanho.length);
}


function iniciaContador(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\s+/).length - 1;
        var qtdCaracteres = conteudo.length;
        $(".contador-palavras").text(qtdPalavras);
        $(".contador-caracteres").text(qtdCaracteres);
    });
}


function iniciaCronometro(){
    var tempoRestante = $("#tempo-restante").text();
    campo.one("focus", function(){
        $("#reinicia-jogo").attr("disabled", true);
        var cronometro = setInterval(function(){
            tempoRestante--;
            $("#tempo-restante").text(tempoRestante);

            if(tempoRestante < 1){
                clearInterval(cronometro);
                
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.addClass("campo-desativado");
    $("#reinicia-jogo").attr("disabled", false);
    inserePlacar();
}

function marcadores(){
    var frase = $("#sentence").text();
    campo.on("input", function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if(digitado == comparavel){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else{
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });

}

function reiniciaJogo(){
    $("#reinicia-jogo").click(function(){
        campo.attr("disabled", false);
        campo.val("");
        $(".contador-palavras").text("0");
        $(".contador-caracteres").text("0");
        $("#tempo-restante").text(tempoInicial);
        iniciaCronometro();
        campo.removeClass("campo-desativado");
        campo.removeClass("borda-vermelha");
        campo.removeClass("borda-verde");
    });
} 
