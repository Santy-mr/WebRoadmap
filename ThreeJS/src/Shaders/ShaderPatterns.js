import * as THREE from 'three';
import { GUI } from 'lil-gui';
import VertexShader from './GLSL/patterns/vertex.glsl';
import FragmentShader from './GLSL/patterns/fragment.glsl'; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function ShaderPatterns() {
    const canvas = document.getElementById('bg');
    const gui = new GUI({
        width: 300,
        name: "Tweaks"
    });

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0.25, - 0.25, 2)
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const geometry = new THREE.PlaneGeometry(1,1,32,32);
    const material = new THREE.ShaderMaterial({
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
        side: THREE.DoubleSide
    }); 

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime();
        
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}