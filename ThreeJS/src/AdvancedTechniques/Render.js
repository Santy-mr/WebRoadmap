import GUI from 'lil-gui'
import * as THREE from 'three'
import { DRACOLoader, GLTFLoader, OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js'

export function Render(){
    const canvas = document.querySelector('#bg')

    const gui = new GUI()

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    })

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(4, 5, 4)
    scene.add(camera)

    const textureLoader = new THREE.TextureLoader()
    const castlecolorTexture = textureLoader.load('/textures/castle/color.webp')
    const castlearmTexture = textureLoader.load('/textures/castle/arm.webp')
    const castlenormalTexture = textureLoader.load('/textures/castle/normal.webp')

    castlecolorTexture.colorSpace = THREE.SRGBColorSpace

    const woodcolorTexture = textureLoader.load('/textures/wood/color.webp')
    const woodarmTexture = textureLoader.load('/textures/wood/arm.webp')
    const woodnormalTexture = textureLoader.load('/textures/wood/normal.webp')

    woodcolorTexture.colorSpace = THREE.SRGBColorSpace

    const gltfLoader = new GLTFLoader()
    // gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
    //     const model = gltf.scene
    //     model.scale.setScalar(10)
    //     scene.add(model)

    //     const children = [...gltf.scene.children]
    //     for (const child of children){
    //         child.receiveShadow = true
    //         child.castShadow = true
    //     }

    // })

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load('/models/Hamburguer.glb', (gltf) => {
        const model = gltf.scene
        model.scale.setScalar(0.4)
        model.position.y = 2.5
        scene.add(model)

        const children = [...gltf.scene.children]
        for (const child of children){
            child.receiveShadow = true
            child.castShadow = true
        }
    })

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8),
        new THREE.MeshStandardMaterial({
            map: woodcolorTexture,
            aoMap: woodarmTexture,
            roughnessMap: woodarmTexture,
            metalnessMap: woodarmTexture,
            normalMap: woodnormalTexture,
        })
    )
    floor.receiveShadow = true
    floor.rotation.x = -Math.PI / 2
    scene.add(floor)

    const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(8,8),
        new THREE.MeshStandardMaterial({
            map: castlecolorTexture,
            aoMap: castlearmTexture,
            roughnessMap: castlearmTexture,
            metalnessMap: castlearmTexture,
            normalMap: castlenormalTexture
        })
    )
    wall.receiveShadow = true
    wall.position.y =  4
    wall.position.z =  -4
    scene.add(wall)
    
    const rgbeLoader = new RGBELoader()
    const environmentMap = rgbeLoader.load('/textures/environmentMaps/0/2k.hdr', () => {        
        environmentMap.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = environmentMap
        scene.background = environmentMap
    })

    const envMap = gui.addFolder('EnvirontmentMap')
    envMap.close();
    envMap.add(scene, 'environmentIntensity', 0, 10, 0.001).name('envMap Intensity')

    //Lights
    const directionalLight = new THREE.DirectionalLight('#ffffff', 6)
    directionalLight.position.set(-4, 6.5, 2.5) 
    scene.add(directionalLight)

    const lightFolder = gui.addFolder('Directional Light')
    lightFolder.close();
    lightFolder.add(directionalLight, 'intensity', 0, 10, 0.001).name('Light intensity')
    lightFolder.add(directionalLight.position, 'x', -10, 10, 0.001).name('LightX')
    lightFolder.add(directionalLight.position, 'y', -10, 10, 0.001).name('LightY')
    lightFolder.add(directionalLight.position, 'z', -10, 10, 0.001).name('LightZ')
    lightFolder.add(directionalLight, 'castShadow')
    
    //Shadows
    directionalLight.castShadow = true
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.mapSize.set(512, 512)

    //Bias
    directionalLight.shadow.normalBias = 0.027 
    directionalLight.shadow.bias = - 0.004
    lightFolder.add(directionalLight.shadow, 'normalBias', -0.05, 0.05, 0.001)
    lightFolder.add(directionalLight.shadow, 'bias', -0.05, 0.05, 0.001)

    //Helper
    // const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    // scene.add(directionalLightHelper)

    directionalLight.target.position.set(0, 4, 0)
    directionalLight.target.updateWorldMatrix();

    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias:true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    //Tone Mapping
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 2

    gui.add(renderer, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
    })

    gui.add(renderer, 'toneMappingExposure', 0, 10, 0.001)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.target.y = 3

    const clock = new THREE.Clock()

    function animate(){
        const elapsedTime = clock.getElapsedTime()

        renderer.render(scene, camera)

        controls.update()

        requestAnimationFrame(animate)
    }
    animate();
}