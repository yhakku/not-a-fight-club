import { state } from './state.js';
import KenImg from '/src/assets/images/fight/Ken.webp';
import SukunaImg from '/src/assets/images/fight/Sukuna.webp';
import TojiImg from '/src/assets/images/fight/Todzi.webp';

const startFightButton = document.querySelector('.login__button-fight');
const attackButtons = document.querySelectorAll('.attack-panel .fight__button');
const defenceButtons = document.querySelectorAll(
  '.defence-panel .fight__button',
);
const attackButton = document.querySelector('.fight__fight-button');
const logContainer = document.querySelector('.logs__list');
const reloadButton = document.querySelector('.fight__reload-button');
const fightPanelContainer = document.querySelector(
  '.fight__panel-container--fight',
);
const descriptionPanelContainer = document.querySelector(
  '.fight__panel-container--description',
);
const startFightBeforeDescription = document.querySelector(
  '.fight__panel-button',
);

const enemies = [
  {
    name: 'Kenjaku',
    maxHealth: 100,
    health: 100,
    damage: 20,
    countAttackZone: 1,
    attackZone: null,
    countDefenceZone: 2,
    defenceZones: [],
    img: KenImg,
  },
  {
    name: 'Sukuna',
    maxHealth: 110,
    health: 110,
    damage: 25,
    countAttackZone: 2,
    attackZone: null,
    countDefenceZone: 2,
    defenceZones: [],
    img: SukunaImg,
  },
  {
    name: 'Fushiguro Toji',
    maxHealth: 100,
    health: 100,
    damage: 20,
    countAttackZone: 1,
    attackZone: null,
    countDefenceZone: 3,
    defenceZones: [],
    img: TojiImg,
  },
];

const zones = ['Head', 'Neck', 'Body', 'Belly', 'Legs'];

const attack = 'src/assets/images/fight/attack.svg';
const block = 'src/assets/images/fight/block.svg';
const crit = 'src/assets/images/fight/crit.svg';

const getRandomEnemy = () => {
  const index = Math.floor(Math.random() * enemies.length);
  return enemies[index];
};

const getCharacter = () => {
  let charsId = state.characters.map((character) => character.id); // [0, 1, 2]

  for (let charId of charsId) {
    if (charId === state.avatarId) {
      return state.characters[charId];
    }
  }
};

const renderEnemy = (data) => {
  let enemyData = null;
  if (state.battle === null) {
    enemyData = enemy;
  } else {
    enemyData = data;
  }
  const cardEnemy = document.querySelector('.fight__card--antagonist');
  cardEnemy.innerHTML = `
      <div class="fight__image-container">
        <img
          class="fight__image"
          src=${enemyData.img}
          alt=${enemyData.name}
          width="260"
          height="320"
          loading="lazy"
        >
        <div class="fight__hint-container fight__hint-container--enemy">
          <img
            class="fight__hint-enemy"
            alt="hint-attack"
            width="200"
            height="150"
            loading="lazy"
          >
        </div>
      </div>
      <div class="fight__hp-control hp-control">
        <div class="hp-control__full">
          <span class="hp-control__hp-enemy"></span>
        </div>
          <span class="hp-control__amount">
            <span class="hp-control__count-enemy">${enemyData.health}</span>
              /${enemyData.maxHealth}
          </span>
        </div>`;

  const hpEnemy = document.querySelector('.hp-control__hp-enemy');
  hpEnemy.style.width = `${enemyData.health}%`;

  if (state.battle) {
    determineDefenceZonesEnemy();
    determineAttackZoneEnemy();
  }
};

