import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function FullscreenResizer(){
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
        const fullscreenElement =document.fullscreenElement || document.webkitfullscreenElement
        if(!fullscreenElement){
            if(canvas.requestFullscreen){
                canvas.requestFullscreen();
            }
            else if(canvas.webkitfullscreenElement){
                canvas.webkitfullscreenElement();
            }
            canvas.requestFullscreen();
        }
        else{
            if(document.exitFullscreen){
                document.exitFullscreen();
            }
            else if(document.webkitexitFullscreen){
                document.webkitexitFullscreen();
            }
            document.exitFullscreen();
        }
    })

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
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