document.addEventListener("DOMContentLoaded", function(event) {

    //New date


    document.getElementById('btn-buscar').addEventListener('click', function() {

        var query = document.getElementById('input-buscar').value;

        window.location.replace("/buscar/" + query);

        /*fetch('/buscar/' + query)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                //window.location.replace("/buscar/" + query);
                window.location.href = "http://localhost:3000/buscar/" + query;
            });*/

    });


});