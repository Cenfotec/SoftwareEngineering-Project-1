function setMedicamento(medicamento) {
  listaMedicamentos = obtenerListaMedicamentos();
  listaMedicamentos.push(medicamento);

  localStorage.setItem('medicamentosLS', JSON.stringify(listaMedicamentos));
}

function obtenerListaMedicamentos() {
  let listaMedicamentos = JSON.parse(localStorage.getItem('medicamentosLS'));
  if (listaMedicamentos == null) {
    listaMedicamentos = [];
  }
  return listaMedicamentos;
}
