import GojoImg from '/src/assets/images/fight/Gojo.webp';
import ItadoriImg from '/src/assets/images/fight/Itadori.webp';
import NanamiImg from '/src/assets/images/fight/Nanami.webp';
import MakiImg from '/src/assets/images/fight/Maki.webp';
import MegumiImg from '/src/assets/images/fight/Megumi.webp';
import YtaImg from '/src/assets/images/fight/Yta.webp';

const defaultState = {
  nickname: null,
  avatarId: 0,
  isShowDescriptionFight: false,
  characters: [
    {
      name: 'Gojo Satoru',
      id: 0,
      maxHealth: 110,
      health: 110,
      damage: 22,
      img: GojoImg,
      attackChoice: null,
      defenceChoice: [],
      countDefenceZone: 3,
      stats: {
        win: 0,
        lose: 0,
      },
    },
    {
      name: 'Yuji Itadori',
      id: 1,
      maxHealth: 100,
      health: 100,
      damage: 19,
      img: ItadoriImg,
      attackChoice: null,
      defenceChoice: [],
      countDefenceZone: 2,
      stats: {
        win: 0,
        lose: 0,
      },
    },
    {
      name: 'Kento Nanami',
      id: 2,
      maxHealth: 100,
      health: 100,
      damage: 20,
      img: NanamiImg,
      attackChoice: null,
      defenceChoice: [],
      countDefenceZone: 2,
      stats: {
        win: 0,
        lose: 0,
      },
    },
    {
      name: 'Maki Zenin',
      id: 3,
      maxHealth: 110,
      health: 110,
      damage: 21,
      img: MakiImg,
      attackChoice: null,
      defenceChoice: [],
      countDefenceZone: 2,
      stats: {
        win: 0,
        lose: 0,
      },
    },
    {
      name: 'Megumi Fushiguro',
      id: 4,
      maxHealth: 100,
      health: 100,
      damage: 18,
      img: MegumiImg,
      attackChoice: null,
      defenceChoice: [],
      countDefenceZone: 3,
      stats: {
        win: 0,
        lose: 0,
      },
    },
    {
      name: 'Yuta Okkotsu',
      id: 5,
      maxHealth: 100,
      health: 100,
      damage: 20,
      img: YtaImg,
      attackChoice: null,
      defenceChoice: [],
      countDefenceZone: 2,
      stats: {
        win: 0,
        lose: 0,
      },
    },
  ],
  battle: null,
  prevHash: null,
};

const STORAGE_KEY = 'data';

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = () => {
  const loadData = localStorage.getItem(STORAGE_KEY);
  const parsed = loadData ? JSON.parse(loadData) : defaultState;

  if (parsed.user) {
    return {
      ...parsed.user,
      battle: parsed.battle ?? null,
      prevHash: null,
    };
  }

  return parsed;

  // return loadData ? JSON.parse(loadData) : defaultState;
};

const createCurrentState = (initialState, rootState = null) => {
  const root = rootState || initialState;

  return new Proxy(initialState, {
    set(target, prop, value) {
      target[prop] = value;
      saveState(root);
      return true;
    },
    get(target, prop) {
      const value = target[prop];
      if (typeof value === 'object' && value !== null) {
        return createCurrentState(value, root);
      }

      return value;
    },
  });
};

export const state = createCurrentState(loadState());
