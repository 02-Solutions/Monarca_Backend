# 02 Solutions

_Innovación en Tecnologías de la Información para Soluciones Empresariales Avanzadas_

<img src="./Contenido%2002%20Solutions/logo.jpeg" alt="Logo de 02 Solutions" width="300" height="300"/>

---

## Introducción

Bienvenido al repositorio oficial de **02 Solutions**, una compañía especializada en el desarrollo de **soluciones avanzadas de tecnologías de la información**, dedicada a impulsar la transformación digital de las empresas a través de herramientas innovadoras, escalables y personalizables.

Este repositorio forma parte de **Proyecto Monarca**, una iniciativa estratégica diseñada para revolucionar la gestión de viajes empresariales mediante una plataforma integral, segura y altamente adaptable.

---

## Visión

**“Convertirnos en líderes globales en el desarrollo de soluciones tecnológicas innovadoras, flexibles y escalables, que impulsen la transformación digital y la eficiencia operativa de empresas en diversas industrias.”**

Esta visión guía nuestro crecimiento y nos motiva a innovar continuamente en la creación de herramientas tecnológicas que aporten valor real a nuestros clientes.

---

## Misión

**“Diseñar e implementar soluciones avanzadas de tecnologías de la información que optimicen procesos empresariales, fomenten la innovación y generen un impacto positivo y sostenible en las organizaciones.”**

Nuestra misión impulsa el desarrollo de plataformas personalizables y escalables, orientadas a resolver desafíos empresariales complejos a través de la tecnología.

---

## Valores

En **02 Solutions**, nuestros valores son el cimiento de cada decisión y desarrollo que llevamos a cabo:

1. **Innovación:** Buscamos soluciones disruptivas y creativas que resuelvan desafíos reales.
2. **Flexibilidad:** Nos adaptamos a las necesidades específicas de cada cliente, sin restricciones rígidas.
3. **Transparencia:** Fomentamos una comunicación clara y abierta, tanto interna como externamente.
4. **Colaboración:** Creemos en el trabajo en equipo como motor clave para lograr grandes resultados.
5. **Calidad:** Nos comprometemos a ofrecer productos y servicios con los más altos estándares.
6. **Seguridad:** Protegemos la información y los datos con protocolos sólidos y actualizados.
7. **Compromiso:** Trabajamos con dedicación y responsabilidad para alcanzar nuestros objetivos comunes.

---

## **Proyecto Monarca:** Sistema integral de gestión de viajes empresariales.

**¿Por qué "Monarca"?**  
El nombre hace referencia a las icónicas migraciones de las mariposas monarca, que recorren miles de kilómetros en un viaje complejo y perfectamente coordinado. Este paralelismo representa la esencia del proyecto: facilitar, optimizar y coordinar los viajes empresariales con la misma precisión y fluidez que las migraciones de estas mariposas.

**Monarca** refleja nuestro compromiso por crear soluciones que no solo optimicen procesos, sino que también brinden experiencias fluidas y eficientes para todos los usuarios involucrados.

Esta plataforma actuará como nuestro **"Single Repository of Truth"**, garantizando que toda la información oficial y decisiones relevantes estén centralizadas y accesibles para todos los miembros del equipo.

La gestión de viajes corporativos suele estar limitada por sistemas costosos, inflexibles y difíciles de personalizar. Nuestra misión con **Monarca** es cambiar esa narrativa, creando una solución tecnológica libre de estas barreras, capaz de adaptarse a las necesidades específicas de cada organización.

---

### Inciar el backend del proyecto:

    npm run start:dev

## Inicializar la Base de Datos con Docker y pgAdmin

### 1. Construir la imagen de Docker

Desde la terminal, navega al directorio `Monarca_Backend/DB` y ejecuta el siguiente comando:

`docker build -t monarca-v1 .`

Esto construirá una imagen de Docker llamada monarca-v1, la cual debería aparecer en la sección de Images en Docker Desktop.

### 2. Levantar los servicios con Docker Compose

Desde el root del proyecto Monarca_Backend, ejecuta:

    docker compose up

Esto iniciará los contenedores definidos en el archivo docker-compose.yaml y generará automáticamente una carpeta llamada postgres dentro de Monarca_Backend/BD, la cual contendrá los datos de la base de datos. 3. Configurar un servidor en pgAdmin

Abre pgAdmin y crea un nuevo servidor con las siguientes configuraciones:

    Nombre del servidor: MonarcaDB (puede ser cualquier nombre)

    Host name/address: localhost

    Puerto: 25000 (Verifica el puerto en compose.yaml si este no funciona)

    Usuario: postgres (por defecto, a menos que se indique lo contrario)

    Contraseña: test123 (Verifica el valor de POSTGRES_PASSWORD en compose.yaml si este no funciona)

### 3. Reinicializar la Base de Datos:

#### a. Elimina manualmente la carpeta postgres ubicada en Monarca_Backend/BD.

#### b. Desde el root de Monarca_Backend, ejecuta nuevamente:

    docker compose up

Esto recreará la base de datos desde cero, incluyendo una nueva carpeta postgres.

---

## Documentación de los endpoints con OpenAPI

La documentación de los endpoints está disponible en Swagger/OpenAPI.

Para acceder, simplemente visita la URL base donde corre el backend y añade `/api` al final. Por ejemplo:

http://localhost:3000/api

### Ejemplo de Endpoint: Crear Usuario:

```
// src/users/dto/create-user.dto.ts

/**
 * DTO para la creación de un nuevo usuario
 */

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'Correo electrónico del usuario' })
  email: string;

  @ApiProperty({ example: 'John', description: 'Nombre del usuario' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del usuario' })
  lastName: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  password: string;
}
```
