import * as THREE from 'three';

export function TransformObjects() {
    const scene = new THREE.Scene();
    /*     scene.background = new THREE.Color("skyblue"); */
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg')
    });

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);

    const group = new THREE.Group();
    group.position.y = 1;
    scene.add(group)

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({ color:0xff0000 })
    )
    group.add(cube)

    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({ color:0x00ff00 })
    )
    cube2.position.x=-2
    group.add(cube2)

    const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({ color:0x0000ff })
    )
    cube3.position.x = 2
    group.add(cube3)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    scene.add(camera);
    camera.position.z = 5;

    const AxesHelper = new THREE.AxesHelper(3);
    scene.add(AxesHelper);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

