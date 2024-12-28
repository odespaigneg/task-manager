## task-manager

## Aplicación URL (Netlify)
https://task-manager-react-frontend.netlify.app/

## Api URL (Railway):
https://task-manager-production-ccae.up.railway.app/api/tasks/
 
## Api Swagger URL (Railway):
https://task-manager-production-ccae.up.railway.app/api-docs/

## Task Manager Application

Este es un proyecto de gestión de tareas que consta de un backend en Node.js y un frontend en React. Esta aplicación permite a los usuarios crear, editar, eliminar y visualizar tareas.

### Backend

El backend está construido con Node.js y Express, y utiliza MongoDB como base de datos.

#### Instalación

1. Navega a la carpeta del backend (task-manager-backend):

   ```bash
   cd task-manager-backend
   
2. Instala las dependencias necesarias:   
   ```bash
   npm install

3. Configura las variables de entorno. Crea un archivo .env en la carpeta root del backend y añade las siguientes variables:
   ```bash
   MONGO_URI=tu_uri_de_mongo
   PORT=5000

4. Para ejecutar el servidor, utiliza el siguiente comando:
   ```bash
   node server.js

El backend estará disponible en http://localhost:5001
Documentación de la API
La documentación de la API está disponible en http://localhost:5001/api-docs gracias a Swagger. Puedes utilizar esta interfaz para probar los endpoints de la API.

### Frontend
El frontend está construido con React y se encarga de la interfaz de usuario de la aplicación.

#### Instalación

1. Navega a la carpeta del frontend:
   ```bash
   cd task-manager-frontend

2. Instala las dependencias necesarias:
   ```bash
   npm install

3. Configura las variables de entorno. Crea un archivo .env en la carpeta root del frontend y añade las siguientes variables:
   ```bash
   REACT_APP_API_BASE_URL=uri_api

4. Para iniciar la aplicación React, utiliza el siguiente comando:
   ```bash
   npm start

El frontend estará disponible en http://localhost:3000.

Configuración de la API
Asegurese de que el frontend apunte a la URL correcta de la API.
