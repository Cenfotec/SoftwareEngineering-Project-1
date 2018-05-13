//obtiene los datos
function getListaCursos() {
    let listaCursos = JSON.parse(localStorage.getItem("listaCursosLS"));
    if (listaCursos == null) {
        // Aquí se queman los datos
        listaCursos = [
                    ["INF-02", "Fundamentos de Programación", "5", "6", "226000", true, [], []],
                    ["WEB02", "Diseño Web 1", "4", "4", "135500", true, [], []],
                    ["BISOFT-04", "Proyecto de Ingeniería del Software", "7", "16", "346500", true, [], []],
                    ["INF-01", "Introducción a la Tecnología de Información", "3", "4", "111000", true, [], []],
                    ["ING-01", "Inglés para Tecnologías de Información", "1", "4", "157500", true, [], []],
                    ["ING-02", "Ingles para Tecnologías de Información 2", "2", "4", "157500", true, [], []],
                    ["BITIC-08", "Sistemas Operativos 1", "3", "6", "202500", true, [], []]
                ];

    }
    return listaCursos;

}
// almacena los datos
function setListaCursos(paInfoCursos) {
    let listaCursos = getListaCursos();
    listaCursos.push(paInfoCursos);
    localStorage.setItem('listaCursosLS', JSON.stringify(listaCursos));
    setUsuarios();
}
//Recibe un codigo de curso, compara y devuelve los datos del curso del codigo
function buscarCursoPorCod(codCurso) {
    let listaCursos = getListaCursos();
    let cursoEncontrado = [];

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][0] == codCurso) {
            cursoEncontrado = listaCursos[i];
        }
    }

    return cursoEncontrado;
}
function setCurso(paCurso){
   localStorage.setItem("modificarCursoLS",JSON.stringify(paCurso));
}
// obtencion de un curso
function getCurso(){
    let curso = JSON.parse(localStorage.getItem("modificarCursoLS"));
    return curso;
}
//Actualización de datos de un Curso
function actualizarCurso(paInfoCursos) {
    let listaCursos = getListaCursos();

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][0] == paInfoCursos[0]) {
            listaCursos[i] = paInfoCursos;
            localStorage.setItem('listaCursosLS', JSON.stringify(listaCursos));
            setUsuarios();
        }
    }
}

//-------------------------------------------------------------------------------------------------------------

// function setCursosAsociados(paInfoCursosSelec){
//     let listaCursosAsociados = getCursosAsociados();
//     listaCursosAsociados.push(paInfoCursosSelec);
//     localStorage.setItem('cursosAsociadosLS', JSON.stringify(listaCursosAsociados));
// }
//
// function getCursosAsociados(){
//     let listaCursosAsociados = JSON.parse(localStorage.getItem('cursosAsociadosLS'));
//     if(listaCursosAsociados == null){
//         listaCursosAsociados = [];
//     }
//     return listaCursosAsociados;
// }



























function getListaCursosActii() {
    let listaCursosActii = JSON.parse(localStorage.getItem("listaCursosActiiLS"));
    if (listaCursosActii == null) {
      listaCursosActii = [
          ["REQS-01", "Gestión de Requerimientos", "30", "250500", true, [], [], "2018-04-10", "2018-06-05"],
          ["ANG-01", "Desarrollo con Angular", "84", "400000", true, [], [], "2018-04-10", "2018-06-05"],
          ["MAD", "Desarrollo de aplicaciones móviles Android", "40", "500000", true, [], [], "2018-04-10", "2018-06-05"]
      ];

    }
    return listaCursosActii;

}
function setListaCursosActii(paInfoCursos) {
    let listaCursosActii = getListaCursosActii();
    listaCursosActii.push(paInfoCursos);
    localStorage.setItem('listaCursosActiiLS', JSON.stringify(listaCursosActii));
    setUsuarios();
}

function setCursoActii(paCurso) {
    localStorage.setItem("modificarCursoActiiLS", JSON.stringify(paCurso));
}
//obtenhcion curso
function getCursoActii() {
    let curso = JSON.parse(localStorage.getItem("modificarCursoActiiLS"));
    return curso;
}
//Actualizacion de dataa  de curso
function actualizarCursoActii(paInfoCursos) {
    let listaCursos = getListaCursosActii();

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][0] == paInfoCursos[0]) {
            listaCursos[i] = paInfoCursos;
            localStorage.setItem('listaCursosActiiLS', JSON.stringify(listaCursos));
            setUsuarios();
        }
    }
}
function buscarCursoActiiPorCod(codCurso) {
    let listaCursos = getListaCursosActii();
    let cursoEncontrado = [];

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][0] == codCurso) {
            cursoEncontrado = listaCursos[i];
        }
    }
    return cursoEncontrado;
}
