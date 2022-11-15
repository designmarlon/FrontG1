//GET, POST, PUT Y DELETE

function getGama(){

    $.ajax({
        url:"http://150.230.47.51:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function postGama(){
    if ($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        name:$("#name").val(),
        description:$("#description").val()
    };


    $.ajax({
        url:"http://150.230.47.51:8080/api/Gama/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la gama");
            window.location.reload();
        }
    });
}
}

function putGama(idBotonActualizar){
    console.log(idBotonActualizar);

    if ($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios para poder actualizar los datos"); 
    }else{
    
    let cajas = {
        idGama:idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };


    $.ajax({
        url:"http://150.230.47.51:8080/api/Gama/update",
        type:"PUT",
        datatype:"JSON",
        contentType: "application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la gama");
            window.location.reload();
        }
    });
}
}

function deleteGama(idBotonBorrar){

    Swal.fire({
        title: 'Esta seguro de eliminar la gama? con el id:'+idBotonBorrar,
        text: "No podra revertir los cambios",
        icon: 'Warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminada!',
            'La gama ha sido eliminada.',
            'exitosa'
          )

          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://150.230.47.51:8080/api/Gama/"+idBotonBorrar,
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
    let myTable='<table class="table-auto mb-24 py-8 w-full text-left whitespace-no-wrap">';
    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].idGama+"</td>";
        myTable+="<td> <button onclick='putGama("+respuesta[i].idGama+")' class='flex mx-auto text-white bg-indigo-500 border0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Actualizar </button>";
        myTable+="<td> <button onclick='deleteGama("+respuesta[i].idGama+")' class='flex mx-auto text-white bg-indigo-500 border0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'> Borrar </button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").append(myTable);
}