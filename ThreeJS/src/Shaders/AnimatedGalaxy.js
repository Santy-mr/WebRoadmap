import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import VertexShader from './GLSL/animatedgalaxy/vertex.glsl';
import FragmentShader from './GLSL/animatedgalaxy/fragment.glsl';

export function AnimatedGalaxy() {

    const canvas = document.getElementById('bg');
    const gui = new GUI({
        name: "Tweaks",
        width: 250
    });
    
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(3, 3, 3);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const parameters = {
        count: 200000,
        size: 0.005,
        radius: 5,
        branches: 3,
        spin: 1,
        randomness: 0.5,
        randomnessPower: 3,
        insideColor: '#ff6030',
        outsideColor: '#1b3984'
    };

    let particlesGeometry = null;
    let particlesMaterial = null;
    let particles = null;

    const generateGalaxy = () => {
        if (particles !== null) {
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            scene.remove(particles);
        }

        particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const scales = new Float32Array(parameters.count);
        const randomness = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;
            const radius = Math.random() * parameters.radius;       
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            positions[i3] = Math.cos(branchAngle) * radius;
            positions[i3 + 1] = 0;
            positions[i3 + 2] = Math.sin(branchAngle) * radius;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;

            randomness[i3] = randomX;
            randomness[i3 + 1] = randomY;
            randomness[i3 + 2] = randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            scales[i] = Math.random();
        };

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        particlesGeometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

        particlesMaterial = new THREE.ShaderMaterial({
            vertexShader: VertexShader,
            fragmentShader: FragmentShader,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,

            uniforms: {
                uTime: { value: 0 },
                uParticleSize: { value: 8 * renderer.getPixelRatio() }
            }
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
    };
    generateGalaxy();

    gui.add(parameters, 'size', 0.001, 0.1, 0.001).onFinishChange(generateGalaxy)
    gui.add(parameters, 'count', 100, 1000000, 100).onFinishChange(generateGalaxy)
    gui.add(parameters, 'radius', 0.01, 20, 0.01).onFinishChange(generateGalaxy)
    gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(generateGalaxy)
    gui.add(parameters, 'randomness', 0, 2, 0.001).onFinishChange(generateGalaxy)
    gui.add(parameters, 'randomnessPower', 1, 10, 0.001).onFinishChange(generateGalaxy)
    gui.addColor(parameters,'insideColor').onFinishChange(generateGalaxy)
    gui.addColor(parameters,'outsideColor').onFinishChange(generateGalaxy)

    const clock = new THREE.Clock();
    
    function animate() {
        const elapsedTime = clock.getElapsedTime();
        particlesMaterial.uniforms.uTime.value = elapsedTime;

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}