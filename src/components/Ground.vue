<script setup lang="ts">
  import Model from './Model.vue'
  import Tile from '../assets/models/tile.fbx'
  import Tile_End from '../assets/models/tile-end-round.fbx'
  import Tile_Path from '../assets/models/tile-straight.fbx'
  import Tile_Corner from '../assets/models/tile-corner-round.fbx'

  const matrix = []
  const size = 10
  const minPathLength = size * 2
  const maxPathLength = size * 4
  const startTile = { x: Math.floor(Math.random() * size), z: 0 }
  const endTile = { x: Math.floor(Math.random() * size), z: size - 1 }
  let stack = []
  const createMatrix = () => {
    for (let y = 0; y < size; y++) {
      matrix[y] = []
      for (let x = 0; x < size; x++) {
        matrix[y].push({ x, y, model: Tile, rotation: [0, 0, 0], isPath: false, visited: false })
      }
    }
  }

  const getValidDirections = (x, z) => {
    return [
      { x: x + 1, z },
      { x: x - 1, z },
      { x, z: z + 1 },
      { x, z: z - 1 }
    ].filter((d) => d.x >= 0 && d.x < size && d.z >= 0 && d.z < size && !stack.find((t) => t.x === d.x && t.z === d.z))
  }

  const shuffle = (array) => array.sort(() => Math.random() - 0.5)

  const createPath = async () => {
    stack = [{ x: startTile.x, z: startTile.z }]

    while (stack.length) {
      console.log(stack.length)
      const { x, z } = stack.at(-1) // Peek last item

      if (x === endTile.x && z === endTile.z) break

      // Get unvisited neighboring tiles
      const directions = shuffle(getValidDirections(x, z).filter((d) => !matrix[d.z][d.x].visited))

      if (directions.length) {
        const next = directions[0]
        matrix[next.z][next.x].visited = true

        // Push next tile to the stack
        stack.push(next)
      } else {
        console.log('Backtracking')
        stack.pop()
      }
    }
  }

  const setStartModel = ({ z, x, nx, nz }) => {
    if (nx === 1) matrix[z][x].rotation = [0, Math.PI / 2, 0]
    else if (nx === -1) matrix[z][x].rotation = [0, -Math.PI / 2, 0]
    else if (nz === 1) matrix[z][x].rotation = [0, 0, 0]
  }

  const setEndModel = ({ x, z, px, pz }) => {
    if (px === -1) matrix[z][x].rotation = [0, Math.PI / 2, 0]
    else if (px === 1) matrix[z][x].rotation = [0, -Math.PI / 2, 0]
    else if (pz === 1) matrix[z][x].rotation = [0, -Math.PI, 0]
  }

  const setCornerModel = ({ x, z, nx, nz, px, pz }) => {
    matrix[z][x].model = Tile_Corner

    if (nx === 0 && px === 1 && nz === 1 && pz === 0) {
      console.log('rotate 90')
      matrix[z][x].rotation = [0, -Math.PI / 2, 0]
    } else if (nx === 1 && px === 0 && nz === 0 && pz === 1) {
      console.log('rotate 270')
      matrix[z][x].rotation = [0, Math.PI / 2, 0]
    } else if (nx === 0 && px === -1 && nz === 1 && pz === 0) {
      console.log('rotate 0')
      matrix[z][x].rotation = [0, 0, 0]
    } else if (nx === -1 && px === 0 && nz === 0 && pz === 1) {
      console.log('rotate 180')
      matrix[z][x].rotation = [0, Math.PI, 0]
    } else if (nx === 0 && px === -1 && nz === -1 && pz === 0) {
      console.log('rotate 270')
      matrix[z][x].rotation = [0, Math.PI / 2, 0]
    } else if (nx === 0 && px === 1 && nz === -1 && pz === 0) {
      console.log('rotate 180')
      matrix[z][x].rotation = [0, Math.PI, 0]
    } else if (nx === -1 && px === 0 && nz === 0 && pz === -1) {
      console.log('rotate 90')
      matrix[z][x].rotation = [0, -Math.PI / 2, 0]
    }
  }

  const setStraightModel = ({ x, z, nx, nz, px, pz }) => {
    if (nx === 0 && px === 0) {
      console.log('Vertical path')
      matrix[z][x].model = Tile_Path
      matrix[z][x].rotation = [0, 0, 0]
    } else if (nz === 0 && pz === 0) {
      console.log('Horizontal path')
      matrix[z][x].model = Tile_Path
      matrix[z][x].rotation = [0, Math.PI / 2, 0]
    }
  }

  const updateModels = () => {
    matrix[startTile.z][startTile.x].model = Tile_End
    matrix[endTile.z][endTile.x].model = Tile_End
    const path = stack.map((t) => Object.values(t))
    console.log(path)

    path.forEach(([x, z], i) => {
      matrix[z][x].isPath = true

      const prevPath = path[i - 1]
      const nextPath = path[i + 1]
      const nx = nextPath?.[0] - x
      const nz = nextPath?.[1] - z
      const px = x - prevPath?.[0]
      const pz = z - prevPath?.[1]

      if (!prevPath) setStartModel({ x, z, nx, nz })
      else if (!nextPath) setEndModel({ x, z, px, pz })
      else if ((nx === 0 && px === 0) || (nz === 0 && pz === 0)) setStraightModel({ x, z, nx, nz, px, pz })
      else setCornerModel({ x, z, nx, nz, px, pz })
    })
  }

  const createLevel = () => {
    createMatrix()
    createPath()

    if (stack.length < minPathLength || stack.length > maxPathLength) createLevel()
  }

  createLevel()
  updateModels()
</script>

<template>
  <template
    v-for="(row, z) of matrix"
    :key="'z' + z">
    <template
      v-for="(tile, x) of row"
      :key="'x' + x">
      <Suspense>
        <Model
          :fbx="tile.model"
          :scale="0.01"
          :rotation="tile.rotation"
          :position="[x, 0, z]" />
      </Suspense>
    </template>
  </template>
</template>
