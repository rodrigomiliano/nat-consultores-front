Sistema de Gestión de Tareas

Descripción del Proyecto

Este proyecto es una aplicación web full stack para la gestión de tareas, permitiendo a los usuarios administrar sus actividades diarias con funciones como creación, edición, eliminación y filtrado de tareas.

Tecnologías Utilizadas

Frontend:

- React.js 18+
- TypeScript
- Material-UI
- Context API para la gestión de estado

Backend:
- Java 8
- Spring Boot 2.5
- Spring Data JPA
- Spring Security 
- Swagger/OpenAPI para documentación de la API

Base de Datos:
- SQL Server 2012+

Características Principales
- CRUD de tareas
- Filtrado por estado, prioridad y categoría
- Ordenamiento por fecha y prioridad
- Búsqueda por título o descripción
- Paginación de resultados

Instrucciones de Instalación

Requisitos Previos
- Node.js y npm/yarn
- Java 8+
- SQL Server 2012+

Configuración del Backend

- Clonar el repositorio:
git clone https://github.com/rodrigomiliano/nat-consultores-back

- Navegar al directorio del backend:
cd backend

- Configurar la base de datos en application.properties:
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=NatConsultores
spring.datasource.username=nat_user
spring.datasource.password=nat123

- Los archivos de scripts de base de datos se encuentran en src/main/resources:
schema.sql (creacion de tabla)
data.sql (insert de datos)

- Ejecutar la aplicación:
mvn spring-boot:run

Configuración del Frontend

- Clonar el repositorio:
git clone https://github.com/rodrigomiliano/nat-consultores-front

- Navegar al directorio del frontend:
cd frontend

- Instalar dependencias:
npm install

- Iniciar la aplicación:
npm start

- Uso de la Aplicación
Acceder al frontend en http://localhost:3000
Interactuar con la interfaz para administrar tareas.
La API puede ser explorada a través de Swagger en http://localhost:8080/swagger-ui.html.


Decisiones Técnicas
Se eligió Material-UI por su facilidad de uso y diseño moderno.
Se utilizó Context API para la gestión de estado por su simplicidad en una aplicación de este alcance.

Mejoras Propuestas:
Login para ingreso de usuarios y creación de los mismos.
Agregar soporte para usuarios y roles.
Integración con un servicio de notificación por correo electrónico, puede ser para asignacion de tareas, modificacion de la misma, cuando la misma se completa.


Ejecución de Tests:
Tanto para el frontend como backend no se subieron, si bien se intentó realizar en ambas, las nuevas dependencias parecen romper el proyecto.
En front se intentó con React Testing Library, y en back con JUnit 5. Entiendo que la dificultad puede haber pasado por desconocimiento de cómo realizarlos.

El resto de lo solicitado está, ante cualquier consulta sobre el proyecto les pido me lo hagan saber.
Saludos cordiales.
