import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';

export function Luces(){
    const canvas = document.querySelector('#bg')
    
    const gui = new GUI({
        width: 300,
        name: "Tweeks"
    })
    
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    window.addEventListener('resize', () => {
        sizes.width =  window.innerWidth
        sizes.height =  window.innerHeight
        camera.aspect = sizes.width/sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width,sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)
    })

    const scene = new THREE.Scene();
    
    const material = new THREE.MeshStandardMaterial()
    material.roughness = 0.4
    gui.add(material, 'roughness').min(0).max(5).step(0.1);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(.5,32,32),material)
    const cube = new THREE.Mesh(new THREE.BoxGeometry(.75,.75,.75),material);
    const torus = new THREE.Mesh(new THREE.TorusGeometry(.3,.2,32,64),material);
    const plane =  new THREE.Mesh(new THREE.PlaneGeometry(5,5),material);

    plane.rotation.set((Math.PI * 1.5),0,0)
    sphere.position.set(-1.5,1,0);
    torus.position.set(1.5,1,0);
    cube.position.set(0,1,0)
    scene.add(sphere,cube,torus,plane)

    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
    camera.position.set(1,1,4);
    scene.add(camera);

    //Lights
    const ambientLight = new THREE.AmbientLight()
    gui.addColor(ambientLight, 'color');
    gui.add(ambientLight, 'intensity',0 , 1, .001)
    // scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9)
    gui.addColor(directionalLight, 'color')
    gui.add(directionalLight, 'intensity',0 , 10, .001)
    directionalLight.position.set(1,0.25,0)
    // scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
    gui.addColor(hemisphereLight, 'color')
    gui.addColor(hemisphereLight, 'groundColor')
    gui.add(hemisphereLight, 'intensity',0,10,.001)
    scene.add(hemisphereLight);


    const renderer = new THREE.WebGLRenderer({ canvas:canvas })
    renderer.setSize(sizes.width,sizes.height)
    
    const controls = new OrbitControls(camera,canvas)
    controls.enableDamping = true;

    const clock = new THREE.Clock()

    function animate(){
        const elapsedTime = clock.getElapsedTime();
        sphere.rotation.y = 0.1 * elapsedTime
        cube.rotation.y = 0.1 * elapsedTime
        torus.rotation.y = 0.1 * elapsedTime
    
        sphere.rotation.x = 0.15 * elapsedTime
        cube.rotation.x = 0.15 * elapsedTime
        torus.rotation.x = 0.15 * elapsedTime

        controls.update();
        renderer.render(scene,camera)
        requestAnimationFrame(animate)
    }
    animate();
}