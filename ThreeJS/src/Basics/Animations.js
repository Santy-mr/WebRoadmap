import * as THREE from 'three';
import gsap from 'gsap'

export function Animations(){
    const scene = new THREE.Scene();
    
    const canvas = document.querySelector("#bg")

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    const sizes = {
        width: 800,
        height: 600
    }
    
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    scene.add(camera);
    camera.position.z = 3;
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(sizes.width, sizes.height);
    
    renderer.render(scene, camera);

/*     const clock = new THREE.Clock() */

    gsap.to(mesh.position, { duration: 1, delay: 1, x :2 })
    gsap.to(mesh.position, { duration: 1, delay: 2, x :0 })

    function animate() {
/*      const elapsedTime = clock.getElapsedTime();

        camera.position.y = Math.sin(elapsedTime);
        camera.position.x = Math.cos(elapsedTime);
        camera.lookAt(mesh.position) */
        window.requestAnimationFrame(animate)
        renderer.render(scene,camera);
    }
    
    animate();
}