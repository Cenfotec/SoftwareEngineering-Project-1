function guardarID(paID) {
  sessionStorage.setItem('tempID', paID);
}

function getID() {
  return sessionStorage.getItem('tempID');
}
