import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';

export function Particles(){
    const canvas = document.querySelector('#bg')

    const gui = new GUI({
        width:300,
        name: 'tweeks'
    })

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener(('resize'), () =>{
       sizes.width =  window.innerWidth     
       sizes.height = window.innerHeight
       camera.aspect = sizes.width/sizes.height
       camera.updateProjectionMatrix();
       renderer.setSize(sizes.width,sizes.height)
       renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)

    })

    const textureLoader = new THREE.TextureLoader();
    const particlesTexture = textureLoader.load('/textures/particles/8.png')

    const scene = new THREE.Scene();

    const particlesGeometry = new THREE.BufferGeometry()
    const count = 20000;
    const positions= new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random()
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors,3))
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        // color: 0xff88cc,
        map: particlesTexture,
        transparent: true,
        alphaMap:particlesTexture,
        // alphaTest: 0.001
        // depthTest: false
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })
    gui.add(particlesMaterial,'size', 0.01, 1, 0.001)
    const particles = new THREE.Points(particlesGeometry,particlesMaterial)
    scene.add(particles)


    const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
    camera.position.set(0,0,8)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ canvas:canvas })
    renderer.setSize(sizes.width,sizes.height)

    const controls = new OrbitControls(camera,canvas)
    controls.enableDamping = true;

    const clock = new THREE.Clock()

    function animate(){
        requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            const x = particlesGeometry.attributes.position.array[i3]
            particlesGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime + x)
        }
        particlesGeometry.attributes.position.needsUpdate = true

        controls.update()
        renderer.render(scene,camera)
    }
    animate();
}