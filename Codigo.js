angular.module("miApp", []).controller("Propiedades", function ($scope, $http) {
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* ---------------------CONDICIONES--------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  // Inicializar el arreglo de condiciones
  $scope.condiciones = [];

  // Obtener datos de la API
  $http.get('https://www.webmoyapico.somee.com/api/CONDICIONES')
    .then(function(response) {
      // Asignar los datos de condiciones al arreglo
      $scope.condiciones = response.data;
    })
    .catch(function(error) {
      console.error('Error al obtener las condiciones:', error);
    });


  // Función para crear una nueva condición
  $scope.crearCondicion = function (id) {
    // Realizar la solicitud POST a la API con los datos de la nueva condición
    $scope.condicion.ID_PROPIEDAD_PER = $scope.nuevaPropiedad.ID_PROPIEDAD
    $http.post('https://www.webmoyapico.somee.com/api/CONDICIONES', $scope.condicion)
      .then(function(response) {
        console.log('Condición creada:', response.data);
        $scope.condiciones.push($scope.condicion)
        $scope.condicion.ID_CONDICIONES = response.data.ID_CONDICIONES
        $scope.condicionExiste = true
        alert('Condición creada exitosamente');
      })
      .catch(function(error) {
        console.error('Error al crear la condición:', error);
      });
  };


  // Función para eliminar una condición
  $scope.eliminarCondicion = function () {
    var idCondicion = $scope.condicion.ID_CONDICIONES;
    console.log('Eliminando condición con ID:', idCondicion);

    if (confirm("¿Estás seguro de que deseas eliminar esta condición?")) {
      $http.delete('https://www.webmoyapico.somee.com/api/CONDICIONES/' + idCondicion)
        .then(function(response) {
          console.log('Condición eliminada exitosamente');

          // Eliminar la condición de la lista en el cliente
          const index = $scope.condiciones.findIndex(condicion => condicion.ID_CONDICIONES === idCondicion);
          if (index !== -1) {
            $scope.condiciones.splice(index, 1);
          }
          $scope.condicion = $scope.condiciones.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
          $scope.condicionExiste = $scope.condiciones.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
        })
        .catch(function(error) {
          console.error('Error al eliminar la condición:', error);
        });
    }
  };

  // Función para actualizar una condición
  $scope.actualizarCondicion = function () {
    $scope.condicion.ID_PROPIEDAD_PER = $scope.nuevaPropiedad.ID_PROPIEDAD
    var idCondicion = $scope.condicion.ID_CONDICIONES;
    console.log('Actualizando condición con ID:', idCondicion);

    // Realizar la solicitud PUT a la API con los datos actualizados de la condición
    $http.put('https://www.webmoyapico.somee.com/api/CONDICIONES/' + idCondicion, $scope.condicion)
      .then(function(response) {
        console.log('Condición actualizada exitosamente');

        // Mostrar alerta de éxito
        alert('Condición actualizada exitosamente');

        // Refrescar la tabla
        $scope.obtenerCondiciones();
        $scope.condicion = $scope.condiciones.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
        $scope.condicionExiste = $scope.condiciones.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
      })
      .catch(function(error) {
        console.error('Error al actualizar la condición:', error);
      });
  };


  $scope.condicion = null;

  $scope.limpiarCampos = function () {
    // Asigna un objeto vacío para limpiar los campos
    $scope.condicion = {};
  };

  // Función para obtener condiciones actualizadas de la API
  $scope.obtenerCondiciones = function () {
    $http.get('https://www.webmoyapico.somee.com/api/CONDICIONES')
      .then(function(response) {
        // Actualizar el arreglo de condiciones
        $scope.condiciones = response.data;
      })
      .catch(function(error) {
        console.error('Error al obtener las condiciones:', error);
      });
  };

  $scope.obtenerCondiciones();
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* ---------------------SERVICIOS--------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */

  // Inicializar el arreglo de servicios
  $scope.servicios = [];

  // Obtener datos de la API
  $http.get('https://www.webmoyapico.somee.com/api/SERVICIOS')
    .then(function(response) {
      // Asignar los datos de servicios al arreglo
      $scope.servicios = response.data;
    })
    .catch(function(error) {
      console.error('Error al obtener los servicios:', error);
    });

  // Función para seleccionar un servicio
  $scope.seleccionarServicio = function (servicio) {
    console.log('Servicio seleccionado:', servicio);
    // Aquí puedes realizar acciones adicionales al seleccionar un servicio, si es necesario.
  };

  // Función para crear un nuevo servicio
  $scope.crearServicio = function () {
    $scope.servicio.ID_PROPIEDAD_PER = $scope.nuevaPropiedad.ID_PROPIEDAD
    console.log('Nuevo servicio antes de la solicitud POST:', $scope.servicio);

    // Realizar la solicitud POST a la API con los datos del nuevo servicio
    $http.post('https://www.webmoyapico.somee.com/api/SERVICIOS', $scope.servicio)
      .then(function(response) {
        console.log('Servicio creado exitosamente:', response.data);

        // Mostrar alerta de éxito
        alert('Servicio creado exitosamente');

        // Actualizar la lista de servicios
        $scope.servicio.ID_SERVICIO = response.data.ID_SERVICIO
        $scope.servicios.push($scope.servicio)
        $scope.servicioExiste = true
      })
      .catch(function(error) {
        console.error('Error al crear el servicio:', error);

        // Mostrar alerta de error
        alert('Error al crear el servicio');
      });
  };

  // Función para eliminar un servicio
  $scope.eliminarServicio = function () {
    var idServicio = $scope.servicio.ID_SERVICIO;
    console.log('Eliminando servicio con ID:', idServicio);

    if (confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
      $http.delete('https://www.webmoyapico.somee.com/api/SERVICIOS/' + idServicio)
        .then(function(response) {
          console.log('Servicio eliminado exitosamente');

          // Mostrar alerta de éxito
          alert('Servicio eliminado exitosamente');

          // Eliminar el servicio de la lista en el cliente
          const index = $scope.servicios.findIndex(servicio => servicio.ID_SERVICIO === idServicio);
          if (index !== -1) {
            $scope.servicios.splice(index, 1);
          }

          $scope.servicio = $scope.servicios.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
          $scope.servicioExiste = $scope.servicios.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
        })
        .catch(function(error) {
          console.error('Error al eliminar el servicio:', error);

          // Mostrar alerta de error
          alert('Error al eliminar el servicio');
        });
    }
  };

  // Función para actualizar un servicio
  $scope.actualizarServicio = function () {
    $scope.servicio.ID_PROPIEDAD_PER = $scope.nuevaPropiedad.ID_PROPIEDAD
    var idServicio = $scope.servicio.ID_SERVICIO;
    console.log('Actualizando servicio con ID:', idServicio);

    // Realizar la solicitud PUT a la API con los datos del servicio actualizados
    $http.put('https://www.webmoyapico.somee.com/api/SERVICIOS/' + idServicio, $scope.servicio)
      .then(function(response) {
        console.log('Servicio actualizado exitosamente:', response.data);

        // Mostrar alerta de éxito
        alert('Servicio actualizado exitosamente');
        $scope.obtenerServicios();
        $scope.servicio = $scope.servicios.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
        $scope.servicioExiste = $scope.servicios.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)

      })
      .catch(function(error) {
        console.error('Error al actualizar el servicio:', error);

        // Mostrar alerta de error
        alert('Error al actualizar el servicio');
      });
  };

  $scope.servicio = {};

  // Función para limpiar los campos del formulario
  $scope.limpiarCampos = function () {
    // Asigna un objeto vacío para limpiar los campos
    $scope.servicio = {};
  };

  // Función para obtener servicios actualizados de la API
  $scope.obtenerServicios = function () {
    $http.get('https://www.webmoyapico.somee.com/api/SERVICIOS')
      .then(function(response) {
        // Actualizar el arreglo de servicios
        $scope.servicios = response.data;
      })
      .catch(function(error) {
        console.error('Error al obtener los servicios:', error);
      });
  };

  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* ---------------------CARACTERISTICAS------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  // Inicializar el arreglo de características
  $scope.caracteristicas = [];

  // Obtener datos de la API
  $http.get('https://www.webmoyapico.somee.com/api/CARACTERISTICAS')
    .then(function(response) {
      // Asignar los datos de características al arreglo
      $scope.caracteristicas = response.data;
    })
    .catch(function(error) {
      console.error('Error al obtener las características:', error);
    });

  // Función para crear una nueva característica
  $scope.crearCaracteristica = function () {
    $scope.caracteristica.ID_PROPIEDAD_PER = $scope.nuevaPropiedad.ID_PROPIEDAD
    console.log('Nueva característica antes de la solicitud POST:', $scope.caracteristica);

    // Realizar la solicitud POST a la API con los datos de la nueva característica
    $http.post('https://www.webmoyapico.somee.com/api/CARACTERISTICAS', $scope.caracteristica)
      .then(function(response) {
        console.log('Característica creada exitosamente:', response.data);

        // Mostrar alerta de éxito
        alert('Característica creada exitosamente');

        // Actualizar la lista de características
        $scope.caracteristicas.push($scope.caracteristica)
        $scope.caracteristica.ID_CARACTERISTICAS = response.data.ID_CARACTERISTICAS
        $scope.caracteristicaExiste = true
      })
      .catch(function(error) {
        console.error('Error al crear la característica:', error);

        // Mostrar alerta de error
        alert('Error al crear la característica');
      });
  };

  // Función para eliminar una característica
  $scope.eliminarCaracteristica = function () {
    var idCaracteristica = $scope.caracteristica.ID_CARACTERISTICAS;
    console.log('Eliminando característica con ID:', idCaracteristica);

    if (confirm("¿Estás seguro de que deseas eliminar esta característica?")) {
      $http.delete('https://www.webmoyapico.somee.com/api/CARACTERISTICAS/' + idCaracteristica)
        .then(function(response) {
          console.log('Característica eliminada exitosamente');

          // Mostrar alerta de éxito
          alert('Característica eliminada exitosamente');

          // Eliminar la característica de la lista en el cliente
          const index = $scope.caracteristicas.findIndex(caracteristica => caracteristica.ID_CARACTERISTICAS === idCaracteristica);
          if (index !== -1) {
            $scope.caracteristicas.splice(index, 1);
          }
          $scope.caracteristica = $scope.caracteristicas.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
          $scope.caracteristicaExiste = $scope.caracteristicas.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
        })
        .catch(function(error) {
          console.error('Error al eliminar la característica:', error);

          // Mostrar alerta de error
          alert('Error al eliminar la característica');
        });
    }
  };

  // Función para actualizar una característica
  $scope.actualizarCaracteristica = function () {
    $scope.caracteristica.ID_PROPIEDAD_PER = $scope.nuevaPropiedad.ID_PROPIEDAD
    var idCaracteristica = $scope.caracteristica.ID_CARACTERISTICAS;
    console.log('Actualizando característica con ID:', idCaracteristica);

    // Realizar la solicitud PUT a la API con los datos de la característica actualizados
    $http.put('https://www.webmoyapico.somee.com/api/CARACTERISTICAS/' + idCaracteristica, $scope.caracteristica)
      .then(function(response) {
        console.log('Característica actualizada exitosamente:', response.data);

        // Mostrar alerta de éxito
        alert('Característica actualizada exitosamente');

        // Actualizar la lista de características
        $scope.obtenerCaracteristicas();
        $scope.caracteristica = $scope.caracteristicas.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
        $scope.caracteristicaExiste = $scope.caracteristicas.find(c => c.ID_PROPIEDAD_PER == $scope.nuevaPropiedad.ID_PROPIEDAD)
      })
      .catch(function(error) {
        console.error('Error al actualizar la característica:', error);

        // Mostrar alerta de error
        alert('Error al actualizar la característica');
      });
  };

  $scope.caracteristica = {};

  $scope.seleccionarCaracteristica = function (caracteristica) {
    console.log('Característica seleccionada:', caracteristica);
    $scope.caracteristica.ID_CARACTERISTICAS = caracteristica.ID_CARACTERISTICAS;
    $scope.caracteristica.ID_PROPIEDAD_PER = caracteristica.ID_PROPIEDAD_PER;
    $scope.caracteristica.HABITACIONES = caracteristica.HABITACIONES;
    $scope.caracteristica.COCINA = caracteristica.COCINA;
    $scope.caracteristica.BANO = caracteristica.BANO;
    $scope.caracteristica.AMOBLADO = caracteristica.AMOBLADO;
    $scope.caracteristica.JARDIN = caracteristica.JARDIN;
    $scope.caracteristica.METRAJE = caracteristica.METRAJE;
  };

  // Función para limpiar los campos del formulario
  $scope.limpiarCampos = function () {
    // Asigna un objeto vacío para limpiar los campos
    $scope.caracteristica = {};
  };

  // Función para obtener características actualizadas de la API
  $scope.obtenerCaracteristicas = function () {
    $http.get('https://www.webmoyapico.somee.com/api/CARACTERISTICAS')
      .then(function(response) {
        // Actualizar el arreglo de características
        $scope.caracteristicas = response.data;
      })
      .catch(function(error) {
        console.error('Error al obtener las características:', error);
      });
  };



  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* ---------------------MAPA------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */

var map; // Mapa global
var markers = []; // Arreglo para almacenar los marcadores
var movableMarker; // Marcador que se puede mover
var infowindow; // Variable para la ventana emergente

function iniciarMap($scope) {
  var coord = { lat: -1.2426, lng: -78.6192 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: coord,
    disableDefaultUI: true, // Deshabilita los controles predeterminados
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  });

  // Llamar a la función para cargar las ubicaciones al inicio
  cargarUbicaciones();

  setInterval(function () {
    cargarUbicaciones();
  }, 1000);


  // Al hacer clic en el mapa, manejar la creación o movimiento de marcadores
  map.addListener('click', function (event) {
    if (!movableMarker) {
      // No hay marcador móvil, por lo tanto, crear uno
      crearMarcadorMovible(event.latLng, $scope);
    } else {
      // Hay un marcador móvil, por lo tanto, moverlo
      moverMarcador(movableMarker, event.latLng, $scope);
    }
  });
}

