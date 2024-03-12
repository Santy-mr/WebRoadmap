import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export function DText(){
    const canvas = document.querySelector('#bg');

    const scene = new THREE.Scene() 

    const gui = new GUI({
        width: 300,
        name: 'Tweeks',
    });
    gui.hide();

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize',() =>{
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.aspect = sizes.width/sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width,sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)
    })

    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
    matcapTexture.colorSpace = THREE.SRGBColorSpace

    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker_regular.typeface.json',(font) => {
        const textGeometry = new TextGeometry(
            'El Wilbert se la come',{
                font: font,
                size:0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        );
        textGeometry.center();

        const Material = new THREE.MeshNormalMaterial({ flatShading:true })

        const text = new THREE.Mesh(textGeometry,Material)
        scene.add(text);

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

        for (let i = 0; i < 300; i++) {
            const donut = new THREE.Mesh(donutGeometry,Material)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale,scale,scale);

            scene.add(donut)
        }
    })

    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
    camera.position.set(0,0,5);
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ canvas:canvas })
    renderer.setSize(sizes.width,sizes.height)

    const controls = new OrbitControls(camera,canvas);
    controls.enableDamping = true
    controls.enableZoom = false;
    controls.enablePan = false;

    function animate(){
        requestAnimationFrame(animate)
        controls.update();
        renderer.render(scene,camera)
    }
    animate();
}