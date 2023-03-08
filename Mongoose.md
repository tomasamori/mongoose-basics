# Mongoose

Mongoose es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono. Mongoose incluye ciertas funcionalidades como conversión de tipos integrada, validación, creación de consultas y algunas otras, que enriquecen la funcionalidad de la base de datos.

La parte central del uso de Mongoose está en la definición de un esquema donde se indica la configuración de los documentos para una colección de MongoDB. Y aunque MongoDB es una base de datos NoSQL, donde los documentos se almacenan sin un esquema predefinido, el uso de un esquema permite normalizar la información sin sacrificar la flexibilidad. Además, hace que la transición de SQL a NoSQL sea más sencilla.

En el esquema previamente mencionado especificamos los campos que pertenecen a un documento, validaciones y configuraciones especiales para su consulta.

En pocas palabras, Mongoose funciona como una capa adicional sobre MongoDB a través de la cuál se implementan y automatizan muchas de las tareas habituales de trabajar con una base de datos.

Mongoose además, abre las puertas a una comunidad de plugins que se pueden utilizar para automatizar tareas comunes, tales como el encriptado de información.

## Introducción a MongoDB

Cuando nos referimos a la información que se almacena en una base de datos MongoDB podemos distinguir dos conceptos importantes: colecciones y documentos.

Lo más común es que dicha información tenga una estructura JSON, como por ejemplo, el siguiente documento `user`:

```json
{
    firstName: SpongeBob,
    lastName: SquarePants
}
```

Los documentos son los registros que almacenamos, estos pueden contener propiedades. Si comparamos con una base de datos SQL, estos documentos son similares a las filas que almacenamos en una tabla, ya que representan los registros guardados. Sin embargo, mientras que una tabla tiene una serie de columnas predefinidas, en un documento podemos guardar la información que necesitemos, sin una estructura definida.

Y así, mientras las filas se guardan en tablas, los documentos se guardan en colecciones. Las colecciones representan un grupo de documentos similares entre sí, de manera que si se guardan usuarios, la colección sería de usuarios y cada documento, un usuario distinto.

## ¿Qué es Mongoose?

Mongoose es un Object Document Mapper (ODM). Esto significa que permite definir objetos con un esquema fuertemente tipado que se asignan a documentos MongoDB.

Mongoose proporciona una increíble cantidad de funcionalidades para crear y trabajar con esquemas. Actualmente son once los SchemaTypes que puede guardarse una propiedad cuando se persiste en nuestra base de datos MongoDB. Estos son:

1. String
2. Number
3. Date
4. Buffer
5. Boolean
6. Mixed
7. ObjectId
8. Array
9. Decimal128
10. Map
11. Schema

Cada tipo de datos permite especificar:

* un valor predeterminado
* una función de validación personalizada
* indica que se requiere un campo
* una función get que le permite manipular los datos antes de que se devuelva como un objeto
* una función de conjunto que le permite manipular los datos antes de guardarlos en la base de datos
* crear índices para permitir que los datos se obtengan más rápido

Además de estas opciones comunes, ciertos tipos de datos le permiten personalizar aún más cómo se almacenan y recuperan los datos de la base de datos. Por ejemplo, un tipo de datos `String` también permite especificar las siguientes opciones adicionales:

* convertirlo a minúsculas
* convertirlo a mayúsculas
* recortar datos antes de guardar
* una expresión regular que puede limitar los datos que se pueden guardar durante el proceso de validación
* una enumeración que puede definir una lista de cadenas que son válidas

La mayoría de los tipos de datos permitidos deberían ser familiares. Sin embargo, hay varias excepciones que pueden surgir, como `Buffer` o `Mixed`.

El tipo de datos `Buffer` le permite guardar datos binarios. Un ejemplo común de datos binarios sería una imagen o un archivo codificado, como un documento PDF.

El tipo de datos `Mixed` convierte la propiedad en un campo “todo vale”. Sin embargo, hay que tener cuidado con el uso de este tipo de datos ya que pierde muchas de las excelentes funciones que ofrece Mongoose, como la validación de datos y la detección de cambios para saber automáticamente si desea actualizar la propiedad al guardar.

## Resumen rápido

Antes de continuar y comenzar a generar algún código, recapitulamos lo que acabamos de aprender. MongoDB es una base de datos que permite almacenar documentos con una estructura dinámica. Estos documentos se guardan dentro de una colección.

