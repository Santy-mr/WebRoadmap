import '../../styles/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function HelpersRotation() {


  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  renderer.render(scene, camera);

  const geometry = new THREE.TorusGeometry(10, 3, 16, 1000)
  const material = new THREE.MeshStandardMaterial({ color: "blue" });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  const pointLight = new THREE.PointLight(0xffffff, 90)
  pointLight.position.set(2, 5, 3);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  /* 
  const lightHelper = new THREE.PointLightHelper(pointLight)
  scene.add(lightHelper); */

  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper)


  const controls = new OrbitControls(camera, renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}
