export const state = {
  user: {
    nickname: null,
    avatarId: 0,
    characters: [
      {
        name: 'Gojo Satoru',
        maxHealth: 110,
        health: 110,
        damage: 25,
        img: 'src/assets/images/fight/Gojo.webp',
        attackChoice: null,
        defenceChoice: [],
        stats: {
          win: 0,
          lose: 0,
        },
      },
      {
        name: 'Yuji Itadori',
        maxHealth: 100,
        health: 100,
        damage: 20,
        img: 'src/assets/images/fight/Itadori.webp',
        attackChoice: null,
        defenceChoice: [],
        stats: {
          win: 0,
          lose: 0,
        },
      },
      {
        name: 'Kento Nanami',
        maxHealth: 100,
        health: 100,
        damage: 20,
        img: 'src/assets/images/fight/Nanami.webp',
        attackChoice: null,
        defenceChoice: [],
        stats: {
          win: 0,
          lose: 0,
        },
      },
    ],
  },
  battle: null,
};
