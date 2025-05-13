import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import VertexShader from './GLSL/test/vertex.glsl'
import FragmentShader from './GLSL/test/fragment.glsl'


export function Shaders(){
    const canvas = document.querySelector('#bg')
    const gui = new GUI({
        width:300,
        name: "tweeks"
    })

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }

    window.addEventListener('resize', () =>{
        sizes.width = window.innerWidth,
        sizes.height = window.innerHeight,
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    })

    const scene = new THREE.Scene()

    const textureLoader = new THREE.TextureLoader()
    const flagTexture = textureLoader.load('/textures/flag/mexicoFlag.jpg')

    const geometry = new THREE.PlaneGeometry(1,1,32,32)

    const count = geometry.attributes.position.count;
    const randoms = new Float32Array(count)

    for (let i = 0; i < count; i++) {
        randoms[i] = Math.random()
    }

    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    
    const material = new THREE.RawShaderMaterial({
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
        uniforms:{
            uFrecuency: {value: new THREE.Vector2(10, 5)},
            uTime: {value: 0},
            uColor: {value: new THREE.Color('orange')},
            uTexture: {value: flagTexture }
        }
    })

    const shaderFolder = gui.addFolder("Shader Properties")
    shaderFolder.add(material.uniforms.uFrecuency.value, 'x', 0, 20, 0.01).name("FrecuencyX")
    shaderFolder.add(material.uniforms.uFrecuency.value, 'y', 0, 20, 0.01).name("FrecuencyY")
    shaderFolder.addColor(material.uniforms.uColor, 'value').name("Flag Color");

    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.y = 2/3;
    scene.add(mesh)

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0.25, - 0.25, 1)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true;

    const clock = new THREE.Clock()

    function animate() {
        const elapsedTime = clock.getElapsedTime();

        material.uniforms.uTime.value = elapsedTime;

        controls.update();

        renderer.render(scene, camera)

        requestAnimationFrame(animate)
    }
    animate();
}