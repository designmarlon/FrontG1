//GET, POST, PUT Y DELETE

function getMensajes(){

    $.ajax({
        url:"http://150.230.47.51:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function postMensajes(){

    if ($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        messageText:$("#messageText").val(),
        car:{idCar: +$("#select-car").val()},
        client:{idClient: +$("#select-client").val()},
    };
    console.log(cajas);


    $.ajax({
        url:"http://150.230.47.51:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje");
            window.location.reload();
        }
    });
}
}

function putMensajes(idBotonActualizar){

    if ($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

let cajas = {
    idMessage:idBotonActualizar,
    messageText:$("#messageText").val()
};


$.ajax({
    url:"http://150.230.47.51:8080/api/Message/update",
    type:"PUT",
    datatype:"JSON",
    contentType: "application/json",
    data: JSON.stringify(cajas),
    success:function(respuesta){
        alert("se actualizo correctamente el mensaje");
        window.location.reload();
    }
});
}

}


function deleteMensajes(idBotonBorrar){

    Swal.fire({
        title: 'Esta seguro de eliminar el mensaje? con el id:'+idBotonBorrar,
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
            'El mensaje ha sido eliminado.',
            'exitoso'
          )

    let myData={
        id:idBotonBorrar
    };
    $.ajax({
        url:"http://150.230.47.51:8080/api/Message/"+idBotonBorrar,
        type:"DELETE",
        datatype:"JSON",
        data:JSON.stringify(myData),
        contentType: "application/json",
        success:function(respuesta){
            //alert("Se ha borrado correctamente el carro")
            window.location.reload();
        }
    });

    }
    })
}

/////////////RELACIONES/////////////

function getMensajes_Car(){

    $.ajax({
        url:"http://150.230.47.51:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select =$("#select-car");
            $.each(respuesta, function (id,name){
                $select.append('<option value='+name.idCar+'>'+name.name+'</option>');
            });
        }
    
    });
}

function getMensajes_Client(){

    $.ajax({
        url:"http://150.230.47.51:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select =$("#select-client");
            $.each(respuesta, function (id,name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            });
        }
    
    });
}

///////////////////////////////////////

function pintarRespuesta(respuesta){
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].car.name+"</td>";
        myTable+="<td>"+respuesta[i].car.brand+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td> <button onclick='putMensajes("+respuesta[i].idMessage+")' class='flex mx-auto text-white bg-indigo-500 border0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Actualizar </button>";
        myTable+="<td> <button onclick='deleteMensajes("+respuesta[i].idMessage+")' class='flex mx-auto text-white bg-indigo-500 border0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'> Borrar </button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}