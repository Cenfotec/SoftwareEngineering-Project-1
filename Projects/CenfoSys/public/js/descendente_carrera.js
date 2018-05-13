/*

document.querySelector('#descendenteID').addEventListener('click', mostrarDescendente);
document.querySelector('#descendenteID').addEventListener('click', mostrarDesactivados);
*/
// muestra las sedes de forma descendente
    
    function mostrarDescendente() {
    
        let botonActivados = document.querySelector('#btnActivados');
        botonActivados.classList.add('ocultar');
    
        let botonDesactivados = document.querySelector('#btnDesactivados');
        botonDesactivados.classList.remove('ocultar');
    
        let listaCursos = getlistaCursos();

        listaCursos.reverse();

        let cuerpoTabla = document.querySelector('#tblCursos tbody');
        cuerpoTabla.innerHTML = '';
    
        for (let i = 0; i < listaCursos.length; i++) {
    
            if(listaCursos[i][7] == true){
                let fila = cuerpoTabla.insertRow();
                let cSeleccionar = fila.insertCell();
                let cNombre = fila.insertCell();
                let cCosto = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cCuatrimestre = fila.insertCell();
                let cCreditos = fila.insertCell();
                let cCantidad = fila.insertCell();
        
        
                let sSeleccionar = document.createTextNode("");
                let sNombre = document.createTextNode(listaCursos[i][0]);
                let sCosto = document.createTextNode(listaCursos[i][4]);
                let sCodigo = document.createTextNode(listaCursos[i][1]);
                let sCuatrimestre = document.createTextNode(listaCursos[i][6]);
                let sCreditos = document.createTextNode(listaCursos[i][2]);
                let sCantidad = document.createTextNode(listaCursos[i][3]);
        
        
                
               
                cSeleccionar.appendChild(sSeleccionar);
                cNombre.appendChild(sNombre);
                cCosto.appendChild(sCosto);
                cCodigo.appendChild(sCodigo);
                cCuatrimestre.appendChild(sCuatrimestre);
                cCreditos.appendChild(sCreditos);
                cCantidad.appendChild(sCantidad);
        
        
               
           
                // inicio boton Editar  
                let botonEditar = document.createElement("button");
                botonEditar.innerText = "Editar";
                botonEditar.dataset.codigo = (listaCursos[i][2]);
                botonEditar.classList.add ("botonTabla");
                botonEditar.classList.add ("botonNormal");
        
        
                botonEditar.addEventListener("click", editar);
        
                cSeleccionar.appendChild(botonEditar);
        
        
        
                // inicio boton deshabilitar  
                let botonDeshabilitar = document.createElement("button");
                botonDeshabilitar.innerText = "Desactivar";
                botonDeshabilitar.dataset.codigo = listaCursos[i][2];
                botonDeshabilitar.classList.add("botonTabla");
                botonDeshabilitar.classList.add("botonDesactivar");
        
                botonDeshabilitar.addEventListener("click",deshabilitar);
                
                cSeleccionar.appendChild(botonDeshabilitar);
              
                let botonActivar = document.createElement('button');
                botonActivar.innerText = 'Activar';
                botonActivar.dataset.codigo = listaCursos[i][2];
                botonActivar.classList.add('botonTabla');
                botonActivar.classList.add('botonActivar');
                botonActivar.addEventListener('click', activar);
        
                cSeleccionar.appendChild(botonActivar);
        
                if(!listaCursos[i][7]){
                    botonDeshabilitar.classList.add('ocultar');
                }else{
                    botonActivar.classList.add('ocultar');
                }
            }
            
          
        }
}

function mostrarDesactivados(){
    botonActivados.classList.remove('ocultar');

    //let botonDesactivados = document.querySelector('#btnDesactivados');
    botonDesactivados.classList.add('ocultar');

    let listaCursos = getlistaCursos();

    listaCursos.reverse();

    let cuerpoTabla = document.querySelector('#tblCursos tbody');
    cuerpoTabla.innerHTML = '';
        for (let i = 0; i < listaCursos.length; i++) {
    
            if(listaCursos[i][7] == false){
                let fila = cuerpoTabla.insertRow();
                let cSeleccionar = fila.insertCell();
                let cNombre = fila.insertCell();
                let cCosto = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cCuatrimestre = fila.insertCell();
                let cCreditos = fila.insertCell();
                let cCantidad = fila.insertCell();
        
        
                let sSeleccionar = document.createTextNode("");
                let sNombre = document.createTextNode(listaCursos[i][0]);
                let sCosto = document.createTextNode(listaCursos[i][4]);
                let sCodigo = document.createTextNode(listaCursos[i][1]);
                let sCuatrimestre = document.createTextNode(listaCursos[i][6]);
                let sCreditos = document.createTextNode(listaCursos[i][2]);
                let sCantidad = document.createTextNode(listaCursos[i][3]);
        
        
                
               
                cSeleccionar.appendChild(sSeleccionar);
                cNombre.appendChild(sNombre);
                cCosto.appendChild(sCosto);
                cCodigo.appendChild(sCodigo);
                cCuatrimestre.appendChild(sCuatrimestre);
                cCreditos.appendChild(sCreditos);
                cCantidad.appendChild(sCantidad);
        
        
               
           
                // inicio boton Editar  
                let botonEditar = document.createElement("button");
                botonEditar.innerText = "Editar";
                botonEditar.dataset.codigo = (listaCursos[i][2]);
                botonEditar.classList.add ("botonTabla");
                botonEditar.classList.add ("botonNormal");
        
        
                botonEditar.addEventListener("click", editar);
        
                cSeleccionar.appendChild(botonEditar);
        
        
        
                // inicio boton deshabilitar  
                let botonDeshabilitar = document.createElement("button");
                botonDeshabilitar.innerText = "Desactivar";
                botonDeshabilitar.dataset.codigo = listaCursos[i][2];
                botonDeshabilitar.classList.add("botonTabla");
                botonDeshabilitar.classList.add("botonDesactivar");
                botonDeshabilitar.addEventListener("click",deshabilitar);
                
                cSeleccionar.appendChild(botonDeshabilitar);
              
                let botonActivar = document.createElement('button');
                botonActivar.innerText = 'Activar';
                botonActivar.dataset.codigo = listaCursos[i][2];
                botonActivar.classList.add('botonTabla');
                botonActivar.classList.add('botonActivar');
                botonActivar.addEventListener('click', activar);
        
                cSeleccionar.appendChild(botonActivar);
        
                if(!listaCursos[i][7]){
                    botonDeshabilitar.classList.add('ocultar');
                }else{
                    botonActivar.classList.add('ocultar');
                }
            }
            
          
        }
}
