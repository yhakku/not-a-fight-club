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
    // TODO2: Всё равно получаю иногда 1 элемент, вместо 2(перепроверить)
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
  } else {
    attackButton.disabled = true;
  }
};

export const initFight = () => {
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

    renderEnemy(state.battle.enemy);
    renderPlayer(state.battle.player);
  };

  const reloadFight = () => {
    attackButtons.forEach((attackButton) => {
      if (attackButton.textContent === state.battle?.player.attackChoice) {
        attackButton.classList.add('selected');
      }
    });

    defenceButtons.forEach((defenceButton) => {
      state.battle?.player.defenceChoice.forEach((choice) => {
        if (defenceButton.textContent === choice) {
          defenceButton.classList.add('selected');
        }
      });
    });

    renderEnemy(state.battle?.enemy);
    renderPlayer(state.battle?.player);
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
            state.battle.player.attackChoice = attackButton.textContent;
          }

          if (state.battle?.player.attackChoice !== attackButton.textContent) {
            attackButton.classList.add('selected');
            state.battle.player.attackChoice = attackButton.textContent;
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
        const zone = defenceButton.textContent;
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

    if (
      state.battle.enemy.defenceZones.includes(state.battle.player.attackChoice)
    ) {
      state.battle.player.damage * 0;
    } else {
      state.battle.enemy.health -= state.battle.player.damage;

      if (state.battle.enemy.health <= 0) {
        state.battle.enemy.health = 0;
      }

      hpPanelEnemy.style.width = `${state.battle.enemy.health}%`;
      countHpPanelEnemy.innerHTML = `${state.battle.enemy.health}`;
    }

    if (
      state.battle.player.defenceChoice.includes(state.battle.enemy.attackZone)
    ) {
      state.battle.enemy.damage * 0;
    } else {
      state.battle.player.health -= state.battle.enemy.damage;

      if (state.battle.player.health <= 0) {
        state.battle.player.health = 0;
      }

      hpPanelPlayer.style.width = `${state.battle.player.health}%`;
      countHpPanelPlayer.innerHTML = `${state.battle.player.health}`;
    }

    resetFight();
  };

  function resetFight() {
    if (state.battle?.enemy.health <= 0 || state.battle?.player.health <= 0) {
      attackButton.style.display = 'none';
      const attackPanel = document.querySelector('.attack-panel');
      const resetButton = document.createElement('button');
      resetButton.classList.add('fight__reset-button');
      attackPanel.insertAdjacentElement('afterend', resetButton); // TODO: Изучить подробнее

      resetButton.addEventListener('click', () => {
        endGame();
        resetButton.style.display = 'none';
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
    character = {
      ...getCharacter(),
      attackChoice: null,
      defenceChoice: [],
      health: character.maxHealth,
    };

    enemy = getRandomEnemy();

    state.battle = {
      player: { ...character },
      enemy: { ...enemy },
      log: [],
    };

    renderEnemy(state.battle.enemy);
    renderPlayer(state.battle.player);
  }

  selectZone();
  validateChoices();
  resetFight();

  startFightButton.addEventListener('click', startFight);
  window.addEventListener('load', reloadFight);
  attackButton.addEventListener('click', startAttack);

  // const attackButton = document.querySelector('.fight__fight-button');
  // const attackButtons = document.querySelectorAll(
  //   '.attack-panel .fight__button',
  // );
  // const defenceButtons = document.querySelectorAll(
  //   '.defence-panel .fight__button',
  // );
  // const charactersLink = document.querySelector('a[href="#characters"]');
  // const settingsLink = document.querySelector('a[href="#settings"]');
  // const selectedChars = document.querySelectorAll('.characters__selected');
  // const zones = ['Head', 'Neck', 'Body', 'Belly', 'Legs'];

  // const data = loadState();
  // if (data.user.nickname) {
  //   state.user.nickname = data.user.nickname;
  // }
  // const getCharacters = () => {
  //   const characters = state.user.characters;
  //   return characters[data.user.avatarId];
  // };

  // let character = getCharacters();

  // const selectedZone = () => {
  //   attackButtons.forEach((button) => {
  //     button.addEventListener('click', () => {
  //       attackButtons.forEach((btn) => {
  //         btn.classList.remove('selected');
  //         button.classList.add('selected');
  //         character.attackChoice = button.textContent;
  //         validateChoices();
  //       });
  //     });
  //     defenceButtons.forEach((button) => {
  //       button.addEventListener('click', () => {
  //         const zone = button.textContent;
  //         if (character.defenceChoice.includes(zone)) {
  //           character.defenceChoice = character.defenceChoice.filter(
  //             (z) => z !== zone,
  //           );
  //           button.classList.remove('selected');
  //         } else {
  //           if (character.defenceChoice.length < 2) {
  //             character.defenceChoice.push(zone);
  //             button.classList.add('selected');
  //           }
  //         }
  //         validateChoices();
  //       });
  //     });
  //   });
  // };
  // const validateChoices = () => {
  //   if (character.attackChoice && character.defenceChoice.length === 2) {
  //     attackButton.classList.remove('disabled');
  //   } else {
  //     attackButton.classList.add('disabled');
  //   }
  // };
  // selectedZone();
  // validateChoices();
  //
  // const startFight = () => {
  //   if (state.battle === null) {
  //     state.battle = {
  //       player: { ...character },
  //       enemy: { ...enemy },
  //       log: [],
  //     };
  //     renderEnemy(state.battle.enemy);
  //     renderPlayer(state.battle.player);
  //     saveState(state);
  //   }
  //   if (state.battle !== null) {
  //     reloadFight();
  //   }
  //   if (state.user.avatarId !== character.avatarId) {
  //     renderEnemy(state.battle.enemy);
  //     renderPlayer(state.battle.player);
  //   }
  // };
  // const reloadFight = () => {
  //   const data = loadState();
  //   state.battle = {
  //     player: { ...data.battle.player },
  //     enemy: { ...data.battle.enemy },
  //     log: [...data.battle.log],
  //   };
  //   renderEnemy(state.battle.enemy);
  //   renderPlayer(state.battle.player);
  //   const logContainer = document.querySelector('.logs__list');
  //   logContainer.innerHTML = '';
  //   state.battle.log.forEach((entry) => {
  //     const li = document.createElement('li');
  //     li.classList.add('logs__item');
  //     li.innerHTML = entry;
  //     logContainer.appendChild(li);
  //   });
  // };
  // const updateFight = () => {
  //   state.battle = {
  //     player: getCharacters(),
  //     enemy: enemy,
  //     log: [],
  //   };
  //   renderEnemy(character);
  //   renderPlayer(enemy);
  // };
  // const getCriticalHitChance = () => {
  //   const criticalHitRate = 20;
  //   const randomNumber = Math.floor(Math.random() * 100);
  //   if (randomNumber <= criticalHitRate) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  // const startAttack = () => {
  //   const { player, enemy, log } = state.battle;
  //   const { enemyAttackZone, enemyDefenceZone } = getEnemyChoice();
  //   const hpPlayer = document.querySelector('.hp-control__hp-player');
  //   const hpEnemy = document.querySelector('.hp-control__hp-enemy');
  //   const logContainer = document.querySelector('.logs__list');
  //   const hpCountPlayer = document.querySelector('.hp-control__count-player');
  //   const hpCountEnemy = document.querySelector('.hp-control__count-enemy');
  //   const critPlayer = getCriticalHitChance();
  //   const critEnemy = getCriticalHitChance();
  //   const criticalImpactRatio = 1.5;
  //   let damagePlayer = player.damage;
  //   let damageEnemy = enemy.damage;
  //   let isProtectionEnemy = enemyDefenceZone
  //     .join(' ')
  //     .includes(character.attackChoice);
  //   let isProtectionPlayer = character.defenceChoice
  //     .join(' ')
  //     .includes(enemyAttackZone.join(''));
  //   if (isProtectionEnemy) {
  //     damagePlayer = 0;
  //   }
  //   if (isProtectionPlayer) {
  //     damageEnemy = 0;
  //   }
  //   if (critPlayer) {
  //     damagePlayer *= criticalImpactRatio;
  //   } else if (isProtectionEnemy) {
  //     damagePlayer = 0;
  //   }
  //   if (critEnemy) {
  //     damageEnemy *= criticalImpactRatio;
  //   } else if (isProtectionPlayer) {
  //     damageEnemy = 0;
  //   }
  //   if (isProtectionEnemy && !critPlayer) {
  //     damagePlayer = 0;
  //   }
  //   if (isProtectionPlayer && !critEnemy) {
  //     damageEnemy = 0;
  //   }
  //   enemy.health -= damagePlayer;
  //   player.health -= damageEnemy;
  //   const getHPPlayer = () => {
  //     if (player.health < 0) {
  //       player.health = 0;
  //     }
  //     return player.health;
  //   };
  //   const getHPEnemy = () => {
  //     if (enemy.health < 0) {
  //       enemy.health = 0;
  //     }
  //     return enemy.health;
  //   };
  //   hpPlayer.style.width = `${getHPPlayer()}%`;
  //   hpEnemy.style.width = `${getHPEnemy()}%`;
  //   hpCountPlayer.innerHTML = `${player.health}`;
  //   hpCountEnemy.innerHTML = `${enemy.health}`;
  //   const createAttackLogs = (attacker, defender, attackZones, damage) => {
  //     attackZones.forEach((zone) => {
  //       const critText = damage > 25 ? ' (Crit!)' : '';
  //       log.unshift(
  //         `<span class="logs__accent">${attacker.name}</span> attacks
  //        <span class="logs__accent">${defender.name}</span>, dealing
  //        <span class="logs__accent">${damage}${critText}</span> damage by hitting ${zone}`,
  //       );
  //     });
  //   };
  //   createAttackLogs(player, enemy, [character.attackChoice], damagePlayer);
  //   createAttackLogs(enemy, player, enemyAttackZone, damageEnemy);
  //   if (player.health <= 0 && enemy.health <= 0) {
  //     log.unshift(`<span class="logs__accent">Draw!</span>`);
  //     player.stats.win += 1;
  //     player.stats.lose += 1;
  //     saveState(state);
  //     endGame();
  //   } else if (player.health <= 0) {
  //     log.unshift(`<span class="logs__accent">${enemy.name}</span> wins!`);
  //     player.stats.lose += 1;
  //     saveState(state);
  //     endGame();
  //   } else if (enemy.health <= 0) {
  //     log.unshift(`<span class="logs__accent">${player.name}</span> wins!`);
  //     player.stats.win += 1;
  //     saveState(state);
  //     endGame();
  //   }
  //   logContainer.innerHTML = '';
  //   log.forEach((entry) => {
  //     const li = document.createElement('li');
  //     li.classList.add('logs__item');
  //     li.innerHTML = entry;
  //     logContainer.appendChild(li);
  //   });
  //   saveState(state);
  // };
  // const getEnemyChoice = () => {
  //   const shuffled = [...zones].sort(() => 0.5 - Math.random());
  //   const enemyAttackZone = shuffled.slice(0, enemy.attackZone);
  //   const shuffled2 = [...zones].sort(() => 0.5 - Math.random());
  //   const enemyDefenceZone = shuffled2.slice(0, enemy.defenceZone);
  //   return { enemyAttackZone, enemyDefenceZone };
  // };
  // const endGame = () => {
  //   const attackPanel = document.querySelector('.attack-panel');
  //   attackButton.style.display = 'none';
  //   const resetButton = document.createElement('button');
  //   resetButton.classList.add('fight__reset-button');
  //   attackPanel.insertAdjacentElement('afterend', resetButton);
  //   resetButton.addEventListener('click', () => {
  //     const index = state.user.avatarId;
  //     character = {
  //       ...state.user.characters[index],
  //       attackChoice: null,
  //       defenceChoice: [],
  //       health: state.user.characters[index].maxHealth,
  //     };
  //     enemy = { ...enemy, health: enemy.maxHealth };
  //     state.battle = {
  //       player: { ...character },
  //       enemy: { ...enemy },
  //       log: [],
  //     };
  //     renderEnemy(state.battle.enemy);
  //     renderPlayer(state.battle.player);
  //     resetButton.style.display = 'none';
  //     attackButton.style.display = 'flex';
  //     attackButtons.forEach((btn) => btn.classList.remove('selected'));
  //     defenceButtons.forEach((btn) => btn.classList.remove('selected'));
  //     validateChoices();
  //     const logContainer = document.querySelector('.logs__list');
  //     logContainer.innerHTML = '';
  //     state.battle.log.forEach((entry) => {
  //       const li = document.createElement('li');
  //       li.classList.add('logs__item');
  //       li.innerHTML = entry;
  //       logContainer.appendChild(li);
  //     });
  //     saveState(state);
  //   });
  // };
  // if (state.battle !== null) {
  //   if (data.battle.player.health <= 0 || data.battle.enemy.health <= 0) {
  //     endGame();
  //   }
  // }
  // charactersLink.classList.add('disabled');
  // settingsLink.classList.add('disabled');
  // attackButton.addEventListener('click', startAttack);
  // startFightButton.addEventListener('click', startFight);
  // window.addEventListener('load', reloadFight);
  // charactersLink.addEventListener('click', initChars);
  // selectedChars.forEach((selectedChar) => {
  //   selectedChar.addEventListener('click', updateFight);
  // });
};

export function resetFightByCharacterChange() {
  if (state.battle?.enemy.health > 0 || state.battle?.player.health > 0) {
    const resetButton = document.querySelector('.fight__reset-button');
    resetButton.style.display = 'none';
    attackButton.style.display = 'flex';
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

  validateChoices();
}

export default initFight;
