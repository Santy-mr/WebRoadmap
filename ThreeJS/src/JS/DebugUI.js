import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';

export function DebugUI(){

    const gui = new GUI();
    const global = {

    } 

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

    global.color = '530080';

    const geometry = new THREE.BoxGeometry(1,1,1,2,2,2);
    const material = new THREE.MeshBasicMaterial({ color: global.color })
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    gui.add(mesh.position,`y`).min(-3).max(3).step(0.01).name('CubeY_pos')
    gui.addColor(global, 'color').name('Color').onChange(() => { material.color.set(global.color) });
    gui.add(mesh,'visible');
    gui.add(material, 'wireframe')
    
    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
    camera.position.set(0,0,2);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
        canvas:canvas
    })
    renderer.setSize(sizes.width,sizes.height);

    const controls = new OrbitControls(camera,canvas);
    controls.enableDamping = true;
    
    function animate(){
        controls.update();
        renderer.render(scene,camera);
        requestAnimationFrame(animate)
    }

    animate();
}