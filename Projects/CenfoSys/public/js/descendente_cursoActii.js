

document.querySelector('#descendenteID').addEventListener('click', mostrarDescendente)

// muestra las sedes de forma descendente
function mostrarDescendente() {


    let listaCursos = getListaCursosActii();

    listaCursos.reverse(); // copiar esto abajo

    let cuerpoTabla = document.querySelector('#table tbody');
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursos.length; i++) {
        let fila = cuerpoTabla.insertRow(i);
        let cSeleccionar = fila.insertCell();
        let cNombre = fila.insertCell();
        let cCodigo = fila.insertCell();
        let cCantidad = fila.insertCell();
        let cCosto = fila.insertCell();


        let sSeleccionar = document.createTextNode("");
        let sNombre = document.createTextNode(listaCursos[i][0]);
        let sCodigo = document.createTextNode(listaCursos[i][1]);
        let sCantidad = document.createTextNode(listaCursos[i][2]);
        let sCosto = document.createTextNode(listaCursos[i][3]);

        cSeleccionar.appendChild(sSeleccionar);
        cNombre.appendChild(sNombre);
        cCodigo.appendChild(sCodigo);
        cCantidad.appendChild(sCantidad);
        cCosto.appendChild(sCosto);


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
        botonDeshabilitar.dataset.codigo = (listaCursos[i][2]);
        botonDeshabilitar.classList.add("botonTabla");
        botonDeshabilitar.classList.add("botonDesactivar");

        botonDeshabilitar.addEventListener("click",deshabilitar);
        
        cSeleccionar.appendChild(botonDeshabilitar);
      

      
        }
    }

    function mostrarDesactivados(){
        // pegar listar desactivados
    }
