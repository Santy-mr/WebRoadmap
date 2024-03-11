import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';

export function Textures() {

    //Texture  Lesson
    const loadingManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const colorTexture = textureLoader.load('/textures/minecraft.png');
    // const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
    // const heightTexture = textureLoader.load('/textures/door/height.jpg');
    // const normalTexture = textureLoader.load('/textures/door/normal.jpg');
    // const occlusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
    // const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');    
    // const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
    colorTexture.colorSpace = THREE.SRGBColorSpace

    // colorTexture.repeat.x =2;
    // colorTexture.repeat.y =3;

    // colorTexture.wrapS = THREE.MirroredRepeatWrapping
    // colorTexture.wrapT = THREE.MirroredRepeatWrapping

    // colorTexture.offset.x = .5;
    // colorTexture.offset.y = .5;

    // colorTexture.rotation = Math.PI / 4;
    // colorTexture.center.x = .5;
    // colorTexture.center.y = .5;

    colorTexture.generateMipmaps = false
    colorTexture.minFilter = THREE.NearestFilter
    colorTexture.magFilter = THREE.NearestFilter



    const canvas = document.querySelector('#bg');

    const gui = new GUI({
        width: 200,
        title: 'Tweeks'
    });

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: colorTexture })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    gui.add(material, 'wireframe')

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(0, 0, 2);
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    function animate() {
        controls.update();
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }

    animate();
}