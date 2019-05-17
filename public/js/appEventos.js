document.addEventListener("DOMContentLoaded", function(event) {

    var botonEditarEvento = document.getElementsByClassName('btn-editarEvento');
    var botonEliminarEvento = document.getElementsByClassName('btn-eliminarEvento');


    console.log(botonEditarEvento);
    console.log(botonEliminarEvento);

    //EditarGETDATA
    for (var i = 0; i < botonEditarEvento.length; i++) {

        botonEditarEvento[i].addEventListener('click', function() {

            console.log(this.value);
            document.getElementById('idEvento').value = this.value;

            fetch('/eventos/' + this.value, {
                    method: 'POST',
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(myJson);
                    document.getElementById('editar-titulo').value = myJson[0].titulo;
                    document.getElementById('editar-descripcion').value = myJson[0].descripcion;
                    document.getElementById('editar-fechaRealizacion').value = myJson[0].fechaRealizacion.substr(0, 10);
                    document.getElementById('editar-lugar').value = myJson[0].lugar;
                    document.getElementById('editar-imagen').src = 'http://localhost:3000/images/upload_images/' + myJson[0].imagen;

                });

        });
    }

    //Editar
    document.getElementById('btn-Patch').addEventListener('click', function() {


        var data = {
            titulo: document.getElementById('editar-titulo').value,
            descripcion: document.getElementById('editar-descripcion').value,
            fechaRealizacion: document.getElementById('editar-fechaRealizacion').value,
            //imagen: document.getElementById('imagen').files.item(0).name,
            lugar: document.getElementById('editar-lugar').value
        }


        fetch("eventos/" + document.getElementById('idEvento').value, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);

            swal("Evento editado correctamente", {
                    icon: "success"
                })
                .then((value) => {
                    window.location.replace("/dashboardE");
                });

        }).catch(err => {
            console.error(err)
        });



    });

    //Eliminar
    for (var i = 0; i < botonEliminarEvento.length; i++) {
        botonEliminarEvento[i].addEventListener('click', function() {

            swal({
                    title: "Estas seguro?",
                    text: "Una vez el eliminado el evento ya no se podra recuperar",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

                        console.log(this.value);
                        document.getElementById('idEvento').value = this.value;

                        fetch("eventos/" + document.getElementById('idEvento').value, {
                            method: 'DELETE'
                        }).then(() => {
                            console.log('removed');
                        }).catch(err => {
                            console.error(err)
                        });

                        swal("Evento eliminado correctamente", {
                                icon: "success"
                            })
                            .then((value) => {
                                window.location.replace("/dashboardE");
                            });




                    }
                });




        });
    }


});