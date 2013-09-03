
// Definimos algunas variables globales
//var servlet = 'http://www.magnetolist.com/services/cuando-llega.php';
var servlet = 'http://www.ushuaia.gob.ar/servicios/parada';


// Aqui mantendremos las paradas favoritas antes de enviar a localStorage
var ushuaiaMovil = { 'paradasFrecuentes' : {} };
var parada;


// Agregamos capacidad para manejar objetos a localStorage

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};
 
Storage.prototype.getObject = function(key) {
  //this.setObject(key,ushuaiaMovil);
  return JSON.parse(this.getItem(key));
};


// Consultamos cuánto falta para que llegue el colectivo
function cuantoFalta(parada) {

  //seteamos la url con el nro de parada en el analytics
  _gaq.push(['_trackEvent', 'parada', 'phone', parada.toString()]);


  if ( typeof ushuaiaMovil.paradasFrecuentes["p"+parada] !== "undefined" ) {
    ushuaiaMovil.paradasFrecuentes["p"+parada].count++;
  }
  else {
    ushuaiaMovil.paradasFrecuentes["p"+parada] = { 'id' : parada , 'count' : 1 } ;
    $(".paradas-favoritas").append('<div class="btn-group" id="' + parada + '" pid="p' + parada + '"><a href="#" onclick="return agregarFavorita('+parada+');" class="btn parada-favorita">Parada ' + parada + '</a><a href="#" onclick="return quitarFavorita('+parada+');" class="btn quitar-favorita">X</a></div>');
  }
  localStorage.setObject("ushuaiaMovil", ushuaiaMovil); 


  // Aqui llamaremos al proveedor con ajax para 
  // obtener el tiempo que falta para que llegue el colectivo
  $.ajax({
    type:         'GET',
    url:          servlet,
    data:         { nro : parada , nocache : nocache() },
    dataType:     'json',

    success: function(data) {

      if (parseInt(data.Response.Cant.Valor) > 0) {

      espera = "<ul>";
      

      if (data.Response.Cant.Valor > 1) {
          for (var i in data.Response.Movil) {
            var movil = data.Response.Movil[i];
            espera += "<li>Linea " + movil.linea + ", " + movil.ramal.capitalize() + ": ";

            if (parseInt(movil.tiempo) > 0) {
              espera += "espera, " + movil.tiempo + "min</li>";                
            }
            else {
              espera += "arribando</li>";
            }

          } // for moviles

        } // Response.Cant > 1

        else {

            var movil = data.Response.Movil;

            espera += "<li>Linea " + movil.linea + ", " + movil.ramal.capitalize() + ": ";

            if (parseInt(movil.tiempo) > 0) {
              espera += "espera, " + movil.tiempo + "min</li>";                
            }
            else {
              espera += "arribando</li>";
            }

        } // Response.Cant == 1

        espera += "</ul>";
      } // if > 0

      else {
        espera = "<p>No se pudieron obtener resultados para esta parada</p>";
      }

      $("#container .modal .modal-body").html(espera);

    }, // success

    error: function() {
      error = "<p>Error en la conexión con el servidor</p>";
      $("#container .modal .modal-body").html(error);
    } // error

  }); // ajax

} // cuantoFalta(parada)
