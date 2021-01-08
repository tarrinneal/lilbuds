
let budStorage = {
  gandalf: {
    key: 'gandalf',
    name: 'Gandalf',
    type: 'rock',
    maxHp: 35,
    currentHp: 35,
    baseAtk: 15,
    def: 20,
    evade: 5,
    moves: ['glare', 'monch', 'tailsmack', 'bask'],
    description: 'Gandalf is a magical bearded dragon who\'s small size is made up for with his powerful monch',
    pic: 'assets/ganbooty.png'
  },
  sam: {
    key: 'sam',
    name: 'Sam',
    type: 'ground',
    maxHp: 45,
    currentHp: 45,
    baseAtk: 18,
    def: 12,
    evade: 9,
    moves: ['chomp', 'scratch', 'nap', 'slammywammy'],
    description: 'Sam is big ol cuddly bear-dog with a heart as big as his head',
    pic: 'assets/sam.png'
  }
};

let buds = Object.keys(budStorage);

let attacks = {
  glare: {
    name: 'Glare',
    type: 'spooky',
    damage: 0,
    heal: 0,
    enemyAttackMod: -2,
    description: '',
  },
  monch: {
    name: 'Monch',
    type: 'spooky',
    damage: 6,
    heal: 0,
    enemyAttackMod: 0,
    description: '',
  },
  tailsmack: {
    name: 'Tail Smack',
    type: 'rock',
    damage: 4,
    heal: 0,
    enemyAttackMod: -1,
    description: '',
  },
  bask: {
    name: 'Bask',
    type: 'rock',
    damage: 0,
    heal: 6,
    enemyAttackMod: 0,
    description: '',
  },
  chomp: {
    name: 'Chomp',
    type: 'spooky',
    damage: 5,
    heal: 2,
    enemyAttackMod: 0,
    description: '',
  },
  scratch: {
    name: 'Scratch',
    type: 'spooky',
    damage: 7,
    heal: 0,
    enemyAttackMod: 0,
    description: '',
  },
  nap: {
    name: 'Nap',
    type: 'sleepy',
    damage: 0,
    heal: 5,
    enemyAttackMod: 0,
    description: '',
  },
  slammywammy: {
    name: 'Slammy Wammy',
    type: 'fighting',
    damage: 5,
    heal: 0,
    enemyAttackMod: -1,
    description: '',
  },
};