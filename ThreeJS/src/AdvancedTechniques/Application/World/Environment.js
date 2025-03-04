import * as THREE from 'three'
import Application from "../Application.js";

export default class Environment{

    constructor(){
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
        this.debug = this.application.debug

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.SetLight()
        this.SetEnvironmentMap()
    }

    SetLight(){
        this.light = new THREE.DirectionalLight('#ffffff', 4)
        this.light.castShadow = true
        this.light.shadow.camera.far = 15
        this.light.shadow.mapSize.set(1024,1024)
        this.light.shadow.normalBias = 0.05
        this.light.position.set(3.5, 2, -1.25)
        this.scene.add(this.light)

        if(this.debug.active){
            this.debugFolder.add(this.light, 'intensity', 0, 10, 0.001).name('Light Intensity')
            this.debugFolder.add(this.light.position, 'x', -5, 5, 0.001).name('Light PosX')
            this.debugFolder.add(this.light.position, 'y', -5, 5, 0.001).name('Light PosY')
            this.debugFolder.add(this.light.position, 'z', -5, 5, 0.001).name('Light PosZ')
        }
    }

    SetEnvironmentMap(){
        this.environmetMap = {}
        this.environmetMap.intensity = 0.4
        this.environmetMap.texture = this.resources.items.environmentMapTexture
        this.environmetMap.texture.colorSpace = THREE.SRGBColorSpace

        this.environmetMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmetMap.texture
                    child.material.envMapIntensity = this.environmetMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmetMap.updateMaterials()

        if(this.debug.active){
            this.debugFolder.add(this.environmetMap, 'intensity', 0, 4, 0.001).name('envMap Intensity')
            .onChange(this.environmetMap.updateMaterials)
        }
    }
}