const renderPlayer = (data) => {
  let playerData = null;
  if (state.battle === null) {
    playerData = character;
  } else {
    playerData = data;
  }
  const cardPlayer = document.querySelector('.fight__card--protagonist');
  cardPlayer.innerHTML = `
      <div class="fight__image-container">
        <img
          class="fight__image"
          src=${playerData.img}
          alt=${playerData.name}
          width="260"
          height="320"
          loading="lazy"
        >
        <div class="fight__hint-container fight__hint-container--player">
          <img
            class="fight__hint-player"
            alt="hint-attack"
            width="200"
            height="150"
            loading="lazy"
          >
        </div>
      </div>
      <div class="fight__hp-control hp-control">
        <div class="hp-control__full">
          <span class="hp-control__hp-player"></span>
        </div>
          <span class="hp-control__amount">
            <span class="hp-control__count-player">${playerData.health}</span>
              /${playerData.maxHealth}
          </span>
        </div>`;
  const hpPlayer = document.querySelector('.hp-control__hp-player');
  hpPlayer.style.width = `${playerData.health}%`;
};

let enemy;
let character;

function determineDefenceZonesEnemy() {
  const uniqueZoneIndex = new Set();

  while (
    state.battle.enemy.defenceZones.length < state.battle.enemy.countDefenceZone
  ) {
    const randomZoneIndex = Math.floor(Math.random() * zones.length);
    if (!uniqueZoneIndex.has(randomZoneIndex)) {
      uniqueZoneIndex.add(randomZoneIndex);
      state.battle.enemy.defenceZones.push(zones[randomZoneIndex]);
    }
  }

  return state.battle.enemy.defenceZones;
}

function determineAttackZoneEnemy() {
  // TODO: Нужно понять как получать количество зон атаки динамически(и нужно ли -- у Сукуны 2 атаки)
  const randomZoneIndex = Math.floor(Math.random() * zones.length);
  if (!state.battle.enemy.attackZone) {
    return (state.battle.enemy.attackZone = zones[randomZoneIndex]);
  }
}

const validateChoices = () => {
  if (
    state.battle?.player.attackChoice &&
    state.battle?.player.defenceChoice.length === 2
  ) {
    attackButton.disabled = false;
    attackButton.style.cursor = 'pointer';
  } else {
    attackButton.disabled = true;
    attackButton.style.cursor = 'not-allowed';
  }
};

function determineStatFight() {
  character = getCharacter();

  if (state.battle) {
    if (state.battle.player.health <= 0 && state.battle.enemy.health <= 0) {
      character.stats.win += 1;
      character.stats.lose += 1;
      state.battle.log.unshift(`<span class="logs__accent">Draw!</span>`);
    } else if (state.battle.enemy.health <= 0) {
      character.stats.win += 1;
      state.battle.log.unshift(
        `<span class="logs__accent">${state.battle.player.name}</span> wins!`,
      );
    } else if (state.battle.player.health <= 0) {
      character.stats.lose += 1;
      state.battle.log.unshift(
        `<span class="logs__accent">${state.battle.enemy.name}</span> wins!`,
      );
    }
  }
}

function createDescriptionGame() {
  const checkbox = document.querySelector('.fight__panel-checkbox-input');
  const checkboxSettings = document.querySelector(
    '.show-description__form-checkbox-input',
  );
  if (checkbox.checked) {
    state.isShowDescriptionFight = true;
  }

  if (state.isShowDescriptionFight) {
    descriptionPanelContainer.style.display = 'none';
    fightPanelContainer.style.display = 'flex';
    checkboxSettings.checked = false;
  } else {
    descriptionPanelContainer.style.display = 'flex';
    fightPanelContainer.style.display = 'none';
    checkboxSettings.checked = true;
  }

  const titlePlayer = document.querySelector('.fight__panel-versus--player');
  const titleEnemy = document.querySelector('.fight__panel-versus--enemy');
  titlePlayer.innerHTML = `${state.battle?.player.name}`;
  titleEnemy.innerHTML = `${state.battle?.enemy.name}`;
}

function createFightGame() {
  createDescriptionGame();
  fightPanelContainer.style.display = 'flex';

  descriptionPanelContainer.style.display = 'none';
}

