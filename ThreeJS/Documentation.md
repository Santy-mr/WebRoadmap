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