function crearMarcadorMovible(latLng, $scope) {
  movableMarker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: iconos($scope.nuevaPropiedad.TIPO_PROPIEDAD_PER),
    draggable: true,
  });

  const propiedad = {
    UBICACION_X: latLng.lat(),
    UBICACION_Y: latLng.lng(),
    ID_USUARIO_PROPIETARIO: $scope.nuevaPropiedad.ID_USUARIO_PROPIETARIO
  }
  actualizarFormulario(propiedad, $scope);

  google.maps.event.addListener(movableMarker, 'click', function () {
    const propiedad = {
      UBICACION_X: latLng.lat(),
      UBICACION_Y: latLng.lng(),
      ID_USUARIO_PROPIETARIO: $scope.nuevaPropiedad.ID_USUARIO_PROPIETARIO
    }
    mostrarInfoWindow(movableMarker, $scope);
    actualizarFormulario(propiedad, $scope);
  });
}

function moverMarcador(marker, latLng, $scope) {
  marker.setPosition(latLng);
  const propiedad = {
    UBICACION_X: latLng.lat(),
    UBICACION_Y: latLng.lng(),
    ID_USUARIO_PROPIETARIO: $scope.nuevaPropiedad.ID_USUARIO_PROPIETARIO
  }
  actualizarFormulario(propiedad, $scope);
}

