function getListaPeriodos() {
    let listaPeriodos = JSON.parse(localStorage.getItem('listaPeriodosLS'));

    if (listaPeriodos == null) {
        listaPeriodos = [
            ["Cuatrimestre 1", "2014", true, ["BISOFT-04", "INF-01", "ING-01", "ING-02"], [["INF-01", ["303600144", "111510526", "209480106"]], ["BISOFT-04", ["209480106", "111510526"]], ["ING-01", ["303600144"]], ["ING-02", ["303600144"]]]],
            ["Cuatrimestre 1", "2016", true, ["BISOFT-04", "INF-01", "ING-01", "ING-02"], [["INF-01", ["115950763", "111510526", "209480106"]], ["BISOFT-04", ["209480106", "111510526"]], ["ING-01", ["303600144"]], ["ING-02", ["303600144"]]]]

        ];
    }
    return listaPeriodos;
}

function setListaPeriodos(paPeriodo) {
    let listaPeriodos = getListaPeriodos();

    listaPeriodos.push(paPeriodo);
    localStorage.setItem('listaPeriodosLS', JSON.stringify(listaPeriodos));
    setUsuarios();
}

function buscarPeriodo(pCuatrimestre, pAnno) {
    let listaPeriodos = getListaPeriodos();
    let periodoEncontrado = [];

    for (let i = 0; i < listaPeriodos.length; i++) {
        if ((listaPeriodos[i][0] == pCuatrimestre) && (listaPeriodos[i][1] == pAnno)) {
            periodoEncontrado = listaPeriodos[i];
        }
    }
    return periodoEncontrado;
}

function actualizarPeriodo(paInfoPeriodo) {
    let listaPeriodos = getListaPeriodos();

    for (let i = 0; i < listaPeriodos.length; i++) {
        if ((listaPeriodos[i][0] == paInfoPeriodo[0]) && (listaPeriodos[i][1] == paInfoPeriodo[1])) {
            listaPeriodos[i] = paInfoPeriodo;
            localStorage.setItem('listaPeriodosLS', JSON.stringify(listaPeriodos));
            setUsuarios();
        }
    }
}

function setPeriodo(paPeriodo) {
    localStorage.setItem('periodoModificarLS', JSON.stringify(paPeriodo));
}
function getPeriodo() {
    let periodo = JSON.parse(localStorage.getItem('periodoModificarLS'));
    return periodo;
}
