const API_URL_EMPLEADOS = '/empleados';
const API_URL_DEPARTAMENTOS = '/departamentos';

// Elementos del DOM
const tablaEmpleados = document.getElementById('tablaEmpleados');
const nuevoEmpleado = document.getElementById('nuevoEmpleado');
const formModificarEmpleado = document.getElementById('modificarEmpleado');
const selectDepartamento = document.getElementById('id_departamento'); // El select donde se llenarán los departamentos


// Es la funcion para sacar la lista de los departamentos en los empleados
function obtenerDepartamentos() {
  fetch(API_URL_DEPARTAMENTOS)  // Hacer una solicitud GET para obtener los departamentos
    .then(response => response.json()) // Convertir la respuesta en JSON
    .then(departamentos => {
      selectDepartamento.innerHTML = '<option value="">Seleccione un departamento</option>'; // Limpiar el select

      departamentos.forEach(departamento => {
        // Crear una nueva opción para el select
        const option = document.createElement('option');
        option.value = departamento.id_departamento; // Asignamos el ID de departamento
        option.textContent = departamento.nombre;   // Asignamos el nombre del departamento
        selectDepartamento.appendChild(option);     // Añadimos la opción al select
      });
    })
    .catch(error => {
      console.error('Error al obtener los departamentos:', error);
    });
}

// Cargar la lista de empleados
function cargarEmpleados() {
  fetch(API_URL_EMPLEADOS)
    .then(response => response.json())
    .then(empleados => {
      tablaEmpleados.innerHTML = '';
      empleados.forEach(empleado => { 
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${empleado.id_empleado}</td>
          <td>${empleado.nombre}</td>
          <td>${empleado.dni}</td>
          <td>${empleado.id_departamento}</td>
          <td>${empleado.telefono || ''}</td>
          <td>${empleado.email || ''}</td>
          <td>
            <button onclick="eliminarEmpleado(${empleado.id_empleado})"class="btn btn-danger">Eliminar</button>
            <button onclick="modificarEmpleado(${empleado.id_empleado})"class="btn btn-warning">Modificar</button>
          </td>
        `;
        tablaEmpleados.appendChild(row);
      });
    });
}

// Esta la es la funcion del boton de eliminar de departamento
function eliminarEmpleado(idEmpleado) {
  fetch(`${API_URL_EMPLEADOS}/${idEmpleado}`, { method: 'DELETE' })
    .then(() => {
      cargarEmpleados();
    });
}

// Esta la es la funcion del boton de modificar de empleados
function modificarEmpleado(idEmpleado) {
  location.href = `modificar_empleado.html?id=${idEmpleado}`;
}

// Crea un nuevo departamento
function crearEmpleado(nuevoEmpleado) {
  fetch(API_URL_EMPLEADOS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoEmpleado)
  })
    .then(() => {
      location.href = 'empleados.html';
    });
}

// Carga los datos de un empleado para modificarlo
function cargarDatosEmpleado() {
  const idEmpleado = new URLSearchParams(window.location.search).get('id');
  fetch(`${API_URL_EMPLEADOS}/${idEmpleado}`)
    .then(response => response.json())
    .then(empleado => {
      // Rellenar los campos del formulario con los datos del empleado
      document.getElementById('nombre').value = empleado.nombre;
      document.getElementById('dni').value = empleado.dni;
      document.getElementById('id_departamento').value = empleado.id_departamento;
      document.getElementById('telefono').value = empleado.telefono || '';
      document.getElementById('email').value = empleado.email || '';
    });
}

// Guardar los cambios realizados del empleado
function guardarCambiosEmpleado() {
  const idEmpleado = new URLSearchParams(window.location.search).get('id');
  const empleadoModificado = {
    nombre: document.getElementById('nombre').value,
    dni: document.getElementById('dni').value,
    id_departamento: document.getElementById('id_departamento').value,
    telefono: document.getElementById('telefono').value,
    email: document.getElementById('email').value
  };

  fetch(`${API_URL_EMPLEADOS}/${idEmpleado}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(empleadoModificado)
  })
    .then(() => {
      location.href = 'empleados.html'; // Volver a la página principal
    });
}

// Envia el formulario cuando se le da al boton
if (nuevoEmpleado) {
  nuevoEmpleado.onsubmit = function (event) {
    event.preventDefault();

    const nuevoEmpleado = {
      nombre: document.getElementById('nombre').value,
      dni: document.getElementById('dni').value,
      id_departamento: document.getElementById('id_departamento').value,
      telefono: document.getElementById('telefono').value,
      email: document.getElementById('email').value
    };

    crearEmpleado(nuevoEmpleado);
  };
}

// Si le damos al boton modificar
if (formModificarEmpleado) {
  window.onload = cargarDatosEmpleado; // Cargar datos al iniciar la página

  formModificarEmpleado.onsubmit = function (event) {
    event.preventDefault();
    guardarCambiosEmpleado(); // Guardar cambios al enviar el formulario
  };
}

// Cargar los empleados y departamentos cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  cargarEmpleados();    // Cargar la lista de empleados
  obtenerDepartamentos();  // Cargar los departamentos en el formulario

  // Si estamos en la página de modificar empleado, cargar los datos del empleado
  if (window.location.pathname.includes('modificar_empleado.html')) {
    cargarDatosEmpleado();
  }
});

// Carga los departamentos todo el rato
if (tablaEmpleados) {
  cargarEmpleados();
}
