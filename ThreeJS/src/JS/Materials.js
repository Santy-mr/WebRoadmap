import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export function Materials(){
    const canvas = document.querySelector('#bg')
    
    const gui = new GUI({
        width: 200,
        title: 'Tweeks'
    });

    const global ={}
    
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    window.addEventListener('resize', (e) =>{
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width,sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
    const scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();
    const doorcolorTexture = textureLoader.load('/textures/door/color.jpg');
    const dooralphaTexture = textureLoader.load('/textures/door/alpha.jpg');
    const doorheightTexture = textureLoader.load('/textures/door/height.jpg');
    const doornormalTexture = textureLoader.load('/textures/door/normal.jpg');
    const doorocclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
    const doormetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');    
    const doorroughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

    const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
    const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

    doorcolorTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.colorSpace = THREE.SRGBColorSpace

    // Material Addition

    // MeshBasicMaterial
    // const material = new THREE.MeshBasicMaterial()
    //material.map = doorcolorTexture;
    //material.color = new THREE.Color(0x0000ff);
    // gui.add(material, 'wireframe')
    // gui.add(material, 'transparent')
    // gui.add(material, 'opacity').min(0).max(1).step(0.01)
    // material.alphaMap = dooralphaTexture;
    // material.side = THREE.DoubleSide

    // MeshNormalMaterial
    // const material = new THREE.MeshNormalMaterial();
    // material.flatShading = true; 

    //MeshMatcapMaterial
    // const material = new THREE.MeshMatcapMaterial()
    // material.matcap = matcapTexture;

    //MeshDepthMaterial 
    // const material = new THREE.MeshDepthMaterial();

    //MesPhongMaterial
    // const material = new THREE.MeshPhongMaterial();
    // gui.add(material, 'shininess').min(0).max(1000).step(100);
    // material.specular = new THREE.Color(0x1188ff)

    //MeshToonMaterial
    // const material = new THREE.MeshToonMaterial();
    // material.gradientMap = gradientTexture;
    // gradientTexture.minFilter = THREE.NearestFilter
    // gradientTexture.magFilter = THREE.NearestFilter
    // gradientTexture.generateMipmaps = false
    
    // MeshStandardMaterial
    // const material = new THREE.MeshStandardMaterial();

    //Albedo Map
    // material.map = doorcolorTexture;

    //Ambient Oclussion Map
    // material.aoMap = doorocclusionTexture;
    // gui.add(material, 'aoMapIntensity').min(1).max(5).step(1);

    //Displacement Map
    // material.displacementMap = doorheightTexture;
    // material.displacementScale = .01;
    // gui.add(material,'displacementScale').min(0).max(1).step(.01)

    //Normal Map
    // material.normalMap =doornormalTexture
    // material.normalScale.set(.5,.5);

    //Alpha Map    
    // material.transparent = true;
    // material.alphaMap = dooralphaTexture;

    //Roughness & Metalness
    // material.metalnessMap = doormetalnessTexture
    // material.roughnessMap = doorroughnessTexture

    // material.metalness=1;
    // material.roughness=1;

    // gui.add(material, 'metalness').min(0).max(1).step(.0001)
    // gui.add(material, 'roughness').min(0).max(1).step(.0001)

    // MeshPhysicalMaterial
    const material = new THREE.MeshPhysicalMaterial();

    //Albedo Map
    // material.map = doorcolorTexture;

    // //Ambient Oclussion Map
    // material.aoMap = doorocclusionTexture;
    // const AOFolder = gui.addFolder('Ambient Oclussion');  
    // AOFolder.close();
    // AOFolder.add(material, 'aoMapIntensity').min(1).max(5).step(1);

    // //Displacement Map
    // material.displacementMap = doorheightTexture;
    // material.displacementScale = .01;
    // const DisplacementFolder = gui.addFolder('Displacement');  
    // DisplacementFolder.close();
    // DisplacementFolder.add(material,'displacementScale').min(0).max(1).step(.01)

    // //Normal Map
    // material.normalMap =doornormalTexture
    // material.normalScale.set(.5,.5);
    
    // //Alpha Map
    // material.transparent = true;
    // material.alphaMap = dooralphaTexture;
    
    // //Roughness & Metalness
    // material.metalnessMap = doormetalnessTexture
    // material.roughnessMap = doorroughnessTexture

    material.metalness=0;
    material.roughness=0;

    const RoughnessFolder = gui.addFolder('Roughness');  
    RoughnessFolder.close();
    RoughnessFolder.add(material, 'roughness').min(0).max(1).step(.0001)
    const MetalnessFolder = gui.addFolder('Metalness')
    MetalnessFolder.close();
    MetalnessFolder.add(material, 'metalness').min(0).max(1).step(.0001)

    //ClearCoat
    // material.clearcoat = 1;
    // material.clearcoatRoughness = 0;
    // const ClearCoatFolder = gui.addFolder('ClearCoat')
    // ClearCoatFolder.close();
    // ClearCoatFolder.add(material, 'clearcoat').min(0).max(1).step(0.0001);
    // ClearCoatFolder.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001);

    //Sheen
    // material.sheen = 1;
    // material.sheenRoughness = 0.25;
    // material.sheenColor.set(1,1,1);
    
    // const SheenFolder = gui.addFolder('Sheen');
    // SheenFolder.close();
    // SheenFolder.add(material, 'sheen').min(0).max(1).step(.0001);
    // SheenFolder.add(material, 'sheenRoughness').min(0).max(1).step(.0001);
    // SheenFolder.addColor(material, 'sheenColor')

    //Iridescence
    // material.iridescence = 1;
    // material.iridescenceIOR = 1;
    // material.iridescenceThicknessRange = [100,800];

    // const IridescenceFolder = gui.addFolder('Iridescence');
    // IridescenceFolder.close();
    // IridescenceFolder.add(material, 'iridescence').min(0).max(1).step(.0001);
    // IridescenceFolder.add(material, 'iridescenceIOR').min(1).max(2.333).step(.0001);
    // IridescenceFolder.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1);
    // IridescenceFolder.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1);

    //Transmision
    material.transmission = 1;
    material.transmissionIOR = 1;
    material.thickness = 1;

    const TransmissionFolder = gui.addFolder('Transmision');
    TransmissionFolder.close();
    TransmissionFolder.add(material, 'transmission').min(0).max(1).step(.0001);
    TransmissionFolder.add(material, 'ior').min(0).max(10).step(.0001);
    TransmissionFolder.add(material, 'thickness').min(0).max(1).step(.0001);

    const rgbeLoader = new RGBELoader() 
    rgbeLoader.load('/textures/environmentMap/2k.hdr', (environmentMap) =>{
        environmentMap.mapping = THREE.EquirectangularReflectionMapping
        scene.background = environmentMap;
        scene.environment = environmentMap;
    });

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(.5,64,64),material)
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1,100,100),material)
    const torus = new THREE.Mesh(new THREE.TorusGeometry(.3,.2,64,128),material)

    scene.add(sphere,plane,torus);

    sphere.position.set(-1.5,0,0);
    torus.position.set(1.5,0,0);

    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
    camera.position.set(0, 0, 8);
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ canvas:canvas })
    renderer.setSize(sizes.width,sizes.height);

    const constrols = new OrbitControls(camera,canvas);
    constrols.enableDamping = true;

    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime();
        sphere.rotation.y = 0.1 * elapsedTime;
        torus.rotation.y = 0.1 * elapsedTime;
        plane.rotation.y = 0.1 * elapsedTime;

        sphere.rotation.x = -0.15 * elapsedTime;
        torus.rotation.x = -0.15 * elapsedTime;
        plane.rotation.x = -0.15 * elapsedTime;
        
        constrols.update();
        requestAnimationFrame(animate)
        renderer.render(scene,camera)
    }
    animate();
}