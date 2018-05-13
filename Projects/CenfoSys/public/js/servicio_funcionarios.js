//Almacenado de datos
function setListaFuncionarios(paInfoFuncionario){
    let listaFuncionarios = getListaFuncionarios();
    listaFuncionarios.push(paInfoFuncionario);
    localStorage.setItem('funcionariosLS', JSON.stringify(listaFuncionarios));
    setUsuarios();
}

//Obtención de datos
function getListaFuncionarios(){
    let listaFuncionarios = JSON.parse(localStorage.getItem('funcionariosLS'));
    if(listaFuncionarios == null){
      listaFuncionarios = [
                  ['117630799', 'Admin', '', 'General', '', '22237744', 'admin@ucenfotec.ac.cr', 'Administrador', 'Password1!', true],
                  ['107680309', 'Richard', '', 'Beck', '', '22572752', 'rbeck@ucenfotec.ac.cr', 'Gerencia', '1234', true],
                  ['800250438', 'René-Pierre', '', 'Bondu', '', '22599695', 'rbondu@ucenfotec.ac.cr', 'Rectoría', '1234', true],
                  ['103680076', 'María', 'Eugenia','Ucrós','Castañeda','78945666','mucrosC@ucenfotec.ac.cr','Decanatura','1234', true],
                  ['305620552', 'Luis', '', 'Castro','','68967543','lcastro@ucenfotec.ac.cr','Asist. Decanatura','1234', true],
                  ['702370862', 'Dayana', '', 'Alvarado','','72277107','dalvarado@ucenfotec.ac.cr','Mercadeo','1234', true],
                  ['118230700', 'Katherine', '', 'Serrano','Matamoros','78945612','kserranom@ucenfotec.ac.cr','Registro','1234', true]
              ];
    }
    return listaFuncionarios;
}

//Recibe un Id de funcionario, compara y devuelve los datos del funcionario del Id
function buscarFuncionarioPorId(pId){
    let listaFuncionarios = getListaFuncionarios();
    let funcionarioEncontrado = [];

    for (let i = 0; i < listaFuncionarios.length; i++) {
        if (listaFuncionarios[i][0] == pId) {
            funcionarioEncontrado = listaFuncionarios[i];
        }
    }

    return funcionarioEncontrado;
}

//Almacena un funcionario
function setFuncionario(paFuncionario){
    localStorage.setItem('funcionarioModificarLS', JSON.stringify(paFuncionario));
}

//Obtención de un funcionario
function getFuncionario(){
    let funcionario = JSON.parse(localStorage.getItem('funcionarioModificarLS'));
    return funcionario;
}

//Actualización de datos de un funcionario
function actualizarFuncionario(paInfoFuncionario){
    let listaFuncionarios = getListaFuncionarios();

    for (let i = 0; i < listaFuncionarios.length; i++) {
        if (listaFuncionarios[i][0] == paInfoFuncionario[0]) {
            listaFuncionarios[i] = paInfoFuncionario;
            localStorage.setItem('funcionariosLS', JSON.stringify(listaFuncionarios));
            setUsuarios();
        }
    }
}
