// Tower parts
import Round_Bottom from '@/assets/models/tower-round-bottom-a.fbx';
import Square_Bottom from '@/assets/models/tower-square-bottom-a.fbx';

// Ui
import purpleCard from '@/assets/ui/cardPurple.svg';
import redCard from '@/assets/ui/cardRed.svg';

export const newTowerData = {
  square: {
    name: 'Square tower',
    key: 'square' as 'square' | 'round',
    price: 100,
    card: purpleCard,
  },
  round: {
    name: 'Round tower',
    key: 'round' as 'square' | 'round',
    price: 150,
    card: redCard,
  },
};

export const newTowers = {
  round: {
    x: 0,
    z: 0,
    models: [Round_Bottom],
    rotation: [0, 0, 0],
    range: 5,
    damage: 1,
    fireRate: 1,
  },
  square: {
    x: 0,
    z: 0,
    models: [Square_Bottom],
    rotation: [0, 0, 0],
    range: 5,
    damage: 1,
    fireRate: 1,
  },
};
