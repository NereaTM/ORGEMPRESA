document.getElementById('login-form').addEventListener('submit', async function (event) {
event.preventDefault(); // Evita que se recargue la página al enviar el formulario

// Obtener los valores de los campos del formulario
const usuario = document.getElementById('usuario').value;
const contraseña = document.getElementById('contraseña').value;

    try {
        // Enviar una solicitud POST al servidor
        const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contraseña }), // Convertir datos a JSON
        });

        // Manejar la respuesta del servidor
        const result = await response.json();

        if (response.ok) {
        alert(result.message); // Mostar mensaje inicio sesion 
        // Redirigir a empleados si funciono el inicio de sesion 
        window.location.href = 'empleados.html';
        } else {
        // Mostrar mensaje de error
        alert(result.message);
        }
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        alert('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
    }
});