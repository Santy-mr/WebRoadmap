import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';

export function HauntedHouse(){
    const canvas = document.querySelector('#bg')
    
    const gui = new GUI({
        width: 300,
        name: 'tweeks'
    })
    gui.hide();

    const scene = new THREE.Scene();
    
    const fog = new THREE.Fog('#262837')
    gui.add(fog, 'near', 0, 8, 1).setValue(1)
    gui.add(fog, 'far', 0, 20, 1).setValue(12)
    scene.fog = fog


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
    const bricksocclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
    const bricksroughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');
    const bricksheightTexture = textureLoader.load('/textures/bricks/height')
        
    const bricks2colorTexture = textureLoader.load('/textures/bricks/color.jpg')
    const bricks2normalTexture = textureLoader.load('/textures/bricks/normal.jpg')
    const bricks2occlusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
    const bricks2roughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
    const bricks2heightTexture = textureLoader.load('/textures/bricks/height')
        
    bricks2colorTexture.repeat.set(1,4)
    bricks2normalTexture.repeat.set(1,4)
    bricks2occlusionTexture.repeat.set(1,4)
    bricks2roughnessTexture.repeat.set(1,4)
    bricks2heightTexture.repeat.set(1,4)

    bricks2colorTexture.wrapS = THREE.RepeatWrapping
    bricks2normalTexture.wrapS = THREE.RepeatWrapping
    bricks2occlusionTexture.wrapS = THREE.RepeatWrapping
    bricks2roughnessTexture.wrapS = THREE.RepeatWrapping
    bricks2heightTexture.wrapS = THREE.RepeatWrapping

    bricks2colorTexture.wrapT = THREE.RepeatWrapping
    bricks2normalTexture.wrapT = THREE.RepeatWrapping
    bricks2occlusionTexture.wrapT = THREE.RepeatWrapping
    bricks2roughnessTexture.wrapT = THREE.RepeatWrapping
    bricks2heightTexture.wrapT = THREE.RepeatWrapping
    //#endregion

    //#region GrassTextures
    const grasscolorTexture = textureLoader.load('/textures/grass/color.jpg')  
    const grassocclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')  
    const grassnormalTexture = textureLoader.load('/textures/grass/normal.jpg')  
    const grassroughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')  
    const grassheightTexture = textureLoader.load('/textures/grass/height.jpg')

    grasscolorTexture.repeat.set(8,8)
    grassocclusionTexture.repeat.set(8,8)
    grassnormalTexture.repeat.set(8,8)
    grassroughnessTexture.repeat.set(8,8)
    grassheightTexture.repeat.set(8,8)

    grasscolorTexture.wrapS = THREE.RepeatWrapping
    grassocclusionTexture.wrapS = THREE.RepeatWrapping
    grassnormalTexture.wrapS = THREE.RepeatWrapping
    grassroughnessTexture.wrapS = THREE.RepeatWrapping
    grassheightTexture.wrapS = THREE.RepeatWrapping

    grasscolorTexture.wrapT = THREE.RepeatWrapping
    grassocclusionTexture.wrapT = THREE.RepeatWrapping
    grassnormalTexture.wrapT = THREE.RepeatWrapping
    grassroughnessTexture.wrapT = THREE.RepeatWrapping
    grassheightTexture.wrapT = THREE.RepeatWrapping
    //#endregion

    //#region WindowTextures
    const windowcolorTexture = textureLoader.load('/textures/window/windowcolorTexture.jpg')
    const windowemissionTexture = textureLoader.load('/textures/window/windowemissionTexture.jpg')
    //#endregion
    
    const House = new THREE.Group()
    House.position.z = +1;
    scene.add(House)

    //#region Walls Meshes
    const wallsMaterial = new THREE.MeshStandardMaterial({
        map:brickscolorTexture,
        aoMap: bricksocclusionTexture,
        normalMap:bricksnormalTexture,
        roughness: bricksroughnessTexture
    })

    const walls2Material = new THREE.MeshStandardMaterial({
        map:bricks2colorTexture,
        aoMap: bricks2occlusionTexture,
        normalMap:bricks2normalTexture,
        roughness: bricks2roughnessTexture
    })

    const walls = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        wallsMaterial
    )
    walls.position.set(2, 2/2, 0);
    walls.position.x = 2;

    const walls2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 4, 1),
        walls2Material
    )
    walls2.position.set(2 + 1.5, 2, -1.5);

    const wall3 = new THREE.Mesh(
        new THREE.BoxGeometry(4,3,2),
        walls2Material
    )
    wall3.position.set(1, 1.5, -2)

    const walls4 = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 2.5, 1.5),
        walls2Material
    )
    walls4.position.set(-2.25, 2.5 / 2, -2)
    //#endregion

    //#region Pilar Meshes
    const pilar = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 2, 0.25),
        walls2Material
    )
    pilar.position.set(-3, 1, -0.5)
    
    const pilar2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 2, 0.25),
        walls2Material
    )
    pilar2.position.set(-1.5, 1, -0.5)
    //#endregion

    //#region Ceilings Meshes
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

    House.add(ceiling,ceiling2,ceiling3,ceiling4)
    House.add(walls,walls2,wall3,walls4)
    House.add(pilar,pilar2)

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
        map:windowcolorTexture,
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
    const bushMaterial = new THREE.MeshStandardMaterial({ color:'#89c854' })

    const bush = new THREE.Mesh(bushGeometry,bushMaterial) 
    bush.scale.set(0.5, 0.5, 0.5)
    bush.position.set(0.4, 0.2, -0.4)
    
    const bush2 = new THREE.Mesh(bushGeometry,bushMaterial) 
    bush2.scale.set(0.25, 0.25, 0.25)
    bush2.position.set(0.7, 0.1, 0.25)
    
    const bush3 = new THREE.Mesh(bushGeometry,bushMaterial) 
    bush3.scale.set(0.4, 0.4, 0.4)
    bush3.position.set(-3.5, 0.1, -0.75)
    
    const bush4 = new THREE.Mesh(bushGeometry,bushMaterial) 
    bush4.scale.set(0.6, 0.6, 0.6)
    bush4.position.set(3.65, 0.25, -0.4)
    //#endregion 
    House.add(bush,bush2,bush3,bush4)

    //#region Graves Meshes
    const graves = new THREE.Group();
    scene.add(graves)

    const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
    const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

    for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 5 + Math.random() * 5
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        const grave = new THREE.Mesh(graveGeometry,graveMaterial)
        grave.position.set(x, 0.3, z)
        
        grave.rotation.y = (Math.random() - 0.5) * 2
        grave.rotation.z = (Math.random() - 0.5) * 0.4
        grave.castShadow=true;
        graves.add(grave)
    }
    //#endregion

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20,20),
        new THREE.MeshStandardMaterial({
            map:grasscolorTexture,
            aoMap:grassocclusionTexture,
            normalMap:grassnormalTexture,
            roughness:grassroughnessTexture
        })
    )
    floor.rotation.x = - Math.PI / 2;
    scene.add(floor)

    //#region Lights
    const ambientLight = new THREE.AmbientLight('#b9d5ff')
    const ambientLightFolder = gui.addFolder('Ambient Light')
    ambientLightFolder.close();
    ambientLightFolder.add(ambientLight, 'intensity', 0, 5, 0.001).setValue(0.12);
    scene.add(ambientLight)

    const directionalLightFolder = gui.addFolder('Directional Light')
    const directionalLight = new THREE.DirectionalLight('#b9d5ff')
    directionalLightFolder.close();
    directionalLightFolder.add(directionalLight, 'intensity', 0, 5, 0.001).setValue(0.2)
    directionalLightFolder.add(directionalLight.position, 'x', -5, 5, 0.001).setValue(4)
    directionalLightFolder.add(directionalLight.position, 'y', -5, 5, 0.001).setValue(5)
    directionalLightFolder.add(directionalLight.position, 'z', -5, 5, 0.001).setValue(-2)
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
    const ghost1 = new THREE.PointLight('#ff00ff')
    const GhostsFolder = gui.addFolder('Ghosts')
    GhostsFolder.close();
    GhostsFolder.add(ghost1, 'intensity', 0 ,10 ,1).setValue(6)
    GhostsFolder.add(ghost1, 'distance', 0 ,5 ,0.001).setValue(3)

    const ghost2 = new THREE.PointLight('#00ffff')
    GhostsFolder.add(ghost2, 'intensity', 0 ,10 ,1).setValue(6)
    GhostsFolder.add(ghost2, 'distance', 0 ,5 ,0.001).setValue(3)

    const ghost3 = new THREE.PointLight('#ffff00')
    GhostsFolder.add(ghost3, 'intensity', 0 ,10 ,1).setValue(6)
    GhostsFolder.add(ghost3, 'distance', 0 ,5 ,0.001).setValue(3)
    scene.add(ghost1,ghost2,ghost3)
    //#endregion

    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
    camera.position.set(2.5,2,7)
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
        canvas:canvas
    })
    renderer.setSize(sizes.width,sizes.height)
    renderer.setClearColor('#262837')
    
    //#region Shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    directionalLight.castShadow = true;
    doorLight.castShadow = true;
    ghost1.castShadow = true;
    ghost2.castShadow = true;
    ghost3.castShadow = true;

    walls.castShadow = true;
    walls2.castShadow = true
    wall3.castShadow = true
    walls4.castShadow = true

    pilar.castShadow = true
    pilar2.castShadow = true

    ceiling.castShadow = true
    ceiling2.castShadow = true
    ceiling3.castShadow = true    
    ceiling4.castShadow = true   
    ceilingDoor.castShadow = true 

    bush.castShadow = true;
    bush2.castShadow = true;
    bush3.castShadow = true;
    bush4.castShadow = true;

    floor.receiveShadow = true;

    doorLight.shadow.mapSize.width = 256;
    doorLight.shadow.mapSize.height = 256;
    doorLight.shadow.camera.far = 7

    ghost1.shadow.mapSize.width = 256;
    ghost1.shadow.mapSize.height = 256;
    ghost1.shadow.camera.far = 7

    ghost2.shadow.mapSize.width = 256;
    ghost2.shadow.mapSize.height = 256;
    ghost2.shadow.camera.far = 7

    ghost3.shadow.mapSize.width = 256;
    ghost3.shadow.mapSize.height = 256;
    ghost3.shadow.camera.far = 7
    //#endregion 

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.enablePan = false

    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime();

        windowMaterial.emissiveIntensity = Math.abs(Math.sin(elapsedTime))

        const ghostangle = elapsedTime * 0.5;
        ghost1.position.x = Math.cos(ghostangle) * 4
        ghost1.position.z = Math.sin(ghostangle) * 4
        ghost1.position.y = Math.sin(elapsedTime * 3) 

        const ghostangle2 = - elapsedTime * 0.32;
        ghost2.position.x = Math.cos(ghostangle2) * 5
        ghost2.position.z = Math.sin(ghostangle2) * 5
        ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

        const ghostangle3 = elapsedTime * 0.5;
        ghost3.position.x = Math.cos(ghostangle3) * (7 + Math.sin(elapsedTime * 0.32))
        ghost3.position.z = Math.sin(ghostangle3) * (7 + Math.sin(elapsedTime * 0.5))
        ghost3.position.y = Math.sin(elapsedTime * 3) + Math.sin(elapsedTime * 2)

        renderer.render(scene,camera)
        controls.update();
        requestAnimationFrame(animate)
    }
    animate();
}