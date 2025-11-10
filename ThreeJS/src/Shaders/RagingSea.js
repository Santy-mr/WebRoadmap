import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import VertexShader from './GLSL/ragingsea/vertex.glsl';
import FragmentShader from './GLSL/ragingsea/fragment.glsl';

export function RagingSea() {

    const canvas = document.getElementById('bg');
    const gui = new GUI({
        name: "Tweaks",
        width: 250
    });
    const debugObject = {};

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
    camera.position.set(0, 1, 2);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;  

    //Raging Sea
    const waterGeometry = new THREE.PlaneGeometry(10, 10, 512,512);

    debugObject.depthColor = '#186691';
    debugObject.surfaceColor = '#9bd8ff';

    const waterMaterial = new THREE.ShaderMaterial({
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
        side: THREE.DoubleSide,
        uniforms: {
            uTime: { value: 0 },

            uBigWavesElevation: { value: 0.2 },
            uBigWavesFrequency: { value: new THREE.Vector2(4.0, 1.5) },
            uBigWavesSpeed: { value: 0.75 },

            uSmallWavesElevation: { value: 0.15 },
            uSmallWavesFrequency: { value: 3.0 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallWavesIterations: { value: 4.0 },

            uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
            uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
            uColorOffset: { value: 0.16 },
            uColorMultiplier: { value: 2.5 }, 
        }
    });

    const shaderFolder = gui.addFolder("Shader Properties")
    shaderFolder.add(waterMaterial.uniforms.uBigWavesElevation, 'value', 0, 1, 0.001).name("Big Waves Elevation");
    shaderFolder.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x', 0, 10, 0.001).name("Waves Frequency x");
    shaderFolder.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y', 0, 10, 0.001).name("Waves Frequency y");
    shaderFolder.add(waterMaterial.uniforms.uBigWavesSpeed, 'value', 0, 4, 0.001).name("Waves Speed");

    shaderFolder.add(waterMaterial.uniforms.uSmallWavesElevation, 'value', 0, 1, 0.001).name("Small Waves Elevation");
    shaderFolder.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value', 0, 30, 0.001).name("Small Waves Frequency");
    shaderFolder.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value', 0, 4, 0.001).name("Small Waves Speed");
    shaderFolder.add(waterMaterial.uniforms.uSmallWavesIterations, 'value', 1, 8, 1).name("Small Waves Iterations");

    shaderFolder.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor) });
    shaderFolder.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) });
    shaderFolder.add(waterMaterial.uniforms.uColorOffset, 'value', 0, 1, 0.001).name("Color Offset");
    shaderFolder.add(waterMaterial.uniforms.uColorMultiplier, 'value', 0, 10, 0.001).name("Color Multiplier");

    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = - Math.PI * 0.5;
    scene.add(water);

    const clock = new THREE.Clock();

    function animate(){
        const elapsedTime = clock.getElapsedTime();
        waterMaterial.uniforms.uTime.value = elapsedTime;

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();


}