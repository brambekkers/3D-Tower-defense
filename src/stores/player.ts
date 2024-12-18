export const usePlayerStore = defineStore('player', () => {
  const lives = ref(10);
  const coins = ref(1000);
  const gems = ref(0);

  const hasEnoughCoins = (price: number) => {
    if (coins.value < price) return false;
    coins.value -= price;
    return true;
  };

  const decreaseLives = (amount: number) => {
    lives.value -= amount;
  };
  return { lives, gems, coins, hasEnoughCoins, decreaseLives };
});
