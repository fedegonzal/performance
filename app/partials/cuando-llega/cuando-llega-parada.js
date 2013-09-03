
// Configuramos el localStorage para las paradas favoritas
if ( typeof localStorage.ushuaiaMovil === "undefined" ) {
  localStorage.setObject("ushuaiaMovil", ushuaiaMovil); 
}
else {
  ushuaiaMovil = localStorage.getObject("ushuaiaMovil");
}


// Recorremos las paradas favoritas y las mostramos
for ( pid in ushuaiaMovil.paradasFrecuentes ) {
  parada = ushuaiaMovil.paradasFrecuentes[pid];
  // agregamos a las paradas favoritas
  $(".paradas-favoritas").append('<div class="btn-group" id="' + parada.id + '" pid="p' + parada.id + '"><a href="#" onclick="return agregarFavorita('+parada.id+');" class="btn parada-favorita">Parada ' + parada.id + '</a><a href="#" onclick="return quitarFavorita('+parada.id+');" class="btn quitar-favorita">X</a></div>');
}


// Click para consultar una parada favorita
function agregarFavorita(id) {
  try {
    $("#fieldparada").val(id);

    // ejecutamos el formulario
    $("#formconsulta").submit();
    
    return false;
  }
  catch(err) {
    app.showAlert(err.message,"Error!");
  }

}


// Click para eliminar una parada favorita
function quitarFavorita(id) {
  try {
    var pid = "p"+id;

    delete ushuaiaMovil.paradasFrecuentes[pid];
    localStorage.setObject("ushuaiaMovil", ushuaiaMovil); 
    $(".btn-group#"+id).remove();

    return false;
  }
  catch(err) {
    app.showAlert(err.message,"Error!");
  }
}



// Capturamos el evento click de consultar una parada desde el formulario
function consultarParada() {
  try {
    // Prevenimos que no se siga el link "<a href='#'>"
    event.preventDefault();

    // ejecutamos el formulario
    $("#formconsulta").submit();

    return false;
  }
  catch(err) {
    app.showAlert(err.message,"Error!");
  }
}



// interceptamos la ejecución del formulario
function formConsultarParada() {
  try {
    // Actualizamos el valor global de parada
    parada = parseInt($("#fieldparada").val());

    $("#container .modal .modal-header h3").html("Parada " + parada);
    $("#container .modal .modal-body").html("<p>Consultando servidor...</p>");
    cuantoFalta(parada);
    
    $("#container .modal").show();
    $("#container .modal-backdrop").show();

    return false;
  }
  catch(err) {
    app.showAlert(err.message,"Error!");
  }
}

