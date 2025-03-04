import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import EventEmitter from "./EventEmitter.js";

export default class Resources extends EventEmitter{
    constructor(sources){
        super()
    
        //Options
        this.sources = sources

        //Set Up
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.SetLoaders()
        this.StartLoading()
    }

    SetLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    StartLoading(){
        for(const source of this.sources){
            if(source.type === 'glTF'){
                this.loaders.gltfLoader.load(
                    source.path, (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            
            else if(source.type === 'texture'){
                this.loaders.textureLoader.load(
                    source.path, (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            
            else if(source.type === 'cubeTexture'){
                this.loaders.cubeTextureLoader.load(
                    source.path, (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file){
        this.items[source.name] = file
        this.loaded ++

        if(this.loaded === this.toLoad){
            this.trigger('loaded')
        }
    }
}