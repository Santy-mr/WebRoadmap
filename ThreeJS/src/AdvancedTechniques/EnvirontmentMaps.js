import GUI from 'lil-gui'
import * as THREE from 'three'
import { EXRLoader, GroundedSkybox, OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function EnvironmentMaps(){
    const canvas = document.querySelector('#bg')
    const gui = new GUI({
        width:300,
        name:'tweeks'
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
    
    const scene = new THREE.Scene()

    //Environtment Map
    // const cubeTextureLoader = new THREE.CubeTextureLoader()
    // const environmentMap = cubeTextureLoader.load([
    //     '/textures/environmentMaps/0/px.png',
    //     '/textures/environmentMaps/0/nx.png',
    //     '/textures/environmentMaps/0/py.png',
    //     '/textures/environmentMaps/0/ny.png',
    //     '/textures/environmentMaps/0/pz.png',
    //     '/textures/environmentMaps/0/nz.png',
    // ])

    // scene.environment = environmentMap
    // scene.background = environmentMap

    // scene.environmentIntensity = 1
    // scene.backgroundBlurriness = 0.2
    // scene.backgroundIntensity = 1
    // scene.backgroundRotation.x = 1
    // scene.environmentRotation.x = 1

    const sceneFolder = gui.addFolder('Scene')
    sceneFolder.close();
    sceneFolder.add(scene, 'environmentIntensity', 0, 10, 0.001)
    sceneFolder.add(scene, 'backgroundBlurriness', 0, 1, 0.001)
    sceneFolder.add(scene, 'backgroundIntensity', 0, 10, 0.001)
    sceneFolder.add(scene.backgroundRotation, 'y', 0, (Math.PI * 2), 0.001).name('backgroundRotation Y')
    sceneFolder.add(scene.environmentRotation, 'y', 0, (Math.PI * 2), 0.001).name('environmentRotation Y')

    //HDRI
    // const rgbeLoader = new RGBELoader()
    // rgbeLoader.load('/textures/environmentMaps/blender-2k.hdr', (environmentMap) => {
    //     environmentMap.mapping = THREE.EquirectangularReflectionMapping
    //     scene.background = environmentMap
    //     scene.environment = environmentMap
    // })

    //EXR
    // const exrLoader = new EXRLoader()
    // exrLoader.load('/textures/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) => {
    //     environmentMap.mapping = THREE.EquirectangularReflectionMapping
    //     scene.background = environmentMap
    //     scene.environment = environmentMap
    // })

    //LDR
    // const textureLoader = new THREE.TextureLoader()
    // const environmentMap = textureLoader.load('/textures/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
    // environmentMap.mapping = THREE.EquirectangularReflectionMapping
    // environmentMap.colorSpace = THREE.SRGBColorSpace
    // scene.background = environmentMap
    // scene.environment = environmentMap

    //Ground Projected Skybox
    // const rgbeLoader = new RGBELoader()
    // rgbeLoader.load('/textures/environmentMaps/2/2k.hdr', (environmentMap) => {
    //     environmentMap.mapping = THREE.EquirectangularReflectionMapping
    //     scene.environment = environmentMap

    // SkyBox
    //     const skybox = new GroundedSkybox(environmentMap, 15, 70)
    //     skybox.position.y = 15
    //     scene.add(skybox)
    // })

    //Real Time Environtment Map
    const textureLoader = new THREE.TextureLoader()
    const environmentMap = textureLoader.load('/textures/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    environmentMap.colorSpace = THREE.SRGBColorSpace
    scene.background = environmentMap

    const holyDonut = new THREE.Mesh(
        new THREE.TorusGeometry(8, 0.5),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
    )
    holyDonut.position.y = 3.5
    holyDonut.layers.enable(1)
    scene.add(holyDonut)

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, { type: THREE.HalfFloatType })
    scene.environment = cubeRenderTarget.texture

    const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
    cubeCamera.layers.set(1)

    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
        '/models/FlightHelmet/glTF/FlightHelmet.gltf', 
        (gltf) => {
            const model = gltf.scene
            model.scale.setScalar(10)
            scene.add(model)
        }
    )
    
    const torusKnot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
        new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 1,
            color: 0xaaaaaa,
        })
    )
    torusKnot.position.set(-4, 4, 0)
    scene.add(torusKnot)

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(4, 5, 4)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(devicePixelRatio), 2)

    const controls = new OrbitControls(camera, canvas)
    controls.target.y = 3.5
    controls.enableDamping = true;

    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime();

        if(holyDonut){
            holyDonut.rotation.x = Math.sin(elapsedTime) * 2
            holyDonut.rotation.y = Math.sin(elapsedTime) * 2
            cubeCamera.update(renderer, scene)
        }

        
        controls.update();

        renderer.render(scene, camera)

        requestAnimationFrame(animate)
    }
    animate();
}