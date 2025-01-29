import * as THREE from 'three'
import GUI from "lil-gui"
import { DRACOLoader, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'

export function CustomModels(){
    const canvas = document.querySelector('#bg')
    const gui = new GUI({
        width:300,
        name:'Tweeks'
    })

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth,
        sizes.height = window.innerHeight,
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(devicePixelRatio), 2)
    })

    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load(
        '/models/Hamburguer.glb', 
        (gltf) => {
            const model = gltf.scene
            model.scale.setScalar(0.5)
            scene.add(model)
        }
)

    const scene = new THREE.Scene();

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10,10),
        new THREE.MeshStandardMaterial({
            color: '#444444',
            roughness: 0.5,
            metalness: 0
        })
    )
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI / 2;
    scene.add(floor)

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 2, 5);
    scene.add(camera)

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.camera.left = - 7
    directionalLight.shadow.camera.top = 7
    directionalLight.shadow.camera.right = 7
    directionalLight.shadow.camera.bottom = - 7
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(devicePixelRatio), 2)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    const clock = new THREE.Clock()

    function animate(){
        const elapsedTime = clock.getElapsedTime();

        renderer.render(scene, camera)
        
        controls.update();

        window.requestAnimationFrame(animate)
    }
    animate();
}