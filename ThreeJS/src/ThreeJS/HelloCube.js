import '../../styles/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function HelloCube() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("skyblue");
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg')
    });

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    scene.add(camera);

    camera.position.z = 5;
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: "white" });
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh);


    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

