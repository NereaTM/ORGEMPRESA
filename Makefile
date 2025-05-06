# DOCKER COMPOSE GLOBAL
# Lanza DB + backend + frontend + Prometheus + Grafana
start-env:
	docker-compose -f docker/docker-compose.yaml up -d --build

# Detener entorno
stop-env:
	docker-compose -f docker/docker-compose.yaml down

# Reiniciar entorno
reset-env:
	make stop-env
	make start-env

#  Acceso al contenedor del backend (terminal) exit para salir
test-dk:
	docker exec -it orgempresa_backend sh


# DOCKER COMPOSE INTEGRACION
# Levantar solamente la base de datos 
start-env-dev:
	docker-compose -f docker/docker-compose.dev.yaml up -d
	npx wait-on tcp:3306

# Detener solo la base de datos del entorno de desarrollo
stop-env-dev:
	docker-compose -f docker/docker-compose.dev.yaml down

# test integracion en bd levanta+lanza+baja
testdb-integration:
	make start-env-dev
	npm run integration-test
	make stop-env-dev

# TESTS
# Todos los tests 
all-test:
	npm test

# Ejecuta solo los tests de integración con entorno de prueba
test-integration:
	npm run integration-test

# Ejecuta solo los tests unitarios
test-unit:
	npm run unit-test

# Ejecuta unitarios y luego integración
test:
	make test-unit
	make test-integration

# PHONY (evita conflictos con archivos reales)
.PHONY: \
	start-env stop-env reset-env test-dk \
	start-env-dev stop-env-dev stop-env-dev-clean \
	test-integration test-unit test all-test