const API_URL_USUARIOS = '/usuarios';

// Elementos del DOM
const usuariosTableBody = document.getElementById('usuarios-table-body');
const formNuevoUsuario = document.getElementById('form-nuevo-usuario');

// Crear un nuevo usuario
function crearUsuario(nuevoUsuario) {
  fetch(API_URL_USUARIOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoUsuario)
  })
    .then(() => {
      location.href = 'usuarios.html';  
    });
}

// Envio del formulario de nuevo usuario
if (formNuevoUsuario) {
  formNuevoUsuario.onsubmit = function (event) {
    event.preventDefault();

    const nuevoUsuario = {
      usuario: document.getElementById('usuario').value,
      contraseña: document.getElementById('contraseña').value,
    };

    crearUsuario(nuevoUsuario);  
  };
}