function mostrarInfoWindow(marcador, $scope) {
  if (infowindow) {
    infowindow.close();
  }

  // Obtener la propiedad asociada al marcador actual
  var propiedad = marcador.location;

  // Crear contenido HTML para la ventana emergente
  var contentString = `
<div>
<p><strong>Nombre:</strong> ${propiedad?.NOMBRE_PROPIEDAD}</p>
<p><strong>Tipo:</strong> ${mapTipoPropiedad(propiedad?.TIPO_PROPIEDAD_PER)}</p>
<p><strong>Ubicación:</strong> ${propiedad?.UBICACION_PROPIEDAD}</p>
<p><strong>Precio:</strong> ${propiedad?.PRECIO}</p>
<p><strong>Estado:</strong> ${propiedad?.ESTADO ? 'Disponible' : 'No disponible'}</p>
<!-- Agrega más campos según sea necesario -->
</div>
`;

  // Crear la ventana emergente
  infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  // Mostrar la ventana emergente en la posición del marcador
  infowindow.open(map, marcador);

}

function mapTipoPropiedad(tipoPropiedad) {
  switch (tipoPropiedad) {
    case 1:
      return 'Casa';
    case 2:
      return 'Departamento';
      case 3:
      return 'Media Agua';
      case 4:
      return 'Villa';
    // Agrega más casos según sea necesario
    default:
      return 'Tipo Desconocido';
  }
}


