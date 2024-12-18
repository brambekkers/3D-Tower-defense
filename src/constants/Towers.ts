import { uuid } from '@/utils/id';
// Tower parts
import Square_Top from '@/assets/models/tower-square-top-a.fbx';

import Round_Shoot from '@/assets/models/tower-round-middle-b.fbx';
import Weapon_Ballista from '@/assets/models/weapon-ballista.fbx';

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
    models: [
      {
        id: uuid(),
        model: Round_Shoot,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    ],
    rotation: [0, 0, 0],
    range: 5,
    damage: 1,
    fireRate: 1,
  },
  square: {
    x: 0,
    z: 0,
    models: [
      {
        id: uuid(),
        model: Square_Top,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        id: uuid(),
        model: Weapon_Ballista,
        position: [0, -0.1, 0],
        rotation: [0, 0, 0],
      },
    ],
    rotation: [0, 0, 0],
    range: 5,
    damage: 1,
    fireRate: 1,
  },
};
