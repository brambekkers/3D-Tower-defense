export const useGameStore = defineStore('game', () => {
  const worldSize = 10;
  const buildMode = ref<BuildMode>(null);
  const newTowerKey = ref<NewTowerKey>(null);
  const selectedPos = ref({ x: 0, z: 0 });

  const { matrix } = useMatrix(worldSize);
  const { startTile, endTile, path } = usePath(matrix.value);
  const { decorations } = useDecoration(matrix.value);

  return { buildMode, newTowerKey, matrix, worldSize, decorations, selectedPos, startTile, endTile, path };
});
