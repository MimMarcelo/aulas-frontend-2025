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