export const initFight = () => {
  // TODO: Поймал баг, при смене персонажа энеми появляется с 0 хп, хотя до этого бой был обновлён | Подтверждён
  enemy = getRandomEnemy();
  character = getCharacter();

  const startFight = () => {
    if (!state.battle) {
      state.battle = {
        player: character,
        enemy: enemy,
        log: [],
      };
    }

    createDescriptionGame();

    renderEnemy(state.battle.enemy);
    renderPlayer(state.battle.player);
  };

  const reloadFight = () => {
    createDescriptionGame();

    for (let attackButton of attackButtons) {
      if (
        attackButton.textContent.replace(/(\r\n|\n|\r)/gm, '').trim() ===
        state.battle?.player.attackChoice
      ) {
        attackButton.classList.add('selected');
      }
    }

    for (let defenceButton of defenceButtons) {
      state.battle?.player.defenceChoice.forEach((choice) => {
        if (
          defenceButton.textContent.replace(/(\r\n|\n|\r)/gm, '').trim() ===
          choice
        ) {
          defenceButton.classList.add('selected');
        }
      });
    }

    renderEnemy(state.battle?.enemy);
    renderPlayer(state.battle?.player);

    logContainer.innerHTML = '';
    state.battle?.log.forEach((entry) => {
      const li = document.createElement('li');
      li.classList.add('logs__item');
      li.innerHTML = entry;
      logContainer.appendChild(li);
    });
  };

  const selectZone = () => {
    attackButtons.forEach((attackButton) => {
      attackButton.addEventListener('click', () => {
        attackButtons.forEach((selectedButton) => {
          selectedButton.classList.remove('selected');
        });

        if (state.battle) {
          if (state.battle.player.attackChoice === null) {
            attackButton.classList.add('selected');
            state.battle.player.attackChoice = attackButton.textContent
              .replace(/(\r\n|\n|\r)/gm, '')
              .trim();
          }

          if (state.battle?.player.attackChoice !== attackButton.textContent) {
            attackButton.classList.add('selected');
            state.battle.player.attackChoice = attackButton.textContent
              .replace(/(\r\n|\n|\r)/gm, '')
              .trim();
          }

          if (!attackButton.getAttribute('class').includes('selected')) {
            state.battle.player.attackChoice = null;
          }

          validateChoices();
        }
      });
    });

    defenceButtons.forEach((defenceButton) => {
      defenceButton.addEventListener('click', () => {
        const zone = defenceButton.textContent
          .replace(/(\r\n|\n|\r)/gm, '')
          .trim();
        if (state.battle.player.defenceChoice.includes(zone)) {
          state.battle.player.defenceChoice =
            state.battle.player.defenceChoice.filter((z) => z !== zone);
          defenceButton.classList.remove('selected');
        } else {
          if (state.battle.player.defenceChoice.length < 2) {
            state.battle.player.defenceChoice.push(zone);
            defenceButton.classList.add('selected');
          }
        }

        validateChoices();
      });
    });
  };

  const startAttack = () => {
    const hpPanelEnemy = document.querySelector('.hp-control__hp-enemy');
    const hpPanelPlayer = document.querySelector('.hp-control__hp-player');
    const countHpPanelEnemy = document.querySelector(
      '.hp-control__count-enemy',
    );
    const countHpPanelPlayer = document.querySelector(
      '.hp-control__count-player',
    );
    const hintContainerEnemy = document.querySelector(
      '.fight__hint-container--enemy',
    );
    const hintContainerPlayer = document.querySelector(
      '.fight__hint-container--player',
    );
    const hintPlayer = document.querySelector('.fight__hint-player');
    const hintEnemy = document.querySelector('.fight__hint-enemy');

    const playerDamage = state.battle.player.damage;
    let actualPlayerDamage = playerDamage;
    const enemyDamage = state.battle.enemy.damage;
    let actualEnemyDamage = enemyDamage;

    const critChance = 20;
    const critMultiplier = 1.5;

    const isCrit = () => {
      let actualCritChance = Math.floor(Math.random() * 100);
      if (actualCritChance <= critChance) {
        return true;
      } else {
        return false;
      }
    };

    const isPlayerCrit = isCrit();
    const isEnemyCrit = isCrit();

    if (
      state.battle.enemy.defenceZones.includes(state.battle.player.attackChoice)
    ) {
      actualPlayerDamage = 0;
    }

    if (
      (state.battle.enemy.defenceZones.includes(
        state.battle.player.attackChoice,
      ) &&
        isPlayerCrit) ||
      isPlayerCrit
    ) {
      actualPlayerDamage = playerDamage * critMultiplier;
    }

    if (
      !state.battle.enemy.defenceZones.includes(
        state.battle.player.attackChoice,
      ) &&
      !isPlayerCrit
    ) {
      hintEnemy.src = attack;
    }

    if (
      state.battle.enemy.defenceZones.includes(
        state.battle.player.attackChoice,
      ) &&
      !isPlayerCrit
    ) {
      hintEnemy.src = block;
    }

    if (isEnemyCrit) {
      hintPlayer.src = crit;
    }

    state.battle.enemy.health -= actualPlayerDamage;

    if (state.battle.enemy.health <= 0) {
      state.battle.enemy.health = 0;
    }

    hpPanelEnemy.style.width = `${state.battle.enemy.health}%`;
    countHpPanelEnemy.innerHTML = `${state.battle.enemy.health}`;

    hintContainerEnemy.addEventListener('animationend', () => {
      const hintImg = document.querySelector('.fight__hint-player[src]');

      if (hintImg) {
        hintImg.removeAttribute('src');
      }

      hintContainerEnemy.style.opacity = '0';
      hintContainerEnemy.style.visibility = 'hidden';
    });

    if (
      state.battle.player.defenceChoice.includes(state.battle.enemy.attackZone)
    ) {
      actualEnemyDamage = 0;
    }

    if (
      (state.battle.enemy.defenceZones.includes(
        state.battle.player.attackChoice,
      ) &&
        isEnemyCrit) ||
      isEnemyCrit
    ) {
      actualEnemyDamage = enemyDamage * critMultiplier;
    }

    if (
      !state.battle.player.defenceChoice.includes(
        state.battle.enemy.attackZone,
      ) &&
      !isEnemyCrit
    ) {
      hintPlayer.src = attack;
    }

    if (
      state.battle.player.defenceChoice.includes(
        state.battle.enemy.attackZone,
      ) &&
      !isEnemyCrit
    ) {
      hintPlayer.src = block;
    }

    if (isPlayerCrit) {
      hintEnemy.src = crit;
    }

    state.battle.player.health -= actualEnemyDamage;

    if (state.battle.player.health <= 0) {
      state.battle.player.health = 0;
    }

    hpPanelPlayer.style.width = `${state.battle.player.health}%`;
    countHpPanelPlayer.innerHTML = `${state.battle.player.health}`;

    attackButtons.forEach((attackButton) => {
      attackButton.style.pointerEvents = 'none';
    });

    defenceButtons.forEach((defenceButton) => {
      defenceButton.style.pointerEvents = 'none';
    });

    hintContainerPlayer.addEventListener('animationend', () => {
      const hintImg = document.querySelector('.fight__hint-enemy[src]');

      if (hintImg) {
        hintImg.removeAttribute('src');
      }

      hintContainerPlayer.style.opacity = '0';
      hintContainerPlayer.style.visibility = 'hidden';
      attackButton.classList.remove('waiting-attack');
      attackButton.style.cursor = 'pointer';
      attackButton.disabled = false;

      attackButtons.forEach((attackButton) => {
        attackButton.style.pointerEvents = 'unset';
      });

      defenceButtons.forEach((defenceButton) => {
        defenceButton.style.pointerEvents = 'unset';
      });
    });

    resetFight();

    createAttackLogs(
      state.battle.player,
      state.battle.enemy,
      state.battle.player.attackChoice,
      actualPlayerDamage,
      isPlayerCrit,
    );
    createAttackLogs(
      state.battle.enemy,
      state.battle.player,
      state.battle.enemy.attackZone,
      actualEnemyDamage,
      isEnemyCrit,
    );

    determineStatFight();

    logContainer.innerHTML = '';
    state.battle.log.forEach((entry) => {
      const li = document.createElement('li');
      li.classList.add('logs__item');
      li.innerHTML = entry;
      logContainer.appendChild(li);
    });

    attackButton.classList.add('waiting-attack');
    attackButton.style.cursor = 'progress';
    attackButton.disabled = true;
  };

  function resetFight() {
    if (state.battle?.enemy.health <= 0 || state.battle?.player.health <= 0) {
      attackButton.style.display = 'none';
      const managementPanel = document.querySelector(
        '.fight__buttons-container',
      );
      const resetButton = document.createElement('button');
      resetButton.classList.add('fight__reset-button');
      resetButton.textContent = 'Next!';
      managementPanel.insertAdjacentElement('afterBegin', resetButton);

      resetButton.addEventListener('click', () => {
        endGame();
        resetButton.remove();
        attackButton.style.display = 'flex';

        attackButtons.forEach((attackButton) => {
          attackButton.classList.remove('selected');
        });
        defenceButtons.forEach((defenceButton) => {
          defenceButton.classList.remove('selected');
        });

        validateChoices();
      });
    }
  }

  function endGame() {
    const actualChar = getCharacter();

    character = {
      ...actualChar,
      attackChoice: null,
      defenceChoice: [],
      health: actualChar.maxHealth,
    };

    enemy = getRandomEnemy();

    state.battle = {
      player: { ...character },
      enemy: { ...enemy },
      log: [],
    };

    renderEnemy(state.battle.enemy);
    renderPlayer(state.battle.player);

    logContainer.innerHTML = '';
  }

  function createAttackLogs(attacker, defender, attackZones, damage, isCrit) {
    let crit = isCrit ? '(Crit!)' : '';
    state.battle.log.unshift(
      `<span class="logs__accent">${attacker.name}</span> attacks
        <span class="logs__accent">${defender.name}</span>, dealing
        <span class="logs__accent">${damage}${crit}</span> damage by hitting
        <span class="logs__accent">${attackZones}</span>`,
    );
  }

  selectZone();
  validateChoices();
  resetFight();

  startFightButton.addEventListener('click', startFight);
  window.addEventListener('load', reloadFight);
  attackButton.addEventListener('click', startAttack);
  reloadButton.addEventListener('click', resetFightByCharacterChange);
  startFightBeforeDescription.addEventListener('click', createFightGame);
};

export function resetFightByCharacterChange() {
  if (state.battle?.enemy.health > 0 || state.battle?.player.health > 0) {
    const resetButton = document.querySelector('.fight__reset-button');
    if (resetButton) {
      resetButton.style.display = 'none';
      attackButton.style.display = 'flex';
    }
  }

  const newCharacter = getCharacter();
  enemy = getRandomEnemy();

  state.battle = {
    player: {
      ...newCharacter,
      attackChoice: null,
      defenceChoice: [],
      health: newCharacter.maxHealth,
    },
    enemy: { ...enemy },
    log: [],
  };

  renderEnemy(state.battle.enemy);
  renderPlayer(state.battle.player);

  attackButtons.forEach((attackButton) =>
    attackButton.classList.remove('selected'),
  );
  defenceButtons.forEach((defenceButton) =>
    defenceButton.classList.remove('selected'),
  );

  attackButton.classList.remove('waiting-attack');

  createDescriptionGame();
  validateChoices();
  logContainer.innerHTML = '';
}

export default initFight;
