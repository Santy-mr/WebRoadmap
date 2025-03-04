import * as THREE from 'three'
import Application from "./Application.js";
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default class Camera {
    constructor(){
        this.application = new Application();
        this.sizes = this.application.sizes
        this.scene = this.application.scene
        this.canvas = this.application.canvas

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width/this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setOrbitControls(){
        this.orbitControls = new OrbitControls(this.instance, this.canvas)
        this.orbitControls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.orbitControls.update()
    }
}