function actualizarFormulario(propiedad, $scope) {
  $scope.$apply(function () {
    $scope.seleccionarPropiedad(propiedad)
  });
}

function iconos(tipoPropiedad) {
  switch (tipoPropiedad) {
    case 1:
      return '/Home3_37171.png';
    case 2:
      return '/departamento.png';
    case 3:
      return '/mediaAgua.png';
    case 4:
      return '/villa.png';
    default:
      return '';
  }
}

// Función para cargar las ubicaciones
function cargarUbicaciones() {
  // Obtener el ID_USUARIO_PROPIETARIO almacenado en localStorage
  var usuarioId = localStorage.getItem("usuarioId");

  fetch('https://www.webmoyapico.somee.com/api/PROPIEDADES')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Crear nuevos marcadores
      data
        .filter((location) => location.ID_USUARIO_PROPIETARIO == usuarioId)
        .forEach(function (location) {
          var latLng = new google.maps.LatLng(location.UBICACION_X, location.UBICACION_Y);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: iconos(location.TIPO_PROPIEDAD_PER),
          });
          marker.location = location;

          // Al hacer clic en un marcador, mostrar la ventana emergente con los datos de la propiedad
          google.maps.event.addListener(marker, 'click', function () {
            mostrarInfoWindow(marker, $scope);
            actualizarFormulario(marker.location, $scope);
          });

          markers.push(marker);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}




  // Llamar a la función al cargar la página
  angular.element(document).ready(function () {
    iniciarMap($scope);
  });

  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* ---------------------PROPIEDADES------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------------------- */


  // Inicializar el arreglo de propiedades
  $scope.propiedades = [];
  /// Obtener datos de la API
  $http
    .get("https://www.webmoyapico.somee.com/api/PROPIEDADES")
    .then(function (response) {
      // Filtrar las propiedades basándose en el ID_USUARIO
      var usuarioId = localStorage.getItem("usuarioId");
      $scope.propiedades = response.data.filter(
        (propiedad) => propiedad.ID_USUARIO_PROPIETARIO == usuarioId
      );
    })
    .catch(function (error) {
      console.error("Error al obtener las propiedades:", error);
    });


  // Función para crear una nueva propiedad
  $scope.crearPropiedad = function () {
    console.log('Nueva propiedad antes de la solicitud POST:', $scope.nuevaPropiedad);

    // Realizar la solicitud POST a la API con los datos de la nueva propiedad
    $http.post('https://www.webmoyapico.somee.com/api/PROPIEDADES', $scope.nuevaPropiedad)
      .then(function(response) {
        console.log('Propiedad creada:', response.data);

        // Mostrar alerta de éxito
        alert('Propiedad creada exitosamente');

        // Agregar la nueva propiedad a la lista en el cliente
        $scope.propiedades.push(response.data);

        // Limpiar los campos después de crear la propiedad
        $scope.limpiarCampos();
      })
      .catch(function(error) {
        console.error('Error al crear la propiedad:', error);
      });

  };



  // Función para actualizar una propiedad
  $scope.actualizarPropiedad = function () {
    var idPropiedad = $scope.nuevaPropiedad.ID_PROPIEDAD;
    console.log('Actualizando propiedad con ID:', idPropiedad);

    // Realizar la solicitud PUT a la API con los datos de la propiedad actualizados
    $http.put('https://www.webmoyapico.somee.com/api/PROPIEDADES/' + idPropiedad, $scope.nuevaPropiedad)
      .then(function(response) {
        console.log('Propiedad actualizada exitosamente:', response.data);

        // Mostrar alerta de éxito
        alert('Propiedad actualizada exitosamente');

        // Limpiar los campos después de crear la propiedad
        $scope.limpiarCampos();

        // Refrescar la tabla
        const idx = $scope.propiedades.findIndex(e => e.ID_PROPIEDAD == $scope.nuevaPropiedad.ID_PROPIEDAD);
        $scope.propiedades[idx] = $scope.nuevaPropiedad
      })
      .catch(function(error) {
        console.error('Error al actualizar la propiedad:', error);
      });
  };


  // En el controlador Propiedades
  $scope.eliminarPropiedad = function () {
    var idPropiedad = $scope.nuevaPropiedad.ID_PROPIEDAD;
    console.log('Eliminando propiedad con ID:', idPropiedad);

    if (confirm("¿Estás seguro de que deseas eliminar esta propiedad?")) {
      $http.delete('https://www.webmoyapico.somee.com/api/PROPIEDADES/' + idPropiedad)
        .then(function(response) {
          console.log('Propiedad eliminada exitosamente');
          // Eliminar la propiedad de la lista en el cliente
          const index = $scope.propiedades.findIndex(propiedad => propiedad.ID_PROPIEDAD === idPropiedad);
          if (index !== -1) {
            $scope.propiedades.splice(index, 1);
          }
          // Limpiar los campos después de eliminar la propiedad
          $scope.limpiarCampos();
          markers = []
          iniciarMap($scope);
        })
        .catch(function(error) {
          console.error('Error al eliminar la propiedad:', error);
        });
    }

  };


  $scope.obtenerPropiedades = function () {
    $http.get('https://www.webmoyapico.somee.com/api/PROPIEDADES')
      .then(function(response) {
        // Asignar los datos de propiedades al arreglo
        $scope.propiedades = response.data;
      })
      .catch(function(error) {
        console.error('Error al obtener las propiedades:', error);
      });
  };


  $scope.nuevaPropiedad = {};
  $scope.imagenes = [];
  $scope.seleccionarPropiedad = function (propiedad) {
    console.log("Propiedad seleccionada:", propiedad);
    $scope.nuevaPropiedad = propiedad;

    $scope.nuevaPropiedad.TIPO_PROPIEDAD_PER = propiedad.TIPO_PROPIEDAD_PER?.toString()
    $scope.nuevaPropiedad.ESTADO = propiedad.ESTADO?.toString()

    $scope.condicion = $scope.condiciones.find(c => c.ID_PROPIEDAD_PER == propiedad.ID_PROPIEDAD)
    $scope.condicionExiste = $scope.condiciones.find(c => c.ID_PROPIEDAD_PER == propiedad.ID_PROPIEDAD)
    $scope.servicio = $scope.servicios.find(c => c.ID_PROPIEDAD_PER == propiedad.ID_PROPIEDAD)
    $scope.servicioExiste = $scope.servicios.find(c => c.ID_PROPIEDAD_PER == propiedad.ID_PROPIEDAD)
    $scope.caracteristica = $scope.caracteristicas.find(c => c.ID_PROPIEDAD_PER == propiedad.ID_PROPIEDAD)
    $scope.caracteristicaExiste = $scope.caracteristicas.find(c => c.ID_PROPIEDAD_PER == propiedad.ID_PROPIEDAD)

    $http.get('https://www.webmoyapico.somee.com/api/FOTOS')
    .then(function (response) {
      $scope.imagenes = response.data.map(e => {
        const binary = atob(e.FOTO)
        const uint8Array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          uint8Array[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: 'image/png' });
        const imgUrl = URL.createObjectURL(blob);
        return {
          src : imgUrl,
          propiedad: e.ID_PRO_PER
        };
      }).filter(e=>e.propiedad == propiedad.ID_PROPIEDAD);
    })
    .catch(function (error) {
      console.error('Error al obtener las propiedades:', error);
    });

  };

  // Función para limpiar los campos del formulario
  $scope.limpiarCampos = function () {
    // Guarda el ID_USUARIO_PROPIETARIO antes de limpiar todos los campos
    var idUsuarioPropietario = $scope.nuevaPropiedad.ID_USUARIO_PROPIETARIO;

    // Asigna un objeto vacío para limpiar todos los campos
    $scope.nuevaPropiedad = {};

    // Restaura el ID_USUARIO_PROPIETARIO
    $scope.nuevaPropiedad.ID_USUARIO_PROPIETARIO = idUsuarioPropietario;
  };

  function asignarIdUsuarioPropietario() {
    // Obtener el ID_USUARIO_PROPIETARIO almacenado en localStorage
    var idUsuarioPropietario = localStorage.getItem("idUsuarioPropietario");

    // Asignar el valor al modelo de Angular
    $scope.nuevaPropiedad.ID_USUARIO_PROPIETARIO = idUsuarioPropietario;
  }

  // Llamar a la función al cargar la página
  asignarIdUsuarioPropietario();

  $scope.images = []
  $scope.setImage = function(event,idx) {
  }

  $scope.crearFoto = async function (event) {
    const promises = ['foto1','foto2','foto3','foto4','foto5','foto6'].map(async e => {
      const file = event.target[e].files[0]
      return await new Promise((resolve,reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');

          resolve(base64String);
        };
        reader.readAsDataURL(file)
      })
    })
    .map(async i => {
      return {
        ID_FOTO: Number((Math.random() * 1_000).toFixed(0)),
        ID_PRO_PER: $scope.nuevaPropiedad.ID_PROPIEDAD,
        FOTO: await i
      }
    })
    $scope.images = await Promise.all(promises)

    console.log(`Fotos a subir:`,$scope.images)

    const postPromises = $scope.images.map(async img => {
      $http.post('https://www.webmoyapico.somee.com/api/FOTOS', img)
        .then(function(response) {
          console.log('Foto creada:', response.data);
        })
        .catch(function(error) {
          console.error('Error al crear la foto:', error);
        });
    })

    await Promise.all(postPromises)
    .then(_ => {
      alert("Fotos subidas exitosamente")
      $scope.imagenes = $scope.images.map(e => {
        const binary = atob(e.FOTO)
        const uint8Array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          uint8Array[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: 'image/png' });
        const imgUrl = URL.createObjectURL(blob);
        return {
          src : imgUrl,
          propiedad: e.ID_PRO_PER
        };
      })
    })
  }


  $scope.actualizarFoto = async function (event) {
    const promises = ['foto1','foto2','foto3','foto4','foto5','foto6'].map(async e => {
      const file = event.target[e].files[0]
      return await new Promise((resolve,reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');

          resolve(base64String);
        };
        reader.readAsDataURL(file)
      })
    })
    .map(async (i,j) => {
      return {
        ID_FOTO: $scope.imagenes[j],
        ID_PRO_PER: $scope.nuevaPropiedad.ID_PROPIEDAD,
        FOTO: await i
      }
    })
    $scope.images = await Promise.all(promises)

    console.log(`Fotos a actualizar:`,$scope.images)

    const postPromises = $scope.images.map(async img => {
      $http.put(`https://www.webmoyapico.somee.com/api/FOTOS/${img.ID_FOTO}`, img)
        .then(function(response) {
          console.log('Foto Actualizada:', response.data);
        })
        .catch(function(error) {
          console.error('Error al crear la foto:', error);
        });
    })

    await Promise.all(postPromises)
    .then(_ => {
      alert("Fotos actualizadas exitosamente")
      $scope.imagenes = $scope.images.map(e => {
        const binary = atob(e.FOTO)
        const uint8Array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          uint8Array[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: 'image/png' });
        const imgUrl = URL.createObjectURL(blob);
        return {
          src : imgUrl,
          propiedad: e.ID_PRO_PER
        };
      })
    })
  }


  /* VALIDADORES */



  $scope.nombreProInvalido = false;

  $scope.validarNombrePro = function() {
    var nombre = $scope.nuevaPropiedad.NOMBRE_PROPIEDAD;

    // Expresión regular para verificar que el nombre tenga entre 2 y 25 caracteres y puede incluir espacios
    var regex = /^[a-zA-Z\s]{2,25}$/;

    if (!regex.test(nombre)) {
        $scope.nombreProInvalido = true;
    } else {
        $scope.nombreProInvalido = false;
    }
};








