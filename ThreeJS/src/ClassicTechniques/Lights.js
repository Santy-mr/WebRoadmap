import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export function Luces() {
    const canvas = document.querySelector('#bg')

    const gui = new GUI({
        width: 300,
        name: "Tweeks"
    })

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    })

    const scene = new THREE.Scene();

    const material = new THREE.MeshStandardMaterial()
    material.roughness = 0.4
    const materialFolder = gui.addFolder('Material')
    materialFolder.close();
    materialFolder.add(material, 'roughness').min(0).max(5).step(0.1);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(.5, 32, 32), material)
    const cube = new THREE.Mesh(new THREE.BoxGeometry(.75, .75, .75), material);
    const torus = new THREE.Mesh(new THREE.TorusGeometry(.3, .2, 32, 64), material);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);

    plane.rotation.x = - Math.PI * 0.5
    plane.position.set(0, - 0.65, 0)
    sphere.position.set(-1.5, 0, 0);
    torus.position.set(1.5, 0, 0);
    scene.add(sphere, cube, torus, plane)

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(1, 1, 4);
    scene.add(camera);

    //Lights

    //Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const ambientLightFolder = gui.addFolder('AmbientLight')
    ambientLightFolder.close();
    ambientLightFolder.addColor(ambientLight, 'color');
    ambientLightFolder.add(ambientLight, 'intensity', 0, 1, .001)
    ambientLightFolder.add(ambientLight, 'visible')
    scene.add(ambientLight);

    //Directional Light
    const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9)
    const directionalLightFolder = gui.addFolder('DirectionalLight')
    directionalLightFolder.close();
    directionalLightFolder.addColor(directionalLight, 'color')
    directionalLightFolder.add(directionalLight, 'intensity', 0, 10, .001)
    directionalLight.position.set(1, 0.25, 0)
    scene.add(directionalLight);

    //Hemisphere Light
    const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
    const hemisphereLightFolder = gui.addFolder('HemisphereLight');
    hemisphereLightFolder.close();
    hemisphereLightFolder.addColor(hemisphereLight, 'color')
    hemisphereLightFolder.addColor(hemisphereLight, 'groundColor')
    hemisphereLightFolder.add(hemisphereLight, 'intensity', 0, 10, .001)
    scene.add(hemisphereLight);

    //PointLight Light
    const pointLight = new THREE.PointLight(0xff9000, 1.5, 10, 2);
    pointLight.position.set(1, - 0.5, 1)
    const pointLightFolder = gui.addFolder('PointLight');
    pointLightFolder.close();
    pointLightFolder.addColor(pointLight, 'color');
    pointLightFolder.add(pointLight, 'intensity', 0, 10, 0.001);
    scene.add(pointLight)

    //Rect Area Light
    const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
    const rectAreaLightFolder = gui.addFolder('RectAreaLight');
    rectAreaLightFolder.close();
    rectAreaLightFolder.addColor(rectAreaLight, 'color');
    rectAreaLightFolder.add(rectAreaLight, 'intensity',0 , 10, 0.001);
    rectAreaLightFolder.add(rectAreaLight, 'width', 0, 10, 0.001);
    rectAreaLightFolder.add(rectAreaLight, 'height', 0, 10, 0.001);
    rectAreaLight.position.set(-1.5, 0, 1.5);
    rectAreaLight.lookAt(new THREE.Vector3())
    scene.add(rectAreaLight);

    //Spot Light
    const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
    spotLight.position.set(0, 2, 3);
    const spotLightFolder = gui.addFolder('SpotLight')
    spotLightFolder.close();
    spotLightFolder.addColor(spotLight, 'color');
    spotLightFolder.add(spotLight, 'intensity', 0, 10, 0.001)
    spotLightFolder.add(spotLight, 'distance', 0, 10, 0.001)
    spotLightFolder.add(spotLight, 'angle', 0, 1, 0.001)
    spotLightFolder.add(spotLight, 'penumbra', 0, 1, 0.001)
    spotLightFolder.add(spotLight, 'decay', 0, 2, 0.001)
    scene.add(spotLight)
    spotLight.target.position.x = -0.75;
    scene.add(spotLight.target);

    //Helpers

    const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1);
    hemisphereLightFolder.add(hemisphereLightHelper, 'visible')
    scene.add(hemisphereLightHelper)

    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,0.1);
    directionalLightFolder.add(directionalLightHelper, 'visible')
    scene.add(directionalLightHelper)

    const pointLightHelper = new THREE.PointLightHelper(pointLight,0.1);
    pointLightFolder.add(pointLightHelper, 'visible')
    scene.add(pointLightHelper)

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLightFolder.add(spotLightHelper, 'visible')
    scene.add(spotLightHelper);

    const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
    rectAreaLightFolder.add(rectAreaLightHelper, 'visible')
    scene.add(rectAreaLightHelper)

    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setSize(sizes.width, sizes.height)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true;

    const clock = new THREE.Clock()

    function animate() {
        const elapsedTime = clock.getElapsedTime();
        sphere.rotation.y = 0.1 * elapsedTime
        cube.rotation.y = 0.1 * elapsedTime
        torus.rotation.y = 0.1 * elapsedTime

        sphere.rotation.x = 0.15 * elapsedTime
        cube.rotation.x = 0.15 * elapsedTime
        torus.rotation.x = 0.15 * elapsedTime

        controls.update();
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }
    animate();
}