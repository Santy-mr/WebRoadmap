import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './Sources.js'
import Debug from './Utils/Debug.js'

let instance = null

export default class Application {
    constructor(canvas){

        if(instance){
            return instance
        }
        instance = this

        this.canvas = canvas

        //Classes Refferences
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()

        this.scene = new THREE.Scene();
        this.resources = new Resources(sources)
        this.camera = new Camera();
        this.renderer = new Renderer()

        this.World = new World();

        //Resize Event
        this.sizes.on('resize', () => {
            this.resize();
        })

        //Animate Event
        this.time.on('animate', () => {
            this.update()
        })
    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }

    update(){
        this.camera.update()
        this.World.update();
        this.renderer.update()
    }

    destroy(){
        this.sizes.off('resize')
        this.time.off('animate')

        this.scene.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.geometry.dispose()
                
                for(const ket in child.material){
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                }
            }
        })
        this.camera.orbitControls.dispose()
        this.renderer.instance.dispose();

        if(this.debug.active){
            this.debug.ui.destroy()
        }
    }
}