import Application from "../Application.js";
import * as THREE from 'three'

export default class Fox{
    constructor(){
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
        this.time = this.application.time

        //Debug
        this.debug = this.application.debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Fox')
        }

        this.resource = this.resources.items.foxModel
        
        this.SetModel()
        this.SetAnimation()
    }

    SetModel(){
        this.model = this.resource.scene
        this.model.scale.setScalar(0.02)
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true
            }
        })
    }

    SetAnimation(){
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        //Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }

            for(const key in debugObject){
                this.debugFolder.add(debugObject, key)
            }
        }

        
    }

    update(){
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}