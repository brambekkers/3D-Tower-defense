<template>
  <primitive
    ref="obj"
    :object="model"
    :scale
    :position
    :rotation
    cast-shadow
    receive-shadow />
</template>

<script setup lang="ts">
  import * as THREE from 'three'
  import { shallowRef } from 'vue'
  import { useFBX } from '@tresjs/cientos'
  import textureImage from '@/assets/models/textures/colormap.png'

  type Props = {
    fbx: string
    scale?: number
    position?: number[]
    rotation?: number[]
  }

  const { fbx, scale = 0.5, position = [0, 0, 0], rotation = [0, 0, 0] } = defineProps<Props>()
  const obj = shallowRef()

  const applyMaterials = (object) => {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(textureImage)
    const material = new THREE.MeshMatcapMaterial({ map: texture, side: THREE.DoubleSide })

    object.traverse((child) => (child.material = material))
  }

  const model = await useFBX(fbx)
  applyMaterials(model)
</script>
