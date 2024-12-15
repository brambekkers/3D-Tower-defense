import { ref } from 'vue'

// Tiles
import Tile_Empty from '../assets/models/tile.fbx'
import type { Tile } from '../types/Tile.ts'

export const useMatrix = () => {
  const matrix = ref<Tile>([])
  const size = 10

  const createMatrix = () => {
    for (let y = 0; y < size; y++) {
      matrix.value[y] = []
      for (let x = 0; x < size; x++) {
        matrix.value[y].push({ x, y, model: Tile_Empty, rotation: [0, 0, 0], isPath: false, visited: false })
      }
    }
  }

  createMatrix()
  return {
    matrix
  }
}
