// Tower parts
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
    models: [Round_Shoot],
    rotation: [0, 0, 0],
    range: 5,
    damage: 1,
    fireRate: 1,
  },
  square: {
    x: 0,
    z: 0,
    models: [Weapon_Ballista],
    rotation: [0, 0, 0],
    range: 5,
    damage: 1,
    fireRate: 1,
  },
};
