import * as THREE from 'three'
import GUI from 'lil-gui';

const canvas = document.querySelector('#bg')
const contentleft  = document.querySelector('.right-container')

const sizes = {
    width: contentleft.clientWidth,
    height: contentleft.clientHeight
}

const gui = new GUI({
    width: 300,
    name: 'Tweeks'
})

gui.hide();
window
    .addEventListener('keydown', (e) =>{
        if(e.key == 'h'){
            gui.show(gui._hidden)
        }
    })

window.addEventListener('resize', () => {
    sizes.width = contentleft.clientWidth
    sizes.height = contentleft.clientHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    renderer.setSize(sizes.width, sizes.height)
})

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const heartTexture = textureLoader.load('/textures/customs/HeartTexture.png')

//Galaxy
const parameters = {}
parameters.count = 3000
parameters.size = 0.3
parameters.insideColor = '#ff0000'
parameters.outsideColor = '#ee33ea'
parameters.blend = 8
parameters.spinAnimation = 0.2
parameters.randomness = 0.2
parameters.randomnessPower = 1.4

let particlesGeometry = null
let particlesMaterial = null
let particles = null

const generateHeart = () => {

    if (particles !== null) {
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
        const i3 = i * 3;
        const a = Math.random() * (Math.PI * 2)

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 0 : 0)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 2 : -2)

        positions[i3] = 14 * Math.pow(Math.sin(a), 3) / 2 + randomX
        positions[i3 + 1] = (12 * Math.cos(a) - 4 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 2 + randomY
        positions[i3 + 2] = randomZ

        //Colors
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, a / parameters.blend)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    particlesMaterial = new THREE.PointsMaterial({
        map: heartTexture,
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        alphaMap: heartTexture
    })

    particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

}
generateHeart()

gui.add(parameters, 'size', 0.001, 0.5, 0.001).onFinishChange(generateHeart)
gui.add(parameters, 'count', 100, 10000, 100).onFinishChange(generateHeart)
gui.add(parameters, 'randomness', 0, 2, 0.001).onFinishChange(generateHeart)
gui.add(parameters, 'randomnessPower', 1, 10, 0.001).onFinishChange(generateHeart)
gui.addColor(parameters, 'insideColor').onFinishChange(generateHeart)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateHeart)
gui.add(parameters, 'spinAnimation', 0.01, 1, 0.001)
gui.add(parameters, 'blend', 1, 8, 1).onFinishChange(generateHeart)

let starsGeometry = null
let starsMaterial = null
let stars = null

const generateStars = () => {
    const count = 2000
    const starsGeometry = new THREE.BufferGeometry();
    const starsposition = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        starsposition[i3] = (Math.random() - 0.5) * 40;
        starsposition[i3 + 1] = (Math.random() - 0.5) * 40;
        starsposition[i3 + 2] = (Math.random() - 1) * 50;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsposition, 3))

    starsMaterial = new THREE.PointsMaterial({
        map: heartTexture,
        color: 0xffffff,
        size: 0.2,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        alphaMap:heartTexture,
    })

    stars = new THREE.Points(starsGeometry,starsMaterial);
    scene.add(stars)
}
generateStars();

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (e) =>{
    cursor.x = (e.clientX / sizes.width) - 0.5
    cursor.y = (e.clientY / sizes.height) - 0.5
})

const cameraGroup = new THREE.Group()
scene.add(cameraGroup);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 13)
cameraGroup.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock();
let previousTime = 0

function animate() {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    camera.position.y = -scrollY / sizes.height;
    const parallaxX = cursor.x * 1;
    const parallaxY = -cursor.y * 1;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;
    
    particles.rotation.y = elapsedTime * parameters.spinAnimation
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate();