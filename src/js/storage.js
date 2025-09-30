import GojoImg from '/src/assets/images/fight/Gojo.webp';
import ItadoriImg from '/src/assets/images/fight/Itadori.webp';
import NanamiImg from '/src/assets/images/fight/Nanami.webp';

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
        img: GojoImg,
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
        img: ItadoriImg,
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
        img: NanamiImg,
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
