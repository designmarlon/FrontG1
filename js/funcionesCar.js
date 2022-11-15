//GET, POST, PUT Y DELETE

function getCar(){
    $.ajax({
        url:"http://150.230.47.51:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}


function postCar(){

    if ($("#name").val().length==0 || $("#brand").val().length==0 || $("#year").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        gama:{idGama: +$("#select-gama").val()},
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val()
    };
    console.log(cajas);

    $.ajax({
        url:"http://150.230.47.51:8080/api/Car/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el carro");
            window.location.reload();
        }
    });
   
}
}

function putCar(idBotonActualizar){

    if ($("#name").val().length==0 || $("#brand").val().length==0 || $("#year").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

let cajas = {
    idCar:idBotonActualizar,
    name:$("#name").val(),
    brand:$("#brand").val(),
    year:$("#year").val(),
    description:$("#description").val()
};


$.ajax({
    url:"http://150.230.47.51:8080/api/Car/update",
    type:"PUT",
    datatype:"JSON",
    contentType: "application/json",
    data: JSON.stringify(cajas),
    success:function(respuesta){
        alert("se actualizo correctamente el carro");
        window.location.reload();
    }
});
}

}

function deleteCar(idBotonBorrar){

    Swal.fire({
        title: 'Esta seguro de eliminar el carro? con el id:'+idBotonBorrar,
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
            'El carro ha sido eliminado.',
            'exitoso'
          )

    let myData={
        id:idBotonBorrar
    };
    $.ajax({
        url:"http://150.230.47.51:8080/api/Car/"+idBotonBorrar,
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

//////////////////////
function pintarRespuesta(respuesta){
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';

    for(i=0;i<respuesta.length;i++){

        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].gama.name+"</td>";
        myTable+="<td> <button onclick='putCar("+respuesta[i].idCar+")' class='flex mx-auto text-white bg-indigo-500 border0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Actualizar </button>";
        myTable+="<td> <button onclick='deleteCar("+respuesta[i].idCar+")' class='flex mx-auto text-white bg-indigo-400 border0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg'> Borrar </button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}


function getGamaRelacion(){

    $.ajax({
        url:"http://150.230.47.51:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select =$("#select-gama");
            $.each(respuesta, function (id,name){
                $select.append('<option value='+name.idGama+'>'+name.name+'</option>');
            });
        }
    });
}
