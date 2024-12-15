import { Ref } from 'vue'

// Tiles
import Tile_Tree1 from '../assets/models/tile-tree.fbx'
import Tile_Tree2 from '../assets/models/tile-tree-double.fbx'
import Tile_Tree3 from '../assets/models/tile-tree-quad.fbx'

import type { Tile } from '../types/Tile.ts'

export const useDecoration = (matrix: Tile[][]) => {
  const size = matrix.length
  const decorationAmount = Math.floor(size * size * 0.2)
  const treeAmount = Math.floor(decorationAmount * 0.3)
  const rockAmount = Math.floor(decorationAmount * 0.3)
  const plantAmount = Math.floor(decorationAmount * 0.3)

  console.log(decorationAmount)

  const addTrees = () => {
    const trees = [Tile_Tree1, Tile_Tree1, Tile_Tree1, Tile_Tree2, Tile_Tree2, Tile_Tree3]
    let treeLeft = treeAmount

    while (treeLeft > 0) {
      const x = Math.floor(Math.random() * size)
      const z = Math.floor(Math.random() * size)

      if (!matrix[z][x].isBlocked && !matrix[z][x].isPath) {
        const randomTree = Math.floor(Math.random() * trees.length)
        matrix[z][x].model = trees[randomTree]
        matrix[z][x].isBlocked = true
        treeLeft--
      }
    }
  }

  // Add trees
  addTrees()
  // add rocks
  // add plants
  // Add water
  // Add bridges
}
