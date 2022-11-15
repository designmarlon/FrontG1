//GET, POST, PUT Y DELETE

function getClientes(){
    
    $.ajax({
        url:"http://150.230.47.51:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function postClientes(){

    if ($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };


    $.ajax({
        url:"http://150.230.47.51:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el cliente");
            window.location.reload();
        }
    });
}
}

function putClientes(idBotonActualizar){
    console.log(idBotonActualizar);

    if ($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        idClient:idBotonActualizar,
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };


    $.ajax({
        url:"http://150.230.47.51:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente el cliente");
            window.location.reload();
        }
    });
}
}

function deleteClientes(idBotonBorrar){
    Swal.fire({
        title: 'Esta seguro de eliminar el cliente? con el id:'+idBotonBorrar,
        text: "No podra revertir los cambios",
        icon: 'Warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado.',
            'exitoso'
          )

          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://150.230.47.51:8080/api/Client/"+idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            data:JSON.stringify(myData),
            contentType: "application/json",
            success:function(respuesta){
                //alert("Se ha borrado correctamente la gama")
                window.location.reload();
            }
        });

        }
      })
}

//////////////////////
function pintarRespuesta(respuesta){
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='putClientes("+respuesta[i].idClient+")' class='flex mx-auto text-white bg-indigo-500 border0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Actualizar </button>";
        myTable+="<td> <button onclick='deleteClientes("+respuesta[i].idClient+")' class='flex mx-auto text-white bg-indigo-500 border0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'> Borrar </button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}