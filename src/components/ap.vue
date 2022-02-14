<template>

</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { Object3D, Group, ConeGeometry, BoxGeometry, InstancedMesh, MeshStandardMaterial, Color } from 'three'

import Trees from '#native/trees'

const { seed } = Trees()
seed()

import useScene from '#composables/use-scene';

const { scene } = useScene()

const t = []
const AMOUNT = 10

const trees = new Group()
const bBase = new ConeGeometry(0.3, 2, 4)
const gbranches1 = new ConeGeometry(0.4, 3, 4)
const gbranches2 = new ConeGeometry(0.3, 2.2, 4)
const base = new InstancedMesh(bBase, new MeshStandardMaterial({color: new Color(0xc6966f), flatShading: true}), AMOUNT)
const branches1 = new InstancedMesh(gbranches1, new MeshStandardMaterial({flatShading: true}), AMOUNT)
const branches2 = new InstancedMesh(gbranches2, new MeshStandardMaterial({flatShading: true}), AMOUNT)

base.castShadow = true
branches1.castShadow = true
branches2.vastShadow = true

const colors = [new Color(0x9fcf88), new Color(0x8bbb75), new Color(0xcfc788), new Color(0xcb906d)]

onMounted(() => {
  for (let i = 0; i < AMOUNT; i++) {
    let structure = new Group()
    let base = new Object3D()
    let branches1 = new Object3D()
    let branches2 = new Object3D()

    branches1.position.y = 1
    branches2.position.y = 1.6

    structure.add(base, branches1, branches2)

    t.push({
      pos: {
        x: Math.random() * 10,
        y: 0,
        z: Math.random() * 10,
      },
      rot: {
        x: -0.1 + (Math.random() * 0.2),
        y: (Math.PI / 2) * Math.random(),
        z: -0.1 + (Math.random() * 0.2),
      },
      scale: 0.5 + (Math.random() * 0.75),
      child: structure
    })
  }

  trees.add(base, branches1, branches2)
  scene.value.add(trees)

  t.forEach((tr, tri) => {
    tr.child.position.set(tr.pos.x, (tr.pos.y + bBase.parameters.height / 2) * tr.scale, tr.pos.z)
    tr.child.rotation.set(tr.rot.x, tr.rot.y, tr.rot.z)
    tr.child.scale.setScalar(tr.scale)
    tr.child.updateMatrixWorld(true)

    base.setMatrixAt(tri, tr.child.children[0].matrixWorld)
    branches1.setMatrixAt(tri, tr.child.children[1].matrixWorld)
    branches1.setColorAt(tri, colors[tri % 3])
    branches2.setMatrixAt(tri, tr.child.children[2].matrixWorld)
    branches2.setColorAt(tri, colors[tri % 3])
  })

  base.instanceMatrix.needsUpdate = true
  branches1.instanceMatrix.needsUpdate = true
  branches1.instanceColor.needsUpdate = true
  branches2.instanceMatrix.needsUpdate = true
  branches2.instanceColor.needsUpdate = true
})

onBeforeUnmount(() => {
  bBase.dispose()
  gbranches1.dispose()
  gbranches2.dispose()
  scene.value.remove(trees)
})
</script>
