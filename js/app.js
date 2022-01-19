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
                    console.log('si hay campos vacios');
            }else{
                console.log('no hay campos vacios');
            }

}