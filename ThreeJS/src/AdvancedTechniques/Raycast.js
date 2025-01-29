import GUI from 'lil-gui'
import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

export function Raycast(){
    const canvas = document.querySelector('#bg')

    const gui = new GUI({
        width:300,
        name:'Tweeks'
    });

    const global = {
        visibility: true
    } 

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth,
        sizes.height = window.innerHeight,
        camera.aspect = sizes.width/sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    })

    const gtlfLoader = new GLTFLoader()
    let model = null
    gtlfLoader.load(
        '/models/Duck/glTF-Binary/Duck.glb',
        (gltf) => {
            model = gltf.scene
            model.position.y = -1.2
            model.visible = false
            gui.add(model, 'visible').name('Show Duck')
            scene.add(model)
        }
    )

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
    camera.position.set(0, 0, 3);
    scene.add(camera)

    const object1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )
    object1.position.set(-2, 0, 0)

    const object2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )

    const object3 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )
    object3.position.set(2, 0, 0)

    const objectsToTest = [object1, object2, object3]

    gui.add(global, 'visibility').name('Show/Hide Spheres').onChange((value) => {
        objectsToTest.forEach((object) => {
            object.visible = value
        })
    })

    //Raycaster

    object1.updateMatrixWorld()
    object2.updateMatrixWorld()
    object3.updateMatrixWorld()

    const raycaster = new THREE.Raycaster();

    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX / sizes.width * 2 - 1
        mouse.y = - (e.clientY / sizes.height * 2 - 1)
    })

    window.addEventListener('click', (e) => {
        if(currentIntersect){
            switch(currentIntersect.object){
                case object1:
                    console.log('object 1')
                break
                
                case object2:
                    console.log('object 2')
                break
                
                case object3:
                    console.log('object 3')
                break
                
            }
        }
    })

    //Witness Event

    let currentIntersect = null

    scene.add(object1, object2, object3)

    const ambientLight = new THREE.AmbientLight('#ffffff', 0.9)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight('#ffffff', 2.1)
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight)

    const renderer = new THREE.WebGLRenderer({ canvas:canvas })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true;

    const clock = new THREE.Clock()

    function animate(){
        const elapsedTime = clock.getElapsedTime();

        object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
        object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
        object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5 

        //Cast Raycaster

        /*const rayOrigin = new THREE.Vector3(-3, 0, 0)
        const rayDestination = new THREE.Vector3(10, 0, 0)
        rayDestination.normalize();

        raycaster.set(rayOrigin, rayDestination)

        const objectsToTest = [object1, object2, object3]
        const intersects = raycaster.intersectObjects(objectsToTest)

        for(const object of objectsToTest){
            object.material.color.set('#ff0000')
        }

        for(const intersect of intersects){
            intersect.object.material.color.set('#0000ff')
        }*/

        raycaster.setFromCamera(mouse, camera)
        const objectsToTest = [object1, object2, object3]
        const intersects = raycaster.intersectObjects(objectsToTest)

        for(const object of objectsToTest){
            object.material.color.set('#ff0000')
        }

        for(const intersect of intersects){
            intersect.object.material.color.set('#0000ff')
        }

        if(intersects.length){
            if(!currentIntersect){
                console.log('mouse enter')
            }
            currentIntersect = intersects[0]
        }
        else{
            if(currentIntersect){
                console.log('mouse leave')
            }
            currentIntersect = null
        }

        //Intersect with Models
        if(model){
            const modelInstersects = raycaster.intersectObject(model)
            if (modelInstersects.length){
                model.scale.setScalar(1.2)
            }   
            else{
                model.scale.setScalar(1)
            }
        }

        renderer.render(scene,camera)

        controls.update()

        window.requestAnimationFrame(animate)
    }
    animate();
}