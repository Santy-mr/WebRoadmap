import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function Cameras(){
    const cursor ={
        x:0,
        y:0
    }

    window.addEventListener('mousemove', (e) =>{
        cursor.x = (e.clientX / sizes.width - 0.5)
        cursor.y = -(e.clientY / sizes.height - 0.5)
    })

    const canvas = document.querySelector("#bg");

    const scene = new THREE.Scene();

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1,5,5,5),
        new THREE.MeshBasicMaterial({ color: 0x0000ff})
    )
    scene.add(mesh);

    const sizes = {
        width: 1200,
        height: 800
    }

    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100); 

/*     const aspectRatio =  sizes.width/sizes.height;
    console.log(aspectRatio);
    const camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio,1 ,-1 ,0.1 ,100 ); */

    camera.position.set(0,0,2);
    camera.lookAt(mesh.position);
    scene.add(camera);
    const controls = new OrbitControls(camera,canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
/*     controls.target.y = 1;
    controls.update(); */

    const renderer = new THREE.WebGLRenderer({
        canvas:canvas
    })

    renderer.setSize(sizes.width, sizes.height)
    
    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime();

/*         mesh.rotation.y = elapsedTime; 

        camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
        camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
        camera.position.y = cursor.y * 5;
        camera.lookAt(mesh.position) */

        controls.update(); 
        renderer.render(scene,camera)
        requestAnimationFrame(animate)
    }

    animate();
}