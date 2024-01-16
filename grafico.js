angular.module('miApp', [])
      .controller('EstadisticasUsuarios', function ($scope, $http) {
        $scope.propLabels = [];
        $scope.propData = [];
        $scope.clienteLabels = [];
        $scope.clienteData = [];

        // Nombres de los meses
        var meses = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        // Obtener datos de la API
        $http.get('https://www.webmoyapico.somee.com/api/USUARIOs')
          .then(function(response) {
            // Procesar datos para el gráfico de propietarios
            var propietariosPorMes = {};
            // Procesar datos para el gráfico de clientes
            var clientesPorMes = {};

            response.data.forEach(function(usuario) {
              var fechaRegistro = new Date(usuario.FECHA_REGISTRO_USUARIO);
              var mes = fechaRegistro.getMonth(); // Sin sumar 1 porque los meses en el array comienzan desde 0

              // Identificar si es propietario o cliente
              if (usuario.ID_ROL_PER === 1) {
                propietariosPorMes[mes] = (propietariosPorMes[mes] || 0) + 1;
              } else if (usuario.ID_ROL_PER === 2) {
                clientesPorMes[mes] = (clientesPorMes[mes] || 0) + 1;
              }
            });

            // Ordenar las etiquetas por mes para propietarios
            $scope.propLabels = Object.keys(propietariosPorMes).sort(function(a, b) {
              return a - b;
            });
            // Obtener los datos de registro de propietarios por mes
            $scope.propData = $scope.propLabels.map(function(mes) {
              return propietariosPorMes[mes];
            });

            // Ordenar las etiquetas por mes para clientes
            $scope.clienteLabels = Object.keys(clientesPorMes).sort(function(a, b) {
              return a - b;
            });
            // Obtener los datos de registro de clientes por mes
            $scope.clienteData = $scope.clienteLabels.map(function(mes) {
              return clientesPorMes[mes];
            });

            // Crear el gráfico de propietarios
            var propCtx = document.getElementById('propRegistroUsuariosChart').getContext('2d');
            var propRegistroUsuariosChart = new Chart(propCtx, {
              type: 'bar',
              data: {
                labels: $scope.propLabels.map(function(mes) {
                  return meses[mes];
                }),
                datasets: [{
                  label: 'Propietarios Registrados',
                  data: $scope.propData,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  x: {
                    type: 'category',
                    labels: $scope.propLabels.map(function(mes) {
                      return meses[mes];
                    }),
                    beginAtZero: true
                  },
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });

            // Crear el gráfico de clientes
            var clienteCtx = document.getElementById('clienteRegistroUsuariosChart').getContext('2d');
            var clienteRegistroUsuariosChart = new Chart(clienteCtx, {
              type: 'bar',
              data: {
                labels: $scope.clienteLabels.map(function(mes) {
                  return meses[mes];
                }),
                datasets: [{
                  label: 'Clientes Registrados',
                  data: $scope.clienteData,
                  backgroundColor: 'rgba(192, 75, 75, 0.2)',
                  borderColor: 'rgba(192, 75, 75, 1)',
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  x: {
                    type: 'category',
                    labels: $scope.clienteLabels.map(function(mes) {
                      return meses[mes];
                    }),
                    beginAtZero: true
                  },
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          })
          .catch(function(error) {
            console.error('Error al obtener los usuarios:', error);
          });
      });