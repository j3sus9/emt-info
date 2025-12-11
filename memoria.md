# Memoria del Proyecto EMTInfo

**Asignatura:** Ingeniería Web  
**Curso:** 2025/26  
**Nombre del Alumno:** Jesús Repiso Rio

---

## 1. URL de Despliegue

La aplicación se encuentra desplegada y operativa en la nube, accesible a través de las siguientes direcciones:

*   **Frontend:** [https://emt-info-one.vercel.app/](https://emt-info-one.vercel.app/)
*   **Backend:** [https://emt-info-backend.onrender.com](https://emt-info-backend.onrender.com)

## 2. Tecnologías Utilizadas

El proyecto ha sido desarrollado utilizando el stack MERN y diversas librerías de apoyo:

*   **Frontend:**
    *   React (Framework de UI)
    *   Vite (Build tool y entorno de desarrollo)
    *   React Router (Enrutamiento SPA)
    *   Axios (Cliente HTTP)
    *   React-Leaflet (Mapas interactivos)
    *   @react-oauth/google (Autenticación con Google)
*   **Backend:**
    *   Node.js (Entorno de ejecución)
    *   Express (Framework web)
    *   Mongoose (ODM para MongoDB)
*   **Datos:**
    *   MongoDB (Base de datos NoSQL para persistencia de paradas y logs)
*   **Servicios Externos:**
    *   Google Identity Services (OAuth 2.0)
    *   Nominatim OpenStreetMap (Geocoding inverso y directo para direcciones)
*   **Infraestructura:**
    *   Vercel (Hosting del Frontend)
    *   Render (Hosting del Backend)

## 3. Instrucciones de Instalación y Despliegue

A continuación se detalla el proceso para desplegar la aplicación en un entorno local, simulando un entorno profesional.

### 3.1 Requisitos Previos
Es necesario tener instalado en el sistema:
*   Node.js (v14 o superior)
*   Git
*   Acceso a Internet (para descargar dependencias y conectar a MongoDB Atlas)

### 3.2 Instalación

1.  **Clonado del repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd emt-info
    ```

2.  **Instalación de dependencias:**
    Dado que las carpetas `node_modules` están excluidas del control de versiones (vía `.gitignore`), es imperativo instalar las dependencias en ambos directorios:

    ```bash
    # Instalar dependencias del Backend
    cd backend
    npm install

    # Instalar dependencias del Frontend
    cd ../frontend
    npm install
    ```

### 3.3 Configuración de Entorno (.env)

Por motivos de seguridad, los archivos de variables de entorno (`.env`) no se incluyen en el repositorio. Deben crearse manualmente en la raíz de cada subproyecto.

**Frontend (`frontend/.env`):**
Define la URL de la API. Cambiando `VITE_API_URL` se puede alternar entre el backend local y el de producción.

```env
VITE_CLOUDINARY_CLOUD_NAME=dolvo0vvq
VITE_CLOUDINARY_UPLOAD_PRESET=dolvo0vvq
# Para local: http://localhost:5000
# Para producción: https://emt-info-backend.onrender.com
VITE_API_URL=http://localhost:5000
```

**Backend (`backend/.env`):**
Contiene la cadena de conexión a la base de datos.

```env
MONGO_URI=[CREDENCIALES_PRIVADAS_OMITIDAS]
PORT=5000
```

### 3.4 Ejecución

Para ejecutar la aplicación en modo desarrollo, abrir dos terminales:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## 4. Credenciales de Verificación

*Las credenciales de acceso a la base de datos han sido omitidas en esta versión pública del documento por seguridad. Consultar la versión PDF entregada o el archivo .tex para ver los datos completos.*

## 5. Funcionalidad Implementada

Se han resuelto satisfactoriamente los siguientes puntos clave del enunciado:

*   **Mapa y Visualización:** Implementación de un mapa interactivo centrado en Málaga utilizando Leaflet, capaz de mostrar marcadores dinámicos.
*   **Filtrado por Línea y Sentido:** Formulario que permite al usuario seleccionar un número de línea y un sentido (1 o 2). La aplicación filtra las paradas correspondientes y actualiza el mapa.
*   **Búsqueda por Nombre:** Funcionalidad de búsqueda que permite encontrar paradas mediante coincidencia parcial de texto (regex) sobre el nombre de la parada.
*   **Búsqueda por Dirección (Geocoding):** Integración con la API de Nominatim. El usuario introduce una dirección postal (ej: "Salitre 30"), el sistema obtiene las coordenadas (latitud/longitud) y realiza una consulta al backend para encontrar paradas en un radio de proximidad menor a 0.003 unidades.
*   **Gestión de Sesión (OAuth):** Sistema de autenticación robusto mediante Google. El acceso al mapa y a los logs está restringido a usuarios autenticados. Se gestiona el token y la sesión del usuario.
*   **Sistema de Logs:**
    *   **Log de Accesos:** Se registra cada inicio de sesión exitoso, guardando timestamp, email del usuario, fecha de caducidad y token.
    *   **Log de Acciones/Filtrado:** Se registra permanentemente cada acción de búsqueda realizada por el usuario en el mapa, incluyendo el timestamp, el usuario y los detalles específicos de la consulta (parámetros de línea, nombre o coordenadas).

## 6. Diseño Responsivo

Para garantizar una experiencia de usuario óptima en dispositivos móviles y tabletas, se ha implementado un diseño responsivo utilizando CSS puro y Media Queries.

*   **Media Queries:** Se ha definido un punto de ruptura (breakpoint) principal en `768px`.
*   **Adaptación del Layout:**
    *   En pantallas grandes, la vista del mapa presenta un panel lateral de filtros a la izquierda y el mapa a la derecha.
    *   En dispositivos móviles, el contenedor principal cambia su dirección de flujo (`flex-direction: column`), colocando los filtros en la parte superior y el mapa debajo, ocupando el ancho completo.
*   **Navegación:** La barra de navegación se ajusta para mostrar los elementos de forma apilada o reducida, asegurando que los botones de "Logout" y "Logs" sean accesibles sin romper el diseño.
*   **Variables CSS:** Se han utilizado variables CSS para mantener la consistencia en los colores y espaciados, facilitando el mantenimiento y la adaptación del tema.

## 7. Problemas y Limitaciones

*   **Cold Start en Render:** El servicio de backend está alojado en el plan gratuito de Render. Esto puede ocasionar que la primera petición tras un periodo de inactividad tarde unos 50 segundos o más en responder, mientras el servidor "despierta".
*   **Límites de Nominatim:** La API de geocodificación de OpenStreetMap tiene límites de uso. Un exceso de peticiones en poco tiempo podría resultar en bloqueos temporales.
