let Cliente = {
        mesa: '',
        hora: '',
        pedido: []
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente() {
        const mesa = document.querySelector('#mesa').value;
        const hora = document.querySelector('#hora').value;

            //Revisar si hay campos vacios
            const camposVacios = [mesa, hora].some(campo => campo === '')

            if (camposVacios) {

                //verificar si ya hay una  alertas
                    
                    const existeAlerta = document.querySelector('.invalid-feedback');

                    if (!existeAlerta) {
                        const alerta = document.createElement('div');
                        alerta.classList.add('invalid-feedback','d-block','text-center');
                        alerta.textContent = 'Todos los campos son obligatorios';

                        document.querySelector(".modal-body form").appendChild(alerta);

                        setTimeout(() => {
                          // Todo.
                          
                            alerta.remove();
                        }, 3000)
                    }

               
               
                    return;

            }


            //Asgnar datos del formulario al cliente
            
            Cliente ={...Cliente,mesa,hora}

            //ocultar modal
            const modalFormulario = document.querySelector("#formulario");
            const modalBoostrap = bootstrap.Modal.getInstance(modalFormulario);
            modalBoostrap.hide();

            //Mostrar Secciones
            mostrarSecciones();


            //obtener platllos de la api de json server
            
            obtenerPlatillos();

}

function obtenerPlatillos(){
    const url = '  http://localhost:4000/platillos';


    fetch(url)
            .then(response => response.json())
            .then( datos => mostrarPlatillos(datos))
            .catch( error => console.error(error));
            

}
function mostrarPlatillos( platillos){
    const contenido = document.querySelector('#platillos .contenido');

    platillos.forEach( platillo =>{

        const row = document.createElement('div');
        row.classList.add('row');


        const nombre = document.createElement('div');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;


        row.appendChild(nombre);
        contenido.appendChild(row);



    })
}

function mostrarSecciones(){
        const seccionesOcultas = document.querySelectorAll('.d-none');
        seccionesOcultas.forEach( section => section.classList.remove('d-none'));
}