Mongoose es una biblioteca de JavaScript que permite definir esquemas con datos fuertemente tipados. Una vez que se define un esquema, Mongoose le permite crear un modelo basado en el mismo. Un modelo de Mongoose se asigna a un documento MongoDB a través de la definición del esquema del modelo.

Una vez definidos los esquemas y modelos, Mongoose tiene muchas funciones diferentes que permiten validar, guardar, eliminar y consultar sus datos utilizando las funciones comunes de MongoDB.

## Instalando MongoDB

Antes de que podamos comenzar a crear nuestros esquemas y modelos de Mongoose, debemos instalar y configurar MongoDB. Para esto, recomiendo visitar la documentación de MongoDB sobre cómo [instalar MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/).

## Instalando Node.js

Mongoose es un marco de JavaScript y será utilizado en una aplicación Node.js. Si ya tenemos Node.js instalado, podemos pasar al siguiente paso. Si no tenemos instalado Node.js, comencemos visitando la [página de descarga de Node.js](https://nodejs.org/es/download/) y seleccionando el instalador para nuestro sistema operativo.

## Manos a la obra

Con MongoDB y Node.js configurados y listos, vamos a crear una nueva aplicación y luego instalar el paquete Mongoose utilizando el gestor de paquetes npm.

Con un símbolo del sistema, consola o terminal podemos ejecutar los siguientes comandos para crear un directorio, movernos al mismo e inicializar nuestra aplicación Node.js.

```bash
mkdir mongoose-basics
cd mongoose-basics
npm init -y
```

A continuación, instalaremos el paquete de Mongoose de la siguiente manera:

```bash
npm install mongoose
```

Con todos los requisitos previos configurados, nos conectaremos a una base de datos MongoDB. Para esto, creamos una carpeta src en donde ubicaremos nuestro código y colocamos lo siguiente dentro de un archivo connection.js:

```javascript
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/mongoose-basics');
    console.log('Successfully connected');
}
```

En la primera línea de código requerimos la biblioteca `mongoose`. A continuación, abrimos una conexión a una base de datos a la que llamamos `mongoose-basics` utilizando la función asíncrona `main` que definimos en la parte inferior del archivo y que a su vez, ejecuta la función `connect` de Mongoose.

La `URI` que introducimos en la función `connect` acepta otras opciones donde podemos definir ciertas configuraciones como el nombre de usuario y la contraseña, si es necesario.

Si se produce un error al conectarse a la base de datos, se lanza la excepción y se detiene todo el procesamiento posterior. Cuando no ocurre ningún error, se envía un mensaje de éxito mediante la consola.

Para utilizar el código que acabamos de escribir, crearemos un archivo index.js (también ubicado en el directorio src) y le indicaremos que requiere nuestro archivo connection.js:

```javascript
require('./connection');
```

<!-- Nota: para ejecutar el código previamente mencionado debemos abrir la terminal de nuestro IDE y ejecutar la sentencia "node src/index.js" (esta regla aplica para cualquier archivo de código que queramos ejecutar con node) -->

Mongoose ahora está configurado y conectado a una base de datos llamada `mongoose-basics`. Nuestra conexión MongoDB no usa nombre de usuario, contraseña o puerto personalizado. En el caso de necesitar establecer estas configuraciones o cualquier otra opción durante la conexión, sugiero revisar la [documentación de Mongoose al conectarse](https://mongoosejs.com/docs/connections.html). La documentación proporciona explicaciones detalladas de las opciones disponibles.

Con una conexión exitosa, continuaremos definiendo un esquema de Mongoose.

## Definiendo un esquema de Mongoose

Durante la introducción a MongoDB, utilizamos un documento `user` que contenía dos propiedades: `firstName` y `lastName`. En el siguiente ejemplo, construiremos un esquema de Mongoose basándonos en el mismo.

```javascript
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String
});
```

Este es un esquema muy básico que solo contiene dos propiedades sin atributos asociados. Ampliemos este ejemplo convirtiendo las propiedades de `firstName` y `lastName` en campos secundarios de una propiedad `name`. La propiedad `name` comprenderá tanto el nombre como el apellido. También agregaremos un campo `created` que será de tipo `Date`.

```javascript
const userSchema = mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    },
    created: Date
});
```

Como se puede ver, Mongoose permite crear esquemas muy flexibles con muchas combinaciones posibles para organizar nuestros datos.

En este próximo ejemplo, crearemos dos nuevos esquemas y observaremos cómo crear una relación entre ellos: `author` y `book`. El esquema `book` contendrá una referencia al esquema `author`.

Comenzamos creando el siguiente archivo Author.js dentro de un nuevo directorio llamado models que ubicaremos en src.

```javascript
const { Schema, model } = require('mongoose');

const authorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String
    },
    biography: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    profilePicture: Buffer,
    created: {
        type: Date,
        default: Date.now
    }
});
```

Arriba está el esquema `author` que amplía los conceptos del esquema `user` creado en el ejemplo previo. Para vincular el Autor y el Libro, la primera propiedad del esquema `author` es una propiedad `_id` que es del tipo `ObjectId`. `_id` es la sintaxis más común para definir una clave primaria en Mongoose y MongoDB. Luego, al igual que en el esquema `user`, definimos una propiedad `name` que contiene el nombre y apellido del autor.

Ampliando el esquema `user`, `author` contiene algunos campos más de tipo `String`. También agregamos un campo de tipo `Buffer`que podría contener la imagen de perfil del autor. La propiedad final contiene la fecha de creación del documento, sin embargo, se puede observar que se crea de forma ligeramente diferente porque definimos el valor automáticamente mediante la función `Date.now`. Es decir, cuando un autor persiste en la base de datos, este campo se establecerá en la fecha y hora actual.

A continuación, crearemos un esquema `book` que contenga una referencia al autor utilizando el tipo `ObjectId`. Para esto, dentro del directorio models crearemos el siguiente archivo Book.js:

```javascript
const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    summary: String,
    isbn: String,
    thumbnail: Buffer,
    author: { 
    	type: Schema.Types.ObjectId, 
    	ref: 'Author' 
    },
    ratings: [
    	{
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: { 
                type: Date,
                default: Date.now
            }
    	}
    ],
    created: { 
    	type: Date,
    	default: Date.now
    }
});
```

El esquema `book` contiene varias propiedades de tipo `String`. Como mencionamos anteriormente, contiene una referencia al esquema `author`. Para demostrar aún más las potentes definiciones de esquema, el esquema `book` también contiene un `Array` de `ratings`. Cada calificación consta de un `summary`, `detail`, `numberOfStars` y una propiedad `created`.

Mongoose permite la flexibilidad de crear esquemas con referencias a otros esquemas o, como en el ejemplo anterior con la propiedad `ratings`, permite crear un `Array` de propiedades secundarias que podría estar contenida en un esquema relacionado (como libro a autor) o en línea como en el ejemplo anterior (con libro a un `Array` de calificaciones).

## Crear y guardar modelos de Mongoose

Como los esquemas `author` y `book` demuestran la flexibilidad del esquema de Mongoose, continuaremos usando esos esquemas y derivaremos un modelo `Author` y `Book` de ellos.

En sus respectivos archivos, colocamos el siguiente código al final de cada uno para exportar los modelos:

```javascript
module.exports = model('Author', authorSchema);
```

```javascript
module.exports = model('Book', bookSchema);
```

Un modelo de Mongoose, cuando se guarda, crea un documento en MongoDB con las propiedades definidas por el esquema del que se deriva.

Para demostrar la creación y el guardado de un objeto, en el próximo ejemplo crearemos varios objetos: un modelo de `Author` y varios modelos `Book`. Una vez creados, estos objetos se conservarán en MongoDB utilizando el método `save` del modelo.

En el archivo index.js introducimos el siguiente código:

```javascript
const mongoose = require('mongoose');
const Author = require('./models/Author');
const Book = require('./models/Book');

async function createAuthorAndBooks() {
    const newAuthor = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: 'Stephen',
            lastName: 'Hillenburg'
        },
        biography: 'Stephen McDannell Hillenburg (August 21, 1961 – November 26, 2018) was an American animator, writer, producer, director, and marine science educator.',
        twitter: 'https://twitter.com/stephenhillenburg',
        facebook: 'https://www.facebook.com/stephenhillenburg'
    });

    authorSaved = await newAuthor.save();
    console.log(authorSaved);
    console.log('Author successfully saved.');

    const firstBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: 'SpongeBob Comics: Book 1: Silly Sea Stories',
        author: newAuthor._id,
        ratings: [{
            summary: 'Good comic'
        }]
    });

    firstBookSaved = await firstBook.save();
    console.log(firstBookSaved);
    console.log('Book successfully saved.');

    const secondBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: 'SpongeBob Comics: Book 2: Aquatic Adventurers, Unite!',
        author: newAuthor._id
    });

    secondBookSaved = await secondBook.save();
    console.log(secondBookSaved);
    console.log('Book successfully saved.');
}

createAuthorAndBooks().catch(err => console.log(err));
```

En el ejemplo anterior comenzamos requiriendo mongoose y los modelos creados previamente. A continuación, definimos la función `createAuthorAndBooks` cuya funcionalidad es crear un `newAuthor` a partir del modelo `Author` y dos libros a partir del modelo `Book`. Dentro de la función también se guardan los tres objetos que fueron creados utilizando la función `save`. Si ocurre un error al ejecutar la función, la aplicación generará una excepción. De lo contrario se generan los mensajes de éxito correspondientes en la consola junto con cada uno de los documentos que se guardan.

Para crear la referencia al autor, los objetos libro hacen referencia a la clave primaria `_id` del esquema `author` en la propiedad `author` del esquema `book`.

## Validación de datos antes de guardar

Es bastante común que los datos a partir de los cuales se crea un modelo se llenen mediante un formulario en una página web. Debido a esto, es una buena idea validar estos datos antes de guardar el modelo en MongoDB.

En el siguiente ejemplo, actualizaremos el esquema de autor anterior para agregar una validación en el campo de `firstName`:

```javascript
const { Schema, model } = require('mongoose');

const authorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    biography: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    profilePicture: Buffer,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Author', authorSchema);
```

El campo `firstName` fue configurado con la propiedad `required` en `true`. Ahora cuando llamemos a la función `save` sin haber completado dicho campo, Mongoose devolverá un error con un mensaje que indica que se requiere  `firstName`.

Existen más formas de validar datos tal como validar que el dato sea único, entre otras que pueden ser consultadas en la [documentación oficial de Mongoose sobre validaciones](https://mongoosejs.com/docs/validation.html).

## Consultas a la base de datos

Una introducción a Mongoose no estaría completa sin los ejemplos básicos de buscar, actualizar y eliminar un documento. Mongoose nos proporciona varias funciones para realizar consultas a nuestra base de datos MongoDB, entre ellas:

* Model.deleteMany()
* Model.deleteOne()
* Model.find()
* Model.findById()
* Model.findByIdAndDelete()
* Model.findByIdAndRemove()
* Model.findByIdAndUpdate()
* Model.findOne()
* Model.findOneAndDelete()
* Model.findOneAndRemove()
* Model.findOneAndReplace()
* Model.findOneAndUpdate()
* Model.replaceOne()
* Model.updateMany()
* Model.updateOne()

Todos sus usos están perfectamente explicados en la [documentación oficial de Mongoose sobre consultas](https://mongoosejs.com/docs/queries.html), sin embargo, haremos unos ejemplos simples para comenzar a adentrarnos en el funcionamiento de Mongoose.

### Model.find()

En este próximo ejemplo veremos cómo encontrar todos los libros que contiene nuestra base de datos:

```javascript
async function getAllBooks() {
    const books = await Book.find();
    console.log(books);
}

getAllBooks();
```

### Model.findById()

A continuación, veremos un ejemplo de cómo encontrar un libro a partir del campo `_id` automáticamente asignado por MongoDB:

```javascript
async function getBookById() {
    const book = await Book.findById('64089e4577ad399602f9991a');
    console.log(book);
}

getBookById();
```

Probablemente el `_id` en tu caso sea diferente. Podés copiar este mismo de un `console.log` anterior a este ejemplo.

### Model.findByIdAndUpdate()

En el siguiente ejemplo, buscaremos uno de los libros por su `_id` y actualizaremos su campo `isbn`:

```javascript
async function updateBookById() {
    const updatedBook = await Book.findByIdAndUpdate('64089e4577ad399602f9991a', { isbn: '9781537963891' });
    console.log(updatedBook);
}

updateBookById();
```

###  Model.findByIdAndDelete()

Por último, veremos un ejemplo de cómo buscar un libro por su `_id` y eliminar el mismo:

```javascript
async function deleteBookById() {
    await Book.findByIdAndDelete('64089e4577ad399602f9991a');
    console.log('Book successfully deleted');
}

deleteBookById();
```

## Resumen

Después de leer este apunte deberías poder crear esquemas y modelos de Mongoose extremadamente flexibles, aplicar validación simple o compleja, crear, actualizar y eliminar documentos, y finalmente buscar los documentos que se crearon.

Si deseas profundizar aún más, te recomiendo que revises la [documentación oficial de Mongoose](https://mongoosejs.com/docs/guide.html).