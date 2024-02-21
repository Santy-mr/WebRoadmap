import '../styles/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:"white"});
const material2 = new THREE.MeshBasicMaterial({color:"red"});
const mesh = new THREE.Mesh(geometry, material);
const cube = new THREE.Mesh(geometry, material2);

scene.add(cube)
scene.add(mesh);

const aspect ={
    width:window.innerWidth,
    height:window.innerHeight
};

const camera = new THREE.PerspectiveCamera(120,aspect.width/aspect.height);
mesh.rotation.y= 2;
mesh.rotation.z= 3;

camera.position.z = 2;
/* camera.position.y=.2; 
camera.position.x=0;  */

cube.position.y=2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
document.body.appendChild( renderer.domElement );
renderer.domElement.classList.add("draw")
renderer.setSize(aspect.width,aspect.height);
renderer.render(scene,camera);
const controls = new OrbitControls( camera, renderer.domElement );
/* camera.position.set( 0, 20, 100 ); */
controls.update();

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

animate();