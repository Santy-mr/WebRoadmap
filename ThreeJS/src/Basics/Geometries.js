import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function Geometries(){
    const canvas = document.querySelector('#bg')

    const scene = new THREE.Scene();

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', (e) =>{
        sizes.width = window.innerWidth 
        sizes.height = window.innerHeight

        camera.aspect = sizes.width/sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width,sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })

    window.addEventListener('dblclick', (e) =>{
        const fullscreenElement = document.fullscreenElement
        if(!fullscreenElement){
            canvas.requestFullscreen();
        }
        else{
            document.exitFullscreen();
        }
    })

    const geometry = new THREE.BufferGeometry();
    const count = 50;
    const positionsArray = new Float32Array(count * 3 * 3)

    for (let i = 0; i < count * 3 * 3; i++) {
        positionsArray[i] = (Math.random() - 0.5) * 4;
    }

    const positionsAttribute = new THREE.BufferAttribute(positionsArray,3);
    geometry.setAttribute('position', positionsAttribute);

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true})
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
    camera.position.set(0,0,2);
    scene.add(camera)

    const controls = new OrbitControls(camera,canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width,sizes.height)

    function animate(){
        controls.update();
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }

    animate();
}