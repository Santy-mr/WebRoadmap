import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Sky } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';

export function HauntedHouse(){
    const canvas = document.querySelector('#bg')
    
    const gui = new GUI({
        width: 300,
        name: 'tweeks'
    })
    gui.hide();
    const scene = new THREE.Scene();

    const sizes={
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize',() =>{
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.aspect = sizes.width/sizes.height
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width,sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    })

    //#region DoorTextures
    const textureLoader = new THREE.TextureLoader();
    const doorcolorTexture = textureLoader.load('/textures/door/color.jpg');
    const dooralphaTexture = textureLoader.load('/textures/door/alpha.jpg');
    const doorheightTexture = textureLoader.load('/textures/door/height.jpg');
    const doornormalTexture = textureLoader.load('/textures/door/normal.jpg');
    const doorocclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
    const doormetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');    
    const doorroughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
    doorcolorTexture.colorSpace = THREE.SRGBColorSpace
    //#endregion

    //#region WallsTextures
    const brickscolorTexture =textureLoader.load('/textures/bricks/color.jpg');
    const bricksnormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
    const brickarmTexture = textureLoader.load('/textures/bricks/arm.jpg');
    brickscolorTexture.colorSpace = THREE.SRGBColorSpace

    brickscolorTexture.repeat.set(1,2)
    brickarmTexture.repeat.set(1,2)
    bricksnormalTexture.repeat.set(1,2)

    brickscolorTexture.wrapT = THREE.RepeatWrapping
    brickarmTexture.wrapT = THREE.RepeatWrapping
    bricksnormalTexture.wrapT = THREE.RepeatWrapping
    //#endregion

    //#region GrassTextures
    const grasscolorTexture = textureLoader.load('/textures/grass/color.jpg')  
    const grassarmTexture = textureLoader.load('/textures/grass/arm.jpg') 
    const grassnormalTexture = textureLoader.load('/textures/grass/normal.jpg')  
    const grassdisplacementTexture = textureLoader.load('/textures/grass/displacement.jpg')
    const grassalphaTexture = textureLoader.load('/textures/grass/alpha.jpg')
    grasscolorTexture.colorSpace = THREE.SRGBColorSpace

    grasscolorTexture.repeat.set(8,8)
    grassarmTexture.repeat.set(8,8)
    grassnormalTexture.repeat.set(8,8)
    grassdisplacementTexture.repeat.set(8,8)

    grasscolorTexture.wrapS = THREE.RepeatWrapping
    grassarmTexture.wrapS = THREE.RepeatWrapping
    grassnormalTexture.wrapS = THREE.RepeatWrapping
    grassdisplacementTexture.wrapS = THREE.RepeatWrapping

    grasscolorTexture.wrapT = THREE.RepeatWrapping
    grassarmTexture.wrapT = THREE.RepeatWrapping
    grassnormalTexture.wrapT = THREE.RepeatWrapping
    grassdisplacementTexture.wrapT = THREE.RepeatWrapping
    //#endregion

    //#region BushTextures
    const bushcolorTexture = textureLoader.load('/textures/bush/color.jpg')
    const busharmTexture = textureLoader.load('/textures/bush/arm.jpg')
    const bushnormalTexture = textureLoader.load('/textures/bush/normal.jpg')
    bushcolorTexture.colorSpace = THREE.SRGBColorSpace

    bushcolorTexture.repeat.set(2,1)
    busharmTexture.repeat.set(2,1)
    bushnormalTexture.repeat.set(2,1)

    bushcolorTexture.wrapS = THREE.RepeatWrapping
    busharmTexture.wrapS = THREE.RepeatWrapping
    bushnormalTexture.wrapS = THREE.RepeatWrapping
    
    //#endregion

    //#region GraveTextures
    const gravecolorTexture = textureLoader.load('/textures/stone/color.jpg')
    const gravearmTexture = textureLoader.load('/textures/stone/arm.jpg')
    const gravenormalTexture = textureLoader.load('/textures/stone/normal.jpg')
    gravecolorTexture.colorSpace = THREE.SRGBColorSpace

    gravecolorTexture.repeat.set(0.3, 0.4)
    gravearmTexture.repeat.set(0.3, 0.4)
    gravenormalTexture.repeat.set(0.3, 0.4)

    gravecolorTexture.wrapS = THREE.RepeatWrapping
    gravearmTexture.wrapS = THREE.RepeatWrapping
    gravenormalTexture.wrapS = THREE.RepeatWrapping 
    //#endregion
    
    //#region WindowTextures
    const windowemissionTexture = textureLoader.load('/textures/window/windowemissionTexture.jpg')
    //#endregion
    
    const House = new THREE.Group()
    House.position.z = +1;
    scene.add(House)

    //#region Walls Meshes
    const wallsGroup = new THREE.Group();
    scene.add(wallsGroup)

    const wallsMaterial = new THREE.MeshStandardMaterial({
        map:brickscolorTexture,
        normalMap:bricksnormalTexture,
        aoMap:brickarmTexture,
        roughnessMap:brickarmTexture,
        metalnessMap:brickarmTexture
    })


    const walls = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        wallsMaterial
    )
    walls.position.set(2, 2/2, 0);
    walls.position.x = 2;

    const walls2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 4, 1),
        wallsMaterial
    )
    walls2.position.set(2 + 1.5, 2, -1.5);

    const wall3 = new THREE.Mesh(
        new THREE.BoxGeometry(4,3,2),
        wallsMaterial
    )
    wall3.position.set(1, 1.5, -2)

    const walls4 = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 2.5, 1.5),
        wallsMaterial
    )
    walls4.position.set(-2.25, 2.5 / 2, -2)
    //#endregion

    //#region Pilar Meshes
    const pilarsGroup = new THREE.Group()
    scene.add(pilarsGroup);

    const pilar = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 2, 0.25),
        wallsMaterial
    )
    pilar.position.set(-3, 1, -0.5)
    
    const pilar2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 2, 0.25),
        wallsMaterial
    )
    pilar2.position.set(-1.5, 1, -0.5)
    //#endregion

    //#region Ceilings Meshes
    const ceilingsGroup = new THREE.Group();
    scene.add(ceilingsGroup);
    const ceilingMaterial = new THREE.MeshStandardMaterial({color: '#b35f45' })

    const ceiling = new THREE.Mesh(
        new THREE.ConeGeometry(1.75, 1, 4),
        ceilingMaterial
    )

    ceiling.rotation.y = Math.PI / 4
    ceiling.position.set(2, 2 + 0.5, 0);

    const ceiling2 = new THREE.Mesh(
        new THREE.ConeGeometry(1,2,4),
        ceilingMaterial
    )
    ceiling2.rotation.y = Math.PI / 4
    ceiling2.position.set(3.5, 5, -1.5)

    const ceiling3Geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array( [
         2.0,   1.5,   0.14, //v0
         2.0,   1.5,  -0.0, // v1
        -2.0,   1.5,  -0.0, //v2
        -2.0,   1.5,   0.14, //v3
        -2.0,  -1.5,  -0.0, //v4
        -2.0,  -1.5,   0.14, //v5
         2.0,  -1.5,  -0.0, //v6
         2.0,  -1.5,   0.14, //v7
         2.0,   1.5,  -0.0, //v8
         2.0,   1.5,   0.14, //v9
         //Sides

         1.14,  0.64,  1.0, //v10
        -1.14,  0.64,  1.0, //v11
        -1.14, -0.64,  1.0, //v12
         1.14, -0.64,  1.0, //v13

    ] );
    
    const indices = [
        0, 1, 2,
        0, 2, 3,
        3, 2, 4,
        3, 4, 5,
        5, 4, 6,
        5, 6, 7,
        7, 6, 8,
        7, 8, 9,
        //Sides

        10, 0, 3,
        10, 3, 11,
        11, 3, 12,
        12, 3, 5,
        12, 5, 7,
        12, 7, 13,
        13, 7, 0,
        13, 0, 10, 
        //Bevel

        13, 10, 11,
        13, 11, 12,
        //Roof

        1, 6, 4,
        1, 4, 2
        //Bottom

    ];

    ceiling3Geometry.setIndex( indices );
    ceiling3Geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    const ceiling3 = new THREE.Mesh(
        ceiling3Geometry,
        ceilingMaterial
    )

    ceiling3.rotation.x = -Math.PI / 2;
    ceiling3.position.set(1, 3, -2)

    const ceiling4 = new THREE.Mesh(
        new THREE.ConeGeometry(1.8, 1, 4),
        ceilingMaterial
    )
    ceiling4.position.set(-2.25, 3, -2)
    ceiling4.rotation.y = Math.PI / 4   

    const ceilingDoor = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.4, 1.5),
        ceilingMaterial
    ) 
    ceilingDoor.position.set(-2.25, 2.01, -0.5)
    //#endregion

    ceilingsGroup.add(ceiling,ceiling2,ceiling3,ceiling4)
    wallsGroup.add(walls,walls2,wall3,walls4)
    pilarsGroup.add(pilar,pilar2)

    House.add(wallsGroup, pilarsGroup, ceilingsGroup)

    const door = new THREE.Mesh(
        new THREE.PlaneGeometry(2,2, 80, 80),
        new THREE.MeshStandardMaterial({
            map: doorcolorTexture,
            transparent: true,
            alphaMap: dooralphaTexture,
            aoMap: doorocclusionTexture,
            displacementMap: doorheightTexture,
            displacementScale: 0.1,
            normalMap:doornormalTexture,
            metalnessMap:doormetalnessTexture,
            roughnessMap:doorroughnessTexture
        })
    )
    door.position.set(-2.25, 1, -1.25)

    //#region Window Meshes
    const windowMaterial =  new THREE.MeshStandardMaterial({
        color: '#fe902f',
        emissiveMap:windowemissionTexture,
        emissiveIntensity: 2,
        emissive: '#ff7d46'
    })

    const houseWindow = new THREE.Mesh(
        new THREE.PlaneGeometry(1,1),
        windowMaterial
    )
    houseWindow.position.set(2, 1, 1.01)

    const houseWindow2 = new THREE.Mesh(
        new THREE.PlaneGeometry(1,1),
        windowMaterial
    )
    houseWindow2.position.set(0, 1, -0.99)

    const houseWindow3 = new THREE.Mesh(
        new THREE.PlaneGeometry(1,1),
        windowMaterial
    )
    houseWindow3.position.set(0, 2.25, -0.99)

    const houseWindow4 = new THREE.Mesh(
        new THREE.CircleGeometry(0.3, 32),
        windowMaterial
    )
    houseWindow4.position.set(3.5, 2.5, -0.99)

    const houseWindow5 = new THREE.Mesh(
        new THREE.CircleGeometry(0.3, 32),
        windowMaterial
    )
    houseWindow5.position.set(3.5, 3.5, -0.99)

    House.add(door, ceilingDoor, houseWindow, houseWindow2, houseWindow3, houseWindow4, houseWindow5)
    //#endregion

    //#region BushGeometry
    const bushGeometry = new THREE.SphereGeometry(1,16,16)
    const bushMaterial = new THREE.MeshStandardMaterial({ 
        color: '#ccffcc',
        map: bushcolorTexture,
        aoMap: busharmTexture,
        roughnessMap:busharmTexture,
        metalnessMap:busharmTexture,
        normalMap:bushnormalTexture
    })

    const bush = new THREE.Mesh(bushGeometry,bushMaterial) 
    bush.scale.set(0.5, 0.5, 0.5)
    bush.position.set(0.4, 0.2, -0.4)
    bush.rotation.x = -70;
    
    const bush2 = new THREE.Mesh(bushGeometry,bushMaterial) 
    bush2.scale.set(0.25, 0.25, 0.25)
    bush2.position.set(0.7, 0.1, 0.25)
    bush2.rotation.x = -70;

    
    const bush3 = new THREE.Mesh(bushGeometry,bushMaterial) 
    bush3.scale.set(0.4, 0.4, 0.4)
    bush3.position.set(-3.5, 0.1, -0.75)
    bush3.rotation.x = -70;

    
    const bush4 = new THREE.Mesh(bushGeometry,bushMaterial) 
    bush4.scale.set(0.6, 0.6, 0.6)
    bush4.position.set(3.65, 0.25, -0.4)
    bush4.rotation.x = -45;
    //#endregion 
    House.add(bush,bush2,bush3,bush4)

    //#region Graves Meshes
    const gravesGroup = new THREE.Group();
    scene.add(gravesGroup)

    const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
    const graveMaterial = new THREE.MeshStandardMaterial({ 
        color: '#858585',
        map: gravecolorTexture,
        aoMap:gravearmTexture,
        roughnessMap:gravearmTexture,
        metalnessMap:gravearmTexture,
        normalMap:gravenormalTexture
    })

    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 5 + Math.random() * 3.5
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        const grave = new THREE.Mesh(graveGeometry,graveMaterial)
        grave.position.set(x, 0.3, z)
        
        grave.rotation.y = (Math.random() - 0.5) * 2
        grave.rotation.z = (Math.random() - 0.5) * 0.4
        gravesGroup.add(grave)
    }
    //#endregion

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20,20, 100, 100),
        new THREE.MeshStandardMaterial({
            map:grasscolorTexture,
            aoMap:grassarmTexture,
            roughnessMap:grassarmTexture,
            metalnessMap:grassarmTexture,
            normalMap:grassnormalTexture,
            displacementMap:grassdisplacementTexture,
            displacementScale:0.12,
            displacementBias:-0.05,
            alphaMap:grassalphaTexture,
            transparent:true
        })
    )
    const floorFolder = gui.addFolder('Floor')
    floorFolder.close();
    floorFolder.add( floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Floor displacement scale')
    floorFolder.add( floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Floor displacement scale')

    floor.rotation.x = - Math.PI / 2;
    scene.add(floor)

    //#region Lights
    const ambientLight = new THREE.AmbientLight('#475372', 1.4)
    const ambientLightFolder = gui.addFolder('Ambient Light')
    ambientLightFolder.close();
    ambientLightFolder.add(ambientLight, 'intensity', 0, 5, 0.001);
    scene.add(ambientLight)

    const directionalLightFolder = gui.addFolder('Directional Light')

    
    const directionalLight = new THREE.DirectionalLight('#86cdff', 0.25)
    directionalLight.position.set(0,1,-8)
    directionalLightFolder.close();
    directionalLightFolder.add(directionalLight, 'intensity', 0, 5, 0.001)
    directionalLightFolder.add(directionalLight.position, 'x', -15, 15, 1)
    directionalLightFolder.add(directionalLight.position, 'y', -15, 15, 1)
    directionalLightFolder.add(directionalLight.position, 'z', -15, 15, 1)

    scene.add(directionalLight)

    const doorLight = new THREE.PointLight('#ff7d46');
    const doorLightFolder = gui.addFolder('Door Light')
    doorLightFolder.close();
    doorLightFolder.add(doorLight, 'intensity', 0, 5, 0.001).setValue(3)
    doorLightFolder.add(doorLight, 'distance', 0, 10, 0.001).setValue(7)
    doorLight.position.set(-2.25, 1.6, -0.8)
    House.add(doorLight)
    //#endregion

    //#region Ghosts
    const ghost1 = new THREE.PointLight('#8800ff', 6, 3)
    const GhostsFolder = gui.addFolder('Ghosts')
    GhostsFolder.close();
    GhostsFolder.add(ghost1, 'intensity', 0 ,10 ,1)
    GhostsFolder.add(ghost1, 'distance', 0 ,5 ,0.001)

    const ghost2 = new THREE.PointLight('#ff0088', 6, 3)
    GhostsFolder.add(ghost2, 'intensity', 0 ,10 ,1)
    GhostsFolder.add(ghost2, 'distance', 0 ,5 ,0.001)

    const ghost3 = new THREE.PointLight('#ff0000', 6, 3)
    GhostsFolder.add(ghost3, 'intensity', 0 ,10 ,1)
    GhostsFolder.add(ghost3, 'distance', 0 ,5 ,0.001)
    scene.add(ghost1,ghost2,ghost3)
    //#endregion

    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
    camera.position.set(2.5,2,7)
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
        canvas:canvas
    })
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    //#region Fog
    const fog = new THREE.Fog('#02343f', 1, 12)
    gui.add(fog, 'near', 0, 8, 1)
    gui.add(fog, 'far', 0, 20, 1)
    scene.fog = fog
    //#endregion

    //#region Sky
    const sky = new Sky()
    sky.scale.setScalar(100)
    scene.add(sky)

    sky.material.uniforms['turbidity'].value = 10
    sky.material.uniforms['rayleigh'].value = 8
    sky.material.uniforms['mieCoefficient'].value = 0.1
    sky.material.uniforms['mieDirectionalG'].value = 0
    sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
    //#endregion

    //#region Shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    for(const grave of gravesGroup.children){
        grave.castShadow = true;
        grave.receiveShadow = true;
    }

    for(const walls of wallsGroup.children){
        walls.castShadow = true;
        walls.receiveShadow = true;
    }

    for(const ceilings of ceilingsGroup.children){
        ceilings.castShadow = true
    }

    for(const pilars of pilarsGroup.children){
        pilars.castShadow = true;
        pilars.receiveShadow=true
    }

    directionalLight.castShadow = true;
    ghost1.castShadow = true;
    ghost2.castShadow = true;
    ghost3.castShadow = true;
    
    bush.castShadow = true;
    bush2.castShadow = true;
    bush3.castShadow = true;
    bush4.castShadow = true;
    
    floor.receiveShadow = true;
    
    directionalLight.shadow.mapSize.width = 256
    directionalLight.shadow.mapSize.height = 256
    directionalLight.shadow.camera.top = 8
    directionalLight.shadow.camera.right = 8
    directionalLight.shadow.camera.bottom = -8
    directionalLight.shadow.camera.left = -8
    directionalLight.shadow.camera.near = 1
    directionalLight.shadow.camera.far = 20

    ghost1.shadow.mapSize.width = 256
    ghost1.shadow.mapSize.height = 256
    ghost1.shadow.camera.far = 10
    
    ghost2.shadow.mapSize.width = 256
    ghost2.shadow.mapSize.height = 256
    ghost2.shadow.camera.far = 10
    
    ghost3.shadow.mapSize.width = 256
    ghost3.shadow.mapSize.height = 256
    ghost3.shadow.camera.far = 10
    //#endregion 

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.enablePan = false

    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime();
        windowMaterial.emissiveIntensity = Math.abs(Math.sin(elapsedTime * 1.5)) + .25

        const ghost1angle = elapsedTime * 0.5;
        ghost1.position.x = Math.cos(ghost1angle) * 4
        ghost1.position.z = Math.sin(ghost1angle) * 4
        ghost1.position.y = Math.sin(ghost1angle) * Math.sin(ghost1angle * 2.34) * Math.sin(ghost1angle * 3.45) 

        const ghost2angle = - elapsedTime * 0.38;
        ghost2.position.x = Math.cos(ghost2angle) * 5
        ghost2.position.z = Math.sin(ghost2angle) * 5
        ghost2.position.y = Math.sin(ghost2angle) * Math.sin(ghost2angle * 2.34) * Math.sin(ghost2angle * 3.45) 

        const ghost3angle = elapsedTime * 0.23;
        ghost3.position.x = Math.cos(ghost3angle) * 6
        ghost3.position.z = Math.sin(ghost3angle) * 6
        ghost3.position.y = Math.sin(ghost3angle) * Math.sin(ghost3angle * 2.34) * Math.sin(ghost3angle * 3.45) 

        renderer.render(scene,camera)
        controls.update();
        requestAnimationFrame(animate)
    }
    animate();
}