$scope.precioProInvalido = false;

$scope.validarPrecioPro = function() {
    var precio = $scope.nuevaPropiedad.PRECIO;

    // Expresión regular para verificar que el precio tenga entre 2 y 5 dígitos
    var regex = /^\d{2,5}$/;

    if (!regex.test(precio)) {
        $scope.precioProInvalido = true;
    } else {
        $scope.precioProInvalido = false;
    }
};







$scope.ubiProInvalido = false;

$scope.validarUbiPro = function() {
    var ubi = $scope.nuevaPropiedad.UBICACION_PROPIEDAD;

    // Expresión regular para verificar que la ubicación tenga entre 2 y 25 caracteres y puede incluir letras, números y espacios
    var regex = /^[a-zA-Z0-9\s]{2,25}$/;

    if (!regex.test(ubi)) {
        $scope.ubiProInvalido = true;
    } else {
        $scope.ubiProInvalido = false;
    }
};




$scope.tipoNoSeleccionado = true;

$scope.validarTipo = function() {
    $scope.tipoNoSeleccionado = !$scope.nuevaPropiedad.TIPO_PROPIEDAD_PER;
};



$scope.estadoNoSeleccionado = true;

$scope.validarEstado = function() {
    $scope.estadoNoSeleccionado = !$scope.nuevaPropiedad.ESTADO;
};






