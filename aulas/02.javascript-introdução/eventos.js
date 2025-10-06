//Exemplo não funcional:
//elementoHTML.onclick = alert("Hello World!");

// Hello World
elementoHTML.onclick = evento;

function evento(){
    alert("Hello World!");
}
////////////////////////////////////

//Ler propriedade e mudar conteúdo de elemento HTML
btnGravarNome.onclick = gravarNome;

function gravarNome(){
    nome.innerText = campoNome.value
}
////////////////////////////////////

//Mudar valor de atributo de elemento HTML => Versão Limitada
// btnMudarAtributo1.onclick = mudarAtributo;
// btnMudarAtributo2.onclick = mudarAtributo;

// function mudarAtributo(tipo){
//     if(tipo == 1){
//         campoMudarAtributo.placeholder = "Login"
//         return;
//     }
//     campoMudarAtributo.placeholder = "Senha"
// }
////////////////////////////////////

//Mudar valor de atributo de elemento HTML
btnMudarAtributo1.onclick = () => mudarAtributo(1);
btnMudarAtributo2.onclick = () => mudarAtributo(2);

function mudarAtributo(tipo){
    if(tipo == 1){
        campoMudarAtributo.placeholder = "Login"
        return;
    }
    campoMudarAtributo.placeholder = "Senha"
}