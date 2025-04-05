# 🤝 Contribuciones

Gracias por contribuir a este proyecto.

## Normativas Generales
- Todo el código se debe de escribir en **inglés**.
- Todas las funciones deben de tener una descripción de qué hace antes de su declaración.
- Todos los archivos deben de tener una descripción del mismo en la parte superior, en el comentario debe estar la última fecha de edición y autores.
- Los archivos no deben de ser más extensos que 1000 líneas, en caso de exceder, dividir. 

---

## Convención de nombres

### Para el código

- **camelCase**
    - Variables 
        ```
        myVar, i
        ```
    - Objeto/JSON
        ```
        myObject, myJSON, appService
        ```
    - Funciones, métodos
        ```
        myFunction(), getOne(), Class.methodOne()
        ```
- **PascalCase**
    - Clases
        ```
        MyClass, AppService
        ```
    - Tipos
        ```
        MyType, Point
        ```
    - Interfaces
        ```
        MyInterface, Person
        ```
    - Decoradores
        ```
        @Decorador(), @Get()
        ```
- **ALLCAPS**
    - Variables Constantes
        ```
        COLORS, WIDTH
        ```
    - Variables .env
        ```
        process.env.CONSTANT, process.env.POSTGRES_USER
        ```

### Para capetas y achivos

- **snake_case**
- Nombres de los archivos deben de transmitir claramente de qué trata el archivo.

### Para base de datos

Nombres de tablas de bases de datos en plural, columnas en singular.
- **snake_case**
    - Columnas
        ```
        id, name, email,
        ```
    - Tablas
        ```
        approved_trips, user_roles, assistants, preferences
        ```
    - Databases
        ```
        users, trips, db
        ```
    - Schemas
        ```
        public
        ```
---


## 🧠 GitFlow

Seguimos el modelo [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/), con las siguientes ramas principales:

| Rama          | Propósito                           |
|---------------|-------------------------------------|
| `main`        | Código listo para producción        |
| `develop`     | Última versión estable en desarrollo |
| `feature/*`   | Nuevas funcionalidades              |
| `bugfix/*`    | Corrección de errores               |
| `hotfix/*`    | Correcciones urgentes en producción |
| `release/*`   | Preparación para una nueva versión  |

### 💡 Ejemplos:
- `feature/login-form`
- `bugfix/date-validation`
- `release/v1.0.0`

---

## 💬 Convención de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

**tipo**(área): mensaje

| Tipo      | ¿Para qué se usa?                                         |
| --------- | --------------------------------------------------------- |
| `feat`    |  Nuevas funcionalidades                                   |
| `fix`     |  Corrección de bugs                                       |
| `docs`    |  Cambios en documentación                                 |
| `style`   |  Cambios de formato (espacios, comas)                     |
| `refactor`|  Reestructuración de código sin cambiar funcionalidad     |
| `test`    |  Agregar o modificar pruebas                              |
| `chore`   |  Tareas de mantenimiento (builds, dependencias)           |

### 💡 Ejemplos:
- `feat(frontend): agregar pantalla de login`
- `fix(auth): corregir bug de token`

---

## ✅ Checklist para Pull Requests

- [ ] La rama parte desde `develop`
- [ ] La funcionalidad está probada y funciona
- [ ] El código sigue los estándares de formato y estilo
- [ ] El commit sigue la convención (`feat:`, `fix:`, etc.)
- [ ] Se ha actualizado la documentación (si aplica)