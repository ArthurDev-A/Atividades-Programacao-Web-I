document.getElementById('submit').addEventListener('click', function() {
// O evento de clique não causará o recarregamento da página
const nome = document.getElementById('nome').value;
console.log("Nome capturado:", nome);

window.location.href = '/users/' + nome;
});