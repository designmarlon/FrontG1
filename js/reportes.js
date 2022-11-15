function traerReporteStatus(){

    $.ajax({
        url:"http://150.230.47.51:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaStatus(respuesta);
        }
    });
}

function traerReporteFechas(){

    $.ajax({
        url:"http://150.230.47.51:8080/api/Reservation//report-dates/{dateOne}/{dateTwo}",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaStatus(respuesta);
        }
    });
}

function traerReporteClientes(){

}


//////////////////////////////////////

function pintarRespuestaStatus(respuesta){
    let myTable="<table>";
    
        myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    
        myTable+="</table>";
    $("#resultado6").html(myTable);
}


