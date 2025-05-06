const API_URL_DEPARTAMENTOS = '/departamentos';

// Elementos del DOM
const tablaDepartamentos = document.getElementById('tablaDepartamentos');
const nuevoDepartamento = document.getElementById('nuevoDepartamento');
const formModificarDepartamento = document.getElementById('modificarDepartamento');

// Cargar la lista de departamentos
function cargarDepartamentos() {
  fetch(API_URL_DEPARTAMENTOS) //fetch(RECOGER) para acceder a la API
    .then(response => response.json()) //se transforma la respuesta de la API a JSON
    .then(departamentos => {
      tablaDepartamentos.innerHTML = ''; //borra la lista de departamentos para que no se duplique visualmente
      departamentos.forEach(departamento => { //recorremos los departamentos de 1 en 1
        const row = document.createElement('tr'); //creamos la fila en html TR
        row.innerHTML = `
          <td>${departamento.id_departamento}</td>
          <td>${departamento.nombre}</td>
          <td>${departamento.descripcion || ''}</td>
          <td>${departamento.imagen ? `<img src="${departamento.imagen}" alt="Imagen" width="50">` : ''}</td>
          <td>
            <button onclick="eliminarDepartamento(${departamento.id_departamento})"class="btn btn-danger">Eliminar</button>
            <button onclick="modificarDepartamento(${departamento.id_departamento})"class="btn btn-warning">Modificar</button>
          </td>
        `;
        tablaDepartamentos.appendChild(row); //se le envia la linea que toque
      });
    });
}

// Esta la es la funcion del boton de eliminar de departamentos
function eliminarDepartamento(idDepartamento) {
  fetch(`${API_URL_DEPARTAMENTOS}/${idDepartamento}`, { method: 'DELETE' }) //DELTE = metodo http
    .then(() => {
      cargarDepartamentos(); //recargamos la lista para reflejar los cambios
    });
}

// Esta la es la funcion del boton de modificar de departamentos
function modificarDepartamento(idDepartamento) {
  location.href = `modificar_departamentos.html?id=${idDepartamento}`;
}

// Crea un nuevo departamento
function crearDepartamento(nuevoDepartamento) {
  fetch(API_URL_DEPARTAMENTOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, //se especifica que es JSON
    body: JSON.stringify(nuevoDepartamento), //se transforman los datos a JSON
  })
    .then(() => {
      location.href = 'departamentos.html';
    });
}

// Cargar los datos de un departamento para modificarlo
function cargarDatosDepartamento() {
  const idDepartamento = new URLSearchParams(window.location.search).get('id'); //recogemos el id del departamento de la URL
  fetch(`${API_URL_DEPARTAMENTOS}/${idDepartamento}`)
    .then(response => response.json())
    .then(departamento => {
      // Rellenar los campos del formulario con los datos del departamento
      document.getElementById('nombre').value = departamento.nombre;
      document.getElementById('descripcion').value = departamento.descripcion || '';
      document.getElementById('imagen').value = departamento.imagen || '';
    });
}

// Guardar los cambios realizados del departamento
function guardarCambiosDepartamento() {
  const idDepartamento = new URLSearchParams(window.location.search).get('id');
  const departamentoModificado = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    imagen: document.getElementById('imagen').value
  };

  fetch(`${API_URL_DEPARTAMENTOS}/${idDepartamento}`, {
    method: 'PUT', //PUT = metodo HTTP
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(departamentoModificado)
  })
    .then(() => {
      location.href = 'departamentos.html';
    });
}

// Envia el formulario cuando se le da al boton
if (nuevoDepartamento) {
  nuevoDepartamento.onsubmit = function (event) {
    event.preventDefault();

    const nuevoDepartamento = {
      nombre: document.getElementById('nombre').value,
      descripcion: document.getElementById('descripcion').value,
      imagen: document.getElementById('imagen').value
    };

    crearDepartamento(nuevoDepartamento);
  };
}

// Si le damos al boton modificar
if (formModificarDepartamento) {
  window.onload = cargarDatosDepartamento; // Cargar datos al iniciar la página

  formModificarDepartamento.onsubmit = function (event) {
    event.preventDefault();
    guardarCambiosDepartamento(); // Guardar cambios al enviar el formulario
  };
}

// Carga los departamentos todo el rato
if (tablaDepartamentos) {
  cargarDepartamentos();
}
