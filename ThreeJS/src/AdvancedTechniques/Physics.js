import * as THREE from 'three'
import GUI from 'lil-gui'
import '../style.css'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import CANNON from 'cannon';

export function Physics(){
    const canvas = document.querySelector('#bg')
    const scene = new THREE.Scene();
    const gui = new GUI({
        width: 300,
        name: 'Tweeks'
    })

    const debugObject = {}

    debugObject.createSphere = () =>{
        createSphere(Math.random() * 0.5,
        {
            x: (Math.random() * 0.5) * 3,
            y:3,
            z: (Math.random() * 0.5) * 3
        })
    }
    gui.add(debugObject, 'createSphere')

    debugObject.createBox = () => {
        createBox(
            Math.random(),
            Math.random(),
            Math.random(),
            {
                x: (Math.random() * 0.5) * 3,
                y: 3,
                z: (Math.random() * 0.5) * 3
            }
        )
    }
    gui.add(debugObject, 'createBox')

    debugObject.reset = () => {
        for (const object of objectToUpdate){
            //Remove Body
            object.body.removeEventListener('collide', playHitSound)
            world.removeBody(object.body)

            //Remove Mesh
            scene.remove(object.mesh)

            //Clean Array 
            objectToUpdate.splice(0, objectToUpdate.length)
        }
    }
    gui.add(debugObject, 'reset')

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () =>{
        sizes.width = window.innerWidth,
        sizes.height = window.innerHeight
        camera.aspect = sizes.width/sizes.height
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)
    })

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const enviromentMapTexture = cubeTextureLoader.load([
        '/textures/environmentMap/0/px.webp',
        '/textures/environmentMap/0/nx.webp',
        '/textures/environmentMap/0/py.webp',
        '/textures/environmentMap/0/ny.webp',
        '/textures/environmentMap/0/pz.webp',
        '/textures/environmentMap/0/nz.webp'
    ])

    const hitSound = new Audio('/sounds/hit.mp3')
    const playHitSound = (collision) =>{
        const impactStrength = collision.contact.getImpactVelocityAlongNormal()
        if(impactStrength > 1.5){
            hitSound.volume = Math.random();
            hitSound.currentTime = 0
            hitSound.play();
        }
    }

    //Physics Cannon
    const canonFolder = gui.addFolder('Cannon')
    canonFolder.close();

    //World
    const world = new CANNON.World();
    world.broadphase = new CANNON.SAPBroadphase(world)
    world.allowSleep = true;
    world.gravity.set(0, -9.82, 0)

    //Materials
    const defaultMaterial = new CANNON.Material('default')

    const defaultContactMaterial = new CANNON.ContactMaterial(
        defaultMaterial,
        defaultMaterial,
        {
            friction: 0.1,
            restitution: 0.7
        }
    )
    world.addContactMaterial(defaultContactMaterial)
    world.defaultContactMaterial = defaultContactMaterial
    canonFolder.add(defaultContactMaterial, 'friction', -1, 1, 0.1)
    canonFolder.add(defaultContactMaterial, 'restitution', -1, 1, 0.1)

    //Bodies
    // const sphereShape = new CANNON.Sphere(0.5)
    //     mass: 1,
    //     position: new CANNON.Vec3(0, 3, 0),
    //     shape: sphereShape,
    // })
    // sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))
    // world.addBody(sphereBody)

    const floorShape = new CANNON.Plane()
    const floorBody = new CANNON.Body() 
    floorBody.mass = 0 //default value
    floorBody.addShape(floorShape)
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0),  Math.PI * 0.5)
    world.addBody(floorBody)

    //Three JS
    const axesHelper = new THREE.AxesHelper( 3 );
    scene.add(axesHelper)


    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10,10),
        new THREE.MeshStandardMaterial({
            color: '#777777',
            metalness: 0.3,
            roughness: 0.4,
        })
    )
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI * 0.5;
    scene.add(floor)

    // const sphere = new THREE.Mesh(
    //     new THREE.SphereGeometry(0.5, 32, 32),
    //     new THREE.MeshStandardMaterial({
    //         roughness: 0.3,
    //         metalness: 0.4,
    //     })
    // )
    // sphere.castShadow = true
    // sphere.position.set(0, 0.5, 0)
    // scene.add(sphere)

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(1024,1024)
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.camera.left = -7
    directionalLight.shadow.camera.top = 7
    directionalLight.shadow.camera.right = 7
    directionalLight.shadow.camera.bottom = -7
    directionalLight.position.set(5,5,5)
    scene.add(directionalLight)

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(-2,5,6);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(sizes.width, sizes.height)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    //Utils
    const objectToUpdate = []

    //Sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
    const sphereMaterial =  new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: enviromentMapTexture
    })

    //Box
    const boxGeometry = new THREE.BoxGeometry(1,1,1)
    const boxMaterial = new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: enviromentMapTexture
    })

    const createBox = (width, height, depth, position) => 
    {
        const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
        mesh.castShadow = true
        mesh.scale.set(width, height, depth)
        mesh.position.copy(position)
        scene.add(mesh)

        const boxShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
        const body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(3, 2, 0,),
            shape: boxShape,
            material:defaultMaterial
        })
        body.position.copy(position)
        body.addEventListener('collide', playHitSound)
        world.addBody(body)

        objectToUpdate.push({
            mesh,
            body
        })
    }

    const createSphere = (radius, position) =>
    {
        //Three Js
        const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
        mesh.castShadow = true;
        mesh.scale.setScalar(radius)
        mesh.position.copy(position)
        scene.add(mesh)

        //Cannon Js
        const shape = new CANNON.Sphere(radius)
        const body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 3, 0),
            shape: shape,
            material: defaultMaterial
        })
        body.position.copy(position)
        body.addEventListener('collide', playHitSound)
        world.addBody(body)

        //Save into Array
        objectToUpdate.push({
            mesh,
            body
        })
    }

    createSphere(0.5, { x: 0, y: 3, z: 0 })

    const clock = new THREE.Clock();
    let oldElapsedTime = 0

    function animate(){
        //CANNON JS
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - oldElapsedTime
        oldElapsedTime = elapsedTime

        // sphereBody.applyForce(new CANNON.Vec3(- 0.5, 0, 0), sphereBody.position)
    
        world.step(1/ 60, deltaTime, 3)

        for(const object of objectToUpdate){
            object.mesh.position.copy(object.body.position)
            object.mesh.quaternion.copy(object.body.quaternion)
        }

        // sphere.position.copy(sphereBody.position)

        //THREE JS
        controls.update();
        renderer.render(scene,camera)
        requestAnimationFrame(animate)
    }
    animate();
}