import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';

export function Galaxy(){
    const canvas = document.querySelector('#bg')

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const gui = new GUI({
        width:300,
        name:'Tweeks'
    })
    gui.hide()
    
    window
    .addEventListener('keydown', (e) =>{
        if(e.key == 'h'){
            gui.show(gui._hidden)
        }
    })


    window.addEventListener('resize', () =>{
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.aspect = sizes.width/sizes.height
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
        renderer.setSize(sizes.width,sizes.height)
    })

    const scene = new THREE.Scene();

    //Galaxy
    const parameters = {}
    parameters.count = 175000
    parameters.size = 0.02
    parameters.radius = 6
    parameters.branches = 6
    parameters.spin = 1
    parameters.randomness = 0.2
    parameters.randomnessPower = 4
    parameters.insideColor = '#18d2e7'
    parameters.outsideColor = '#7b22dd'
    parameters.spinAnimation = 0.1

    let particlesGeometry = null
    let particlesMaterial = null
    let particles = null

    const generateGalaxy = () =>{

        if(particles !== null){
            particlesGeometry.dispose()
            particlesMaterial.dispose()
            scene.remove(particles)
        }

        particlesGeometry = new THREE.BufferGeometry()
        const positions = new Float32Array(parameters.count * 3)
        const colors = new Float32Array(parameters.count * 3)

        const colorInside = new THREE.Color(parameters.insideColor)
        const colorOutside = new THREE.Color(parameters.outsideColor)

        for (let i = 0; i < parameters.count; i++) {

            //Positions
            const i3 = i * 3;
            const radius = Math.random() * parameters.radius
            const spinAngle = radius * parameters.spin
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1: -1)
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1: -1)
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1: -1)

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            //Color
            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / parameters.radius)

            colors[i3] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors,3))

        particlesMaterial = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })

        particles = new THREE.Points(particlesGeometry,particlesMaterial)
        scene.add(particles)

    }
    generateGalaxy()

    gui.add(parameters, 'size', 0.001, 0.1, 0.001).onFinishChange(generateGalaxy)
    gui.add(parameters, 'count', 100, 1000000, 100).onFinishChange(generateGalaxy)
    gui.add(parameters, 'radius', 0.01, 20, 0.01).onFinishChange(generateGalaxy)
    gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(generateGalaxy)
    gui.add(parameters, 'spin', -5, 5, 0.001).onFinishChange(generateGalaxy)
    gui.add(parameters, 'randomness', 0, 2, 0.001).onFinishChange(generateGalaxy)
    gui.add(parameters, 'randomnessPower', 1, 10, 0.001).onFinishChange(generateGalaxy)
    gui.addColor(parameters,'insideColor').onFinishChange(generateGalaxy)
    gui.addColor(parameters,'outsideColor').onFinishChange(generateGalaxy)
    gui.add(parameters,'spinAnimation', 0.01, 0.2, 0.001)

    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
    camera.position.set(0.75, 6.4, 8.5)
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ canvas:canvas })
    renderer.setSize(sizes.width,sizes.height)

    const controls = new OrbitControls(camera,canvas)
    controls.enableDamping = true;

    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime();
        particles.rotation.y = elapsedTime * parameters.spinAnimation

        controls.update();
        renderer.render(scene,camera)
        requestAnimationFrame(animate)
    }
    animate();
}