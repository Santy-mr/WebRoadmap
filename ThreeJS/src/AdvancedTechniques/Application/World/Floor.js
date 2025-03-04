import * as THREE from 'three'
import Application from '../Application'

export default class Floor {
    constructor(){
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources

        this.SetGeometry()
        this.SetTextures()
        this.SetMaterial()
        this.SetMesh()
    }

    SetGeometry(){
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    SetTextures(){
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    SetMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    SetMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI / 2
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}