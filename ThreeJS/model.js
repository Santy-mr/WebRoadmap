import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, Heart, target;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"), alpha:false
  }, undefined, function (error) {

    console.error(error);

  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(2);

  const loader = new GLTFLoader();
  loader.load("./Heart.glb", function (gltf) {
    const model = gltf.scene;
    scene.add(gltf.scene);
    Heart = model.getObjectByName('Eye');
  })

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);
  const controls = new OrbitControls(camera, renderer.domElement); 

  target = new THREE.Object3D();
  target.position.z = 2;

  const intersectionPoint = new THREE.Vector3();
  const planeNormal = new THREE.Vector3();
  const plane = new THREE.Plane();
  const mousePosition = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  window.addEventListener('mousemove', function (e) {
    mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mousePosition, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
    target.position.set(intersectionPoint.x, intersectionPoint.y, 2);
  });
/* 
  const pointLight = new THREE.PointLight("red",2)
  pointLight.position.set(0, 1, -1);
  scene.add(pointLight); */
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (Heart) {
    Heart.lookAt(target.position)
  }
}

function OnWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', OnWindowResize, false);

init();
animate();
