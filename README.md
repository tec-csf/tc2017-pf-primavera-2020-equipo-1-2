# *PF1. Algoritmos de Búsqueda y Ordenamiento*
---
#### Materia: *Análisis y Diseño de Algoritmos*

##### Integrantes:
1. *LUIS DANIEL ROA GONZÁLEZ* - *A01021960* - *Campus Santa Fe*
2. *KATIA YARETH BELLIDO LÓPEZ* - *A01023638* - *Campus Santa Fe*
3. *CONSTANZA GÓMEZ SÁNCHEZ* - *A01026717* - *Campus Santa Fe*
4. *CHRISTOPHER LUIS MIRANDA VANEGAS* - *A01022676* - *Campus Santa Fe*
5. *MIGUEL MONTERRUBIO BANDERA* - *A01022153* - *Campus Santa Fe*

---
## 1. Aspectos generales

Las orientaciones de la tarea se encuentran disponibles en la plataforma **Canvas**.

Este documento es una guía sobre qué información debe entregar como parte del proyecto, qué requerimientos técnicos debe cumplir y la estructura que debe seguir para organizar su entrega.

### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos del proyecto, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en el proyecto, sin embargo, debe tener presente que la solución final se deberá ejecutar en una de las siguientes plataformas en la nube: [Google Cloud Platform](https://cloud.google.com/?hl=es), [Amazon Web Services](https://aws.amazon.com/) o [Microsoft Azure](https://azure.microsoft.com/es-mx/).
* El proyecto deberá utilizar una interfaz Web.
* La arquitectura deberá estar separada claramente por capas (*frontend*, *backend*, *API RESTful*, datos y almacenamiento) según se necesite.
* Todo el código, *datasets* y la documentación del proyecto debe alojarse en este repositorio de GitHub. Favor de mantener la estructura de carpetas propuesta.

### 1.2 Estructura del repositorio

El proyecto debe seguir la siguiente estructura de carpetas, la cual generamos por usted:
```
- / 			        # Raíz de todo el proyecto
    - README.md			# Archivo con los datos del proyecto (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - backend			  # Carpeta con la solución del backend (CMS)
    - api			      # Carpeta con la solución de la API
    - datasets		  # Carpeta con los datasets y recursos utilizados (csv, json, audio, videos, entre otros)
    - dbs			      # Carpeta con los modelos, catálogos y scripts necesarios para generar las bases de datos
    - docs			    # Carpeta con la documentación del proyecto
```

### 1.3 Documentación  del proyecto

Como parte de la entrega final del proyecto, se debe incluir la siguiente información:

* Descripción del problema a resolver.
* Diagrama con la arquitectura de la solución.
* Descripción de cada uno de los componentes de la solución.
* Guía de configuración, instalación y despliegue de la solución en la plataforma en la nube seleccionada.
* Documentación de la API. Puede ver un ejemplo en [Swagger](https://swagger.io/). 
* El código debe estar documentado siguiendo los estándares definidos para el lenguaje de programación seleccionado.

## 2. Descripción del proyecto

Como proyecto final para la materia de *Análisis y diseño de algoritmos*, se nos solicitó hacer una aplicación web en la cual un usuario pudiera ver como funcionan diferentes algoritmos, tanto de ordenamiento como de búsqueda.

Este proyecto cuenta con dos carpetas principales, un _frontend_ y un _backend_. Cada uno de estos aloja los documentos necesarios para poder correr la solución.

Al establecer conexión entre estas dos carpetas, se está mandando a llamar desde el backend, pero esto será explicado en su sección específica.

El proyecto está siendo desplegado en un servicio llamado _Amazon EC2_, este actúa como una computadora con servicio en la nube. Para que los usuarios puedan tener acceso a la página, se habilitaron diferentes puertos (80, 423, 3000 y 4000) para ver cuál permitía una conexión a la página. Esto conllevo a que desplegara en el puerto _3000_ de este mismo.
Para acceder a la página, puede ingresar al siguiente link:

>ec2-18-191-33-21.us-east-2.compute.amazonaws.com:3000

- **NOTA**
    - **No sé si haga falta algo de la descripción que quieran completar**
    - **La página aun no se encuentra desplegada, pero será actualizado cuando se haya desplegado.**

## 3. Solución

A continuación aparecen descritos los diferentes elementos que forman parte de la solución del proyecto.

### 3.1 Arquitectura de la solución

*[Incluya aquí un diagrama donde se aprecie la arquitectura de la solución propuesta, así como la interacción entre los diferentes componentes de la misma.]*

*[Incluya una explicación del flujo de la información entre los diferentes componentes.]*

### 3.2 Descripción de los componentes

*[Incluya aquí una descripción detallada de cada uno de los componentes de la arquitectura así como una justificación de la selección de cada componente]*

Para poder llevar a cabo la solución al problema que se nos planteó, si implementaron diversas librerías de Node JS. Esas serán explicadas en la sección _3.4.3_, pero si es relevante explicar el uso que le dimos a _body-parser_ para mandar a llamar los datos desde el frontend.

La aplicación funciona utilizando operaciones del tipo **RESTful**, es decir con el uso de acciones de tipo *POST* y del tipo *GET*.
Las operaciones post fueron utilizadas para mandar a llamar datos que se están insertando en el HTML.

Por ejemplo, para que el usuario pueda insertar tanto los nombres de los algoritmos, como el valor numérico que se usará para generar los valores aleatorios, está utilizando una operación de tipo _post_. 
Estos datos están siendo leídos en el backend, especificamente en las secciónes que comienzan con el enunciado `app.post()`. Eso permite que, dependiendo de la acción programada en el HTML, se envíen a ese campo.

Para las operaciones de tipo _get_, se está haciendo algo distinto. Esta operación se está encargando del despliegue/visualización de los documentos HTML. En otras palabras, cuando se manda a llamar a otra página, como regresar al inicio de la aplicación web, esta tomando lugar en una operación de este tipo.
Para poder identificar estas secciones, se están mandando a llamar con el enunciado `app.get()`, esto permite cargar el documento especificado. Es importante recalcar, esos documentos se encuentran en la carpeta del _frontend_.

### 3.3 Frontend

*[Incluya aquí una explicación de la solución utilizada para el frontend del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.3.1 Lenguaje de programación
#### 3.3.2 Framework
#### 3.3.3 Librerías de funciones o dependencias

### 3.4 Backend

*[Incluya aquí una explicación de la solución utilizada para el backend del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.4.1 Lenguaje de programación
#### 3.4.2 Framework
#### 3.4.3 Librerías de funciones o dependencias

### 3.5 API

*[Incluya aquí una explicación de la solución utilizada para implementar la API del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.5.1 Lenguaje de programación
#### 3.5.2 Framework
#### 3.5.3 Librerías de funciones o dependencias

*[Incluya aquí una explicación de cada uno de los endpoints que forman parte de la API. Cada endpoint debe estar correctamente documentado.]*

*[Por cada endpoint debe incluir lo siguiente:]*

* **Descripción**:
* **URL**:
* **Verbos HTTP**:
* **Headers**:
* **Formato JSON del cuerpo de la solicitud**: 
* **Formato JSON de la respuesta**:


## 3.6 Pasos a seguir para utilizar el proyecto

*[Incluya aquí una guía paso a paso para poder utilizar el proyecto, desde la clonación de este repositorio hasta el despliegue de la solución en una plataforma en la nube.]*

## 4. Referencias

*[Incluya aquí las referencias a sitios de interés, datasets y cualquier otra información que haya utilizado para realizar el proyecto y que le puedan ser de utilidad a otras personas que quieran usarlo como referencia]*
