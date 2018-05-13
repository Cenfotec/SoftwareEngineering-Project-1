//Llamadas de funciónes
visualizar();

document.querySelector('#btnModificarPerfil').addEventListener('click', function() {
  location.href = 'modificarPerfilFuncionario.html';
});

function visualizar(){
    let idFuncionario = getSession()[0];
    let funcionario = buscarFuncionarioPorId(idFuncionario);

    document.querySelector('#lblIdentificacion').innerHTML = funcionario[0];
    document.querySelector('#lblNombre').innerHTML = funcionario[1] + ' ' + funcionario[2] + ' ' + funcionario[3] + ' ' + funcionario[4];
    let phone = funcionario[5].split('');
    phone[8] = phone[7];
    phone[7] = phone[6];
    phone[6] = phone[5];
    phone[5] = phone[4];
    phone[4] = phone[3];
    phone[4] = '-';
    document.querySelector('#lblTelefono').innerHTML = phone.join('');
    document.querySelector('#lblEmail').innerHTML = funcionario[6];
    document.querySelector('#lblRol').innerHTML = funcionario[7];
}
