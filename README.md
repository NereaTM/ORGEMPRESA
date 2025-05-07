# Gestión de Empleados y Departamentos

Este proyecto es una aplicación web para la gestión de empleados y departamentos. Permite la creación, modificación y eliminación de departamentos y empleados, así como la asignación de empleados a departamentos. Además, tiene un sistema de autenticación para usuarios.

## Tecnologías Utilizadas

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - Fetch API para interactuar con el backend.
  - Bootstrap (opcional) para el diseño de la interfaz.

- **Backend** (asumido):
  - Node.js con Express para gestionar las rutas.
  - Base de datos para almacenar empleados, departamentos y usuarios.

## Estructura de Archivos

```bash
ORGEMPRESA/
  ├── Makefile
  ├── package.json
  ├── .dockerignore
  ├── backend/
  │   ├── config.local.yaml
  │   ├── config.prod.yaml
  │   ├── Dockerfile
  │   └── src/
  │       ├── config/
  │       ├── controller/
  │       ├── middleware/
  │       ├── route/
  │       ├── service/
  │       ├── test/
  │       │   ├── integration/
  │       │   └── unit/
  │       │       └── mocks/
  │       └── utils/
  ├── db/
  │   └── script.sql
  ├── docker/
  │   ├── docker-compose.dev.yaml
  │   ├── docker-compose.yaml
  │   └── prometheus/
  │       └── prometheus.yaml
  ├── frontend/
  │   ├── Dockerfile
  │   ├── nginx.conf
  │   └── src/
  └── .github/
      └── workflows/
          ├── ci.yaml
          └── sonar.yaml

```

## Instalación

1. **Clonar el repositorio**:
    ```bash
    https://github.com/NereaTM/ORGEMPRESA.git
    ```

2. **Instalar dependencias**:
    Si estás trabajando en el frontend, no hay dependencias, pero si tienes un servidor backend:
    ```bash
    cd  ORGEMPRESA
    npm install
    ```

3. **Ejecutar la aplicación**:
    Para iniciar el servidor backend:
    ```bash
    npm start
    ```

4. **Acceder a la aplicación**:
    Abre el navegador y visita `http://localhost:3000`.

## Contenedores

1. Lanzar docker-compose.yaml
    ```bash
    docker-compose -f docker/docker-compose.yaml up -d --build
    ```

2. Parar docker-compose.yaml
    ```bash
    docker-compose -f docker/docker-compose.yaml down
    ```

## Para el uso del Makefile
- Usar linux o instalar make con chocolatey




