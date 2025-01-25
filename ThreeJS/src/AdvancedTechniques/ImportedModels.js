import * as THREE from 'three'
import GUI from 'lil-gui'
import { DRACOLoader, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'

export function ImportedModels(){
    const canvas = document.querySelector('#bg')

    const scene = new THREE.Scene();

    const gtlfLoader = new GLTFLoader()

    //Default Version

    let mixer = null

    gtlfLoader.load(
        '/models/Fox/glTF/Fox.gltf',
        (gltf) => {
            /*const children = [...gltf.scene.children]
            for (const child of children){
                 scene.add(child)
            }*/

            mixer = new THREE.AnimationMixer(gltf.scene)
            const action = mixer.clipAction(gltf.animations[2])

            action.play();

            gltf.scene.scale.setScalar(0.025)
            scene.add(gltf.scene)
        }
    )
    
    //Draco Compression Version
    
    /*const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/')

    gtlfLoader.setDRACOLoader(dracoLoader)

    gtlfLoader.load(
        '/models/Duck/glTF-Draco/Duck.gltf',
        (gltf) => {
           scene.add(gltf.scene)
        }
    )*/

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
        sizes.height = window.innerHeight
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width,sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    })

    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
    camera.position.set(2, 2, 2)
    scene.add(camera)

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10,10),
        new THREE.MeshStandardMaterial({
            color: '#444444',
            metalness: 0,
            roughness: 0.5
        })
    )
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI / 2
    scene.add(floor)

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(1024,1024)
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.camera.left = -7
    directionalLight.shadow.camera.top = 7
    directionalLight.shadow.camera.right = 7
    directionalLight.shadow.camera.bottom = -7
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const renderer = new THREE.WebGLRenderer({ canvas:canvas })
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 0.75, 0)
    controls.enableDamping = true

    const clock = new THREE.Clock();
    let previousTime = 0

    function animate(){
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime

        //Update Mixer
        if(mixer !== null){ 
            mixer.update(deltaTime);
        }

        controls.update();

        renderer.render(scene,camera)

        requestAnimationFrame(animate)
    }
    animate();
}