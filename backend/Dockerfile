FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json desde la raiz
COPY package*.json ./

RUN npm install

# Copio solo el back
COPY backend ./backend 

# Instala wait-port para esperar a la bd este lista
RUN npm install -g wait-port

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app/backend

EXPOSE 3000

# Espera a que el servicio bd esté listo y luego ejecuta el backend
#CMD wait-port db:3306 && npm start
CMD ["sh", "-c", "wait-port db:3306 && npm run start-prod"]
