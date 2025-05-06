const db = require('../../config/database');

before(async () => {
try {
    // Borra primero datos hijos
    await db.raw('DELETE FROM EMPLEADOS');
    await db.raw('DELETE FROM USUARIOS');
    await db.raw('DELETE FROM DEPARTAMENTOS');

    console.log('Base de datos limpiada');
    } catch (error) {
        console.error('Error al limpiar la base de datos:', error);
        throw error;
    }
});
