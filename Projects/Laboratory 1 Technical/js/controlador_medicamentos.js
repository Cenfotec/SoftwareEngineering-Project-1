// Mantenimiento de Medicamientos

let btnEnviar = document.querySelector('#btnEnviar-1');
btnEnviar.addEventListener('click', enviarMedicamento);

function enviarMedicamento() {
  let sNombre = document.querySelector('#txtNombre').value;
  let sUsos = document.querySelector('#txtUsos').value;
  let listaTipoUso = document.querySelector('#selectTipoUso').value;
  let listaTipoPresentacion = document.querySelector('#selectTipoPresentacion').value;
  let iPrecio = document.querySelector('#numPrecio').value;
  let bRecetaMedica = document.querySelector('#checkboxReceta').checked;
  let sCasaFarmaceutica = document.querySelector('#txtCasaFarmaceutica').value;

  let listaMedicamento = [sNombre, sUsos, listaTipoUso, listaTipoPresentacion, iPrecio, bRecetaMedica, sCasaFarmaceutica];

  console.log(listaMedicamento);
}
