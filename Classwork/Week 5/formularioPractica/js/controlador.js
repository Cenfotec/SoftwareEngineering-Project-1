let btnAdd = document.querySelector('#btnAdd');

btnAdd.addEventListener('click', addElement)

function addElement() {
  let sElementoQuimico = document.querySelector('#txtElementoQuimico').value;
  console.log(sElementoQuimico);

  let iPesoAtomico = document.querySelector("#txtPesoAtomico").value;
  console.log(iPesoAtomico);

  let sSimbolo = document.querySelector('#txtSimbolo').value;
  console.log(sSimbolo);

  let infoElementos = [sElementoQuimico, iPesoAtomico, sSimbolo]
  console.log(infoElementos);
}
