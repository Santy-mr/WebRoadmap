# Basic Stuff THREEJS

> [!NOTE]
> Cualquier proyecto THREEJS necesita tener un canvas dentro del HTML donde se actuara 

### ESCENCIAL
Para que este sea visible en la pagina, en cualquier archivo de JS de nuestra preferencia necesitamos importar la libreria de **"THREE"**.

``` import * as THREE from 'three'; ```

Despues necesitamos una escena, una camara de la vista que queramos y aesta asignarle tres parametros **"Campo de Vista (FOV), Dimensiones del canvas, que tan cerca y lejos vera esta camara"**

``` const scene = new THREE.Scene();  ```

``` const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); ```

> [!NOTE]
> Los valores por defecto de lo lejos que vera la camara es 2000 y lo cerca es 0.1.

Despues se necesitara un renderer el cual se debera agregar al mismo canvas que creamos en el archivo HTML, y a este se le debera asignar cuandos pixeles queremos que tenga, asi como el tamaño que queramos que tenga este.

``` const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#ID de Canvas'), }); ```

``` renderer.setPixelRatio(window.devicePixelRatio); ```

Renderer tiene una funcion llamada render para esta le tenemos que pasar los objetos de la escena y la camara esta funcion nos permite capturar lo que en el momento que se ejecute el codigo es lo que capture la camara dentro de la escena

``` renderer.setPixelRatio(window.devicePixelRatio); ```

Si queremos que este se actualize constantemente para que actue como una animacion se debera usar una funcion llamada **"animate"** en la cual tambien tendra que tener el metodo **"render"** y despues tendremos que llamar el metodo fuera de la funcion para que se actualize

``` function animate() { requestAnimationFrame(animate); renderer.render(scene,camera); } animate(); ```

<br>

> [!NOTE]
> Se debe asignar la posicion que queramos que tenga la camara ya que por defecto aparecera en el centro de la pantalla.

<hr>

### Geometria

Para tener algun objeto dentro de la escena necesita tres elementos fundamentales **(Geometria,Material y una Malla)**. La Geometria constituye la forma que queremos que tenga la libreria de THREE nos incluye varias formas distintas que podemos usar con las cuales todas tienen diferentes parametros que podemos ajustar como: **"Altura, Anchura, Profunidad, Radio, Segmentos de cada uno de estos y mucho mas"**.

### Material
Existen muchos tipos de materiales el mas basico de estos se denomina como **"MeshStandard Material"** este no es afectado por la luz, a este le tendras que asignar un color puede ser Hexadecimal o a su vez escrito en comillas.

> [!TIP]
> Cuando escribimos antes de un color **"0x"** significa una denotacion para cuando estamos utilizando codigos hexadecimales 

### Malla
Este toma los parametros anteriores para asi dibujarlos en la escena que creamos para esto le debemos pasar las variables anteriores, despues de esto tenemos que agregar el objeto en la escena usando 

> [!NOTE]
> Estos objetos ya tienen valores definidos por la comunidad estos son **geometry** para los vertices o la figura deseada, **material** para cualquier tipo de material que queramos agregarle a nuestro y **mesh** para la malla .

``` const mesh = new THREE.Mesh( geometry, material ); ```


### Transformaciones 

## Posicion
Para mover un objeto dentro de la escena de ThreeJS tenemos que utilizar un metodo de ThreeJS el cual funciona con vectores, para mover un objeto de lugar podemos utiliar el metodo llamado **position** y podemos asignar el eje en el que queramos que se mueva este objeto y despues pasarle un numero que representaria las unidades que se esta moviendo

``` mesh.position.x = 5; ```

En ThreeJS el eje **X** se define como positivo derecha negativo izquierda, el eje **Y** como positivo arriba y negativo como abajo y por ultimo el eje **Z** se define como positivo mas cerca y negativo mas lejos

> [!NOTE]
> Estos parametros son relativos a la posicion de la camara y de la geometria seleccionada .

Tambien podemos conocer las posiciones exactas de nuestra malla respecto al origen del mundo esto lo conseguimos haciendo un **console.log** donde declaramos el nombre de la geometrica que hayamos seleccionado y utilizando un metodo llamado position.length() asi:

``` console.log(mesh.position.length()) ```

Igual podemos saber la distancia que existe entre dos objetos diferentes para esto ocuparemos un metodo llamado **distanceTo** el cual tomara como parametro un objeto o Vector3 y nos dire la distancia que hay entre nuestros dos objetos, asi:

``` console.log(mesh.position.distanceTo(camera.position)) ```

Para mover objetos tambien podemos utilizar otro metodo llamado **set** este la mayor diferencia que podemos encontrar con position es que abarca menos lineas de codigo asi como puedes modificar todos los valores de posicion del objeto en el mismo metodo.

``` mesh.position.set(X,Y,Z)```

> [!TIP]
> Si no comprendemos muy bien los ejes de posicion existe un objeto que nos ayuda a ver la orientacion de estos este se llama **AxesHelper** este te mostrara el sentido de los ejes representado como lineas de colores y le podemos pasar un parametro el cual es la longitud de estas lineas asi: ```const axesHelper = new THREE.AxesHelper(3);```

## Escala
Escala tambien es utilizado como un Vector3 entonces funciona de la misma manera que **position** solo que en este caso deformaremos las dimensiones de nuestro objeto para esto ocupamos un metodo llamado **scale** con este junto con los ejes podemos hacer crecer nuestro objeto en cualquier direccion asi:

``` mesh.scale.set(X,Y,Z)``` o ``` mesh.position.x = 5;```

## Rotacion
Hay dos formas de rotar objetos usando ThreeJs, Rotacion o Quaterniones al cambiar uno de estos automaticamente se actualizara el otro, funciona al igual que los anteriores con sus 3 ejes.


Para esto utilizamos la funcion de rotacion, asi:
``` mesh.rotation.x = Math.Pi * 0.25; ```

> [!NOTE]
> Pi equivale a una rotacion de 180 grados de un objeto

> [!TIP]
> Podemos imaginarnos un palo atravesando por el eje que queramos y la forma en la que deberia rotar seria en la que no afecte al palo imaginario. **Pero a la hora que cambiemos un eje de rotacion todos estos se veran afectados**

Para cuando estos casos pasen podemos usar un metodo llamado **reorder** este sirve para cambiar el orden en la que las rotaciones se van a hacer a nuestro objeto de este modo no se veran afectadas las rotacion cuando cambiemos un eje, asi:

``` mesh.rotation.reorder('YXZ') ```

## LookAt
Este es un metodo el cual nos ayuda a la camara para cuando queramos que este viendo hacia cierto objeto o podemos crear una cordenada apartir de un Vector3, de esta manera:

``` camera.LookAt(mesh.position) ```


## Groups
Una forma en la que podemos hacer mas eficiente el proceso de las matrices de transformacion es creando grupos y añadir los objetos que queramos a estos grupos y asi aplicarle todas las transformaciones que queramos a nuestros objetos simultaneamente, para esto primero tendremos que crear un grupo de esta forma:

``` const group = new THREE.Group(); ```

> [TIP]
> Tenemos que añadir este grupo a la escena para que esto funcione

Despues agregamos nuestros objetos al grupo

``` group.add(cube) ``` ``` group.add(cube2) ``` ``` group.add(cube3) ``` 

y una vez hecho esto tendremos acceso a las propiedades de cada uno de estos cubos atravez del grupo un ejemplo de como podemos manipular estos es de esta forma:

``` group.position.y = 1; ``` ``` group.scale.y = 2; ```
