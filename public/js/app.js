document.addEventListener("DOMContentLoaded", function(event) {

    /////////////////////////////////// USUARIOS


    var botonEditar = document.getElementsByClassName('btn-editarUsuario');
    var botonEliminar = document.getElementsByClassName('btn-eliminarUsuario');



    //EditarGETDATA
    for (var i = 0; i < botonEditar.length; i++) {
        botonEditar[i].addEventListener('click', function() {
            console.log(this.value);
            document.getElementById('idUsuario').value = this.value;

            fetch('/usuarios/' + this.value)
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(myJson);
                    document.getElementById('editar-nombre').value = myJson[0].nombre;
                    document.getElementById('editar-usuario').value = myJson[0].usuario;
                    document.getElementById('editar-password').value = myJson[0].password;
                    document.getElementById('editar-usuarioActivo').value = myJson[0].usuarioActivo;
                    document.getElementById('editar-rol').value = myJson[0].rol;

                });

        });
    }

    //Eliminar
    for (var i = 0; i < botonEliminar.length; i++) {
        botonEliminar[i].addEventListener('click', function() {

            swal({
                    title: "Estas seguro?",
                    text: "Una vez el eliminado el usuario ya no se podra recuperar",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

                        console.log(this.value);
                        document.getElementById('idUsuario').value = this.value;

                        fetch("usuarios/" + this.value, {
                            method: 'DELETE'
                        }).then(() => {
                            console.log('removed');
                        }).catch(err => {
                            console.error(err)
                        });

                        swal("Usuario eliminado correctamente", {
                                icon: "success"
                            })
                            .then((value) => {
                                window.location.replace("/dashboardU");
                            });




                    }
                });




        });
    }

    //Editar
    document.getElementById('btn-Patch').addEventListener('click', function() {


        var data = {
            nombre: document.getElementById('editar-nombre').value,
            usuario: document.getElementById('editar-usuario').value,
            password: document.getElementById('editar-password').value,
            usuarioActivo: document.getElementById('editar-usuarioActivo').value,
            rol: document.getElementById('editar-rol').value
        }

        fetch("usuarios/" + document.getElementById('idUsuario').value, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);

            swal("Usuario editado correctamente", {
                    icon: "success"
                })
                .then((value) => {
                    window.location.replace("/dashboardU");
                });

        }).catch(err => {
            console.error(err)
        })

    });







});