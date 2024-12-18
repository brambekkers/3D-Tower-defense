import { ref } from 'vue';
import Enemy_Ufo from '@/assets/models/enemy-ufo-a.fbx';

export const useEnemyStore = defineStore('enemy', () => {
  const { path } = useGameStore();
  const enemies = ref<Enemy[]>([]);
  const velocity = 0.01;

  const addEnemy = () => {
    const { startTile } = useGameStore();
    enemies.value.push({
      id: uuid(),
      health: 100,
      position: [startTile.x, 0.22, startTile.z],
      scale: 0.005,
      model: Enemy_Ufo,
    });
  };

  const addVelocity = (enemy, direction) => {
    enemy.position.x += direction.x * velocity;
    enemy.position.y += direction.y * velocity;
    enemy.position.z += direction.z * velocity;
  };

  const calculateDirection = (currentPosition, targetPosition) => {
    const dir = {
      x: targetPosition.x - currentPosition.x,
      y: targetPosition.y - currentPosition.y,
      z: targetPosition.z - currentPosition.z,
    };
    const length = Math.sqrt(dir.x ** 2 + dir.y ** 2 + dir.z ** 2);
    return length === 0 ? dir : { x: dir.x / length, y: dir.y / length, z: dir.z / length };
  };

  const getCurrentPathIndex = (enemy) => {
    let closestIndex = -1;
    let closestDistance = Infinity;

    for (let i = 0; i < path.length; i++) {
      const [pathX, pathZ] = path[i];
      const distance = Math.sqrt((pathX - enemy.position.x) ** 2 + (pathZ - enemy.position.z) ** 2);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  };

  const updatePosition = (enemy, i) => {
    const cPathI = getCurrentPathIndex(enemy);

    const [x, z] = path[cPathI + 1] ? path[cPathI + 1] : path[cPathI];

    // Check if enemy is close enough to the target to consider it reached
    const distanceToTarget = Math.sqrt((x - enemy.position.x) ** 2 + (z - enemy.position.z) ** 2);

    if (distanceToTarget < 0.05) {
      if (cPathI === path.length - 1) {
        enemies.value.splice(i, 1);
        // Enemy reached the end of the path
        usePlayerStore().decreaseLives(1);

        addEnemy();

        return;
      }
      return;
    }

    const direction = calculateDirection(enemy.position, { x, y: enemy.position.y, z });
    addVelocity(enemy, direction);
  };

  const addEnemyBurst = () => {
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        addEnemy();
      }, i * 1000);
    }
  };

  addEnemyBurst();
  return { enemies, updatePosition };
});
