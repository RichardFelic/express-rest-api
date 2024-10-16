# express-rest-api

## API de Prueba con Express.js

Esta es una API de prueba creada con **Express.js**. La API proporciona una serie de endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos de películas.

## Endpoints

La API tiene los siguientes endpoints:

- **GET /movies:** Devuelve una lista de todas las películas en la base de datos.
- **GET /movies?genre=\<género>:** Devuelve una lista de películas filtradas por género.
- **GET /movies/:id:** Devuelve la información de una película específica según su ID.
- **POST /movies:** Crea una nueva película en la base de datos.
- **PATCH /movies/:id:** Actualiza la información de una película específica según su ID.
- **DELETE /movies/:id:** Elimina una película específica según su ID.

## Uso

Para utilizar la API, simplemente debes realizar una solicitud HTTP al endpoint correspondiente. Por ejemplo, para obtener la lista de películas, puedes realizar una solicitud **GET** a `http://localhost:3000/movies`.

## Tecnologías utilizadas

- **Express.js**
- **Node.js**
- **JavaScript**

## Instalación

Para instalar la API, simplemente debes clonar el repositorio y ejecutar el comando `npm install` en la carpeta del proyecto.

## Ejecución

Para ejecutar la API, simplemente debes ejecutar el comando `npm start` en la carpeta del proyecto. La API estará disponible en `http://localhost:3000`.

## Notas

Esta es una API de prueba y **no debe ser utilizada en producción**. Es importante mencionar que la base de datos utilizada es un archivo JSON y no una base de datos real, por lo que no es persistente.