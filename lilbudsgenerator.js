
let buds = [
  {
    name: 'Gandalf',
    type: 'rock',
    maxHp: 20,
    currentHp: 20,
    baseAtk: 10,
    specialAtk: 17,
    moves: ['glare', 'monch', 'tail smack', 'bask'],
    description: 'Gandalf is a magical bearded dragon who\'s small size is made up for with his powerful monch',
    pic: 'assets/ganbooty.png'
  },
  {
    name: 'Sam',
    type: 'ground',
    maxHp: 25,
    currentHp: 25,
    baseAtk: 12,
    specialAtk: 5,
    moves: ['chomp', 'scratch', 'sleep', 'slammy wammy'],
    description: 'Sam is big ol cuddly bear-dog with a heart as big as his head',
    pic: 'assets/sam.png'
  }
];

let attacks = [
  {
    name: 'Glare',
    type: 'spooky',
    damage: 0,
    heal: 0,
    enemyAttackMod: -2,
    description: '',
  },
  {
    name: 'Monch',
    type: 'spooky',
    damage: 4,
    heal: 0,
    enemyAttackMod: 0,
    description: '',
  },
  {
    name: 'Tail Smack',
    type: 'rock',
    damage: 3,
    heal: 0,
    enemyAttackMod: -1,
    description: '',
  },
  {
    name: 'Bask',
    type: 'rock',
    damage: 0,
    heal: 6,
    enemyAttackMod: 0,
    description: '',
  },
  {
    name: 'Chomp',
    type: 'spooky',
    damage: 7,
    heal: 0,
    enemyAttackMod: 0,
    description: '',
  },
  {
    name: 'Scratch',
    type: 'spooky',
    damage: 4,
    heal: 0,
    enemyAttackMod: 0,
    description: '',
  },
  {
    name: 'Sleep',
    type: 'sleepy',
    damage: 0,
    heal: 5,
    enemyAttackMod: 0,
    description: '',
  },
  {
    name: 'Slammy Wammy',
    type: 'fighting',
    damage: 5,
    heal: 0,
    enemyAttackMod: -1,
    description: '',
  },
]