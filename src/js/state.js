import GojoImg from '/src/assets/images/fight/Gojo.webp';
import ItadoriImg from '/src/assets/images/fight/Itadori.webp';
import NanamiImg from '/src/assets/images/fight/Nanami.webp';

const defaultState = {
  nickname: null,
  avatarId: 0,
  characters: [
    {
      name: 'Gojo Satoru',
      id: 0,
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
      id: 1,
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
      id: 2,
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
  battle: null,
};

const STORAGE_KEY = 'data';

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = () => {
  const loadData = localStorage.getItem(STORAGE_KEY);
  return loadData ? JSON.parse(loadData) : defaultState;
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
