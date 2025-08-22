import { state } from './storage.js';

const STORAGE_KEY = 'data';

export const saveState = ({ ...state }, nickname) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = () => {
  const loadData = localStorage.getItem(STORAGE_KEY);
  return loadData ? JSON.parse(loadData) : state;
};