$scope.habitacionInvalido = false;

$scope.validarHabitacion = function() {
  var habitacion = $scope.caracteristica.HABITACIONES;

  // Expresión regular para verificar que la habitación tenga uno o dos dígitos
  var regex = /^\d{1,2}$/;

  if (!regex.test(habitacion)) {
      $scope.habitacionInvalido = true;
  } else {
      $scope.habitacionInvalido = false;
  }
};



$scope.cocinaInvalido = false;

$scope.validarCocina = function() {
  var cocina = $scope.caracteristica.COCINA;

  // Expresión regular para verificar que la habitación tenga uno o dos dígitos
  var regex = /^\d{1,2}$/;

  if (!regex.test(cocina)) {
      $scope.cocinaInvalido = true;
  } else {
      $scope.cocinaInvalido = false;
  }
};




$scope.banoInvalido = false;

$scope.validarBano = function() {
  var bano = $scope.caracteristica.BANO;

  // Expresión regular para verificar que la habitación tenga uno o dos dígitos
  var regex = /^\d{1,2}$/;

  if (!regex.test(bano)) {
      $scope.banoInvalido = true;
  } else {
      $scope.banoInvalido = false;
  }
};





$scope.metrajeInvalido = false;

$scope.validarMetraje = function() {
  var metraje = $scope.caracteristica.METRAJE;

  // Expresión regular para verificar que el metraje tenga uno a cuatro dígitos, opcionalmente seguido de un punto y hasta dos dígitos decimales
  var regex = /^\d{1,4}(\.\d{1,2})?$/;

  if (!regex.test(metraje)) {
      $scope.metrajeInvalido = true;
  } else {
      $scope.metrajeInvalido = false;
  }
};





  /* $scope.obtenerPropiedades(); */

});

