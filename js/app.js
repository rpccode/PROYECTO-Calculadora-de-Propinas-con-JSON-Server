let Cliente = {
        mesa: '',
        hora: '',
        pedido: []
}


const categorias = {
    1: 'comida',
    2: 'Bebidas',
    3: 'Postres'
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
        row.classList.add('row','py-3','border-top');


        const nombre = document.createElement('div');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('div');
        precio.classList.add('col-md-3','fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement('div');
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias [platillo.categoria];

        const inputCantidad= document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id= `producto-${platillo.id}`;
        inputCantidad.classList.add('form-control');


        //funcion que detecta la cantidad  y el platillo que se esta agregando
            inputCantidad.onchange = function ()   {
                const cantidad =parseInt(inputCantidad.value);
                 agregarPlatillo({...platillo,cantidad});
            }

       const  agregar =  document.createElement('div');
       agregar.classList.add('col-md-2');

       agregar.appendChild(inputCantidad);
       
        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);
        contenido.appendChild(row);



    })
}

function mostrarSecciones(){
        const seccionesOcultas = document.querySelectorAll('.d-none');
        seccionesOcultas.forEach( section => section.classList.remove('d-none'));
}
function agregarPlatillo(producto){
    //estraer el pedido actual
    let {pedido} = Cliente;

    // verificar que la cantidad sea mayor a 0
    if (producto.cantidad > 0) {

        //comprueba si el element existe en el array 
            if(pedido.some( articulos => articulos.id == producto.id)){

                //si el artiiculo existe modifiicamos la cantidad
                const pedidoActulizado = pedido.map(articulo => {

                        if(articulo.id == producto.id){

                            articulo.cantidad =producto.cantidad;
                        }
                        return articulo;

                });
                //se le asiigna eel nuevo array a cliente
                Cliente.pedido = [...pedidoActulizado];


            }else{
                //El articulo no existe, lo agregamos al array de pedidos
                    Cliente.pedido = [...pedido,producto]
            }
            
    }else{
            //Elmnar Resultados cuando el input sea 0
            const  resultado = pedido.filter( articulo => articulo.id !== producto.id)
            Cliente.pedido = [...resultado];
            
    }            
    
}