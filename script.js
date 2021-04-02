let map = [
    "WWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W   B W",
    "W W W WWW WWWWW W W WMWW  W",
    "W WPW MIW     W W   W  WWWW",
    "W WWWWWWW W WWW W W W   W W",
    "W         W     W W W W W F",
    "W WWW WWWWW WWWWW W W W W W",
    "W W   W   W W M   W W W W W",
    "W WWWWW W W W W W W   W W W",
    "S     W W W W W W WWW W   W",
    "WWWWW W W W W W W W W W W W",
    "W     W W W   W W W W W   W",
    "W WWWWWWW WWWWW W W W W W F",
    "W       W       W   W     W",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWW",
];

const main = document.querySelector('main')
let playerLine = 0
let playerColumn = 0

for (let i = 0; i < map.length; i++) {
    const divLine = document.createElement('div');
    divLine.style.display = 'flex';
    main.appendChild(divLine)
    for (let j = 0; j < map[i].length; j++) {
        const div = document.createElement('div');
        div.classList.add('square')
        divLine.appendChild(div);
        div.id = `div${i}-${j}`
        if (map[i][j] === 'W') {
            div.classList.add('wall')
        }
        if (map[i][j] === 'S') {
            const player = document.createElement('div')
            player.id = 'player'
            div.appendChild(player)
            playerLine = i;
            playerColumn = j;
        }
        if (map[i][j] === 'I') {
          div.classList.add('item')
      }
        if (map[i][j] === 'M') {
          div.classList.add('monster')
      }
        if (map[i][j] === 'P') {
          div.classList.add('potion')
      }
        if (map[i][j] === 'B') {
          div.appendChild(document.getElementById('boss'))
          // div.classList.add('boss')
        }
    }
}

const movePlayer = {
  'ArrowDown' : () => {
    if (map[playerLine+1][playerColumn] !== 'W'){
      playerLine += 1
      player.classList = 'slideBottom'
    }
  },
  'ArrowUp' : () => {
    if (map[playerLine-1][playerColumn] !== 'W'){
      playerLine -= 1
      player.classList = 'slideTop'
    }
  },
  'ArrowLeft' : () => {
    const nextPosition = map[playerLine][playerColumn-1];
    if (nextPosition === undefined || nextPosition === 'W') {return}
    playerColumn -= 1
    player.classList = 'slideLeft'
  },
  'ArrowRight' : () => {
    const nextPosition = map[playerLine][playerColumn+1];
    if (nextPosition === undefined || nextPosition === 'W') {return}
    playerColumn += 1
    player.classList = "slideRight"
  }
}

function appendPlayer() {
  const currentDiv = document.getElementById(`div${playerLine}-${playerColumn}`)
  currentDiv.appendChild(document.getElementById('player'))  
}

const modalBg = document.querySelector('#modalBgWin')
const modalBgLose = document.getElementById('modalBgLose')
const modal = document.querySelector('#modalWin')

function updateStatus() {
  const playerHealth = document.getElementById('healthbar')
  const playerLevelUp = document.getElementById('level') 
  
  playerHealth.style.width = health + '%'
  playerLevelUp.innerText = 'Level ' + level
}

function checkWin() {
  if (map[playerLine][playerColumn] === 'F') {
    modal.classList.add('is-active')
    const winSound = document.getElementById("soundWin"); 
    winSound.volume = 0.3;
    winSound.play();
    health = 100
    level = 1
    updateStatus()
  }
}

function checkDeath() {
  if (health <= 0) {
    document.querySelector('#modalLose').classList.add('is-active')
    health = 100
    level = 1
  } 
  updateStatus()
}

modalBg.addEventListener('click', () => {
  modal.classList.remove('is-active')
  document.querySelector('#modalLose').classList.remove('is-active')
  const startingPosition = document.getElementById('div9-0');
  startingPosition.appendChild(player)
  playerLine = 9;
  playerColumn = 0;
})

modalBgLose.addEventListener('click', () => {
  modal.classList.remove('is-active')
  document.querySelector('#modalLose').classList.remove('is-active')
  const startingPosition = document.getElementById('div9-0');
  startingPosition.appendChild(player)
  playerLine = 9;
  playerColumn = 0;
})

let chosenClass = 'Warrior'
let username = 'Player'
let health = 100
let level = 1

function checkItem() {
  if (map[playerLine][playerColumn] === 'I') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('item')
    level += 10
    map[playerLine] = map[playerLine].replace(/I/,'X')
  }
  if (map[playerLine][playerColumn] === 'P') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('potion')
    health += 10
    map[playerLine] = map[playerLine].replace(/P/,'X')
  }
  if (map[playerLine][playerColumn] === 'M') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('monster')
    health -= 30
    level += 7
    map[playerLine] = map[playerLine].replace(/M/,'X')
  }
  if (map[playerLine][playerColumn] === 'B') {
    document.getElementById('boss').style.display = 'none'
    health -= 80;
    level += 50;
    map[playerLine] = map[playerLine].replace(/B/,'X')
  }
  if (health < 0) {health = 0}
  if (health > 100) {health = 100} 

  updateStatus()
}

document.addEventListener('keydown', (event) => {
  if (map[playerLine][playerColumn] !== 'F') movePlayer[event.key]()
  appendPlayer()
  checkWin()
  checkItem()
  checkDeath()
});


function start() {
  setInterval(() => {
    document.getElementById('main').classList.toggle('activated')
  }, 2000)
}

window.addEventListener('load',start)

function showPlayerInfo() {
  const playerName = document.getElementById('nickname')
  const playerClass = document.getElementById('class')
  const playerLevel = document.getElementById('level')
  playerName.innerText = username
  playerClass.innerText = chosenClass
  playerLevel.innerText = 'Level ' + level 
}

const startGame = document.getElementById('startGame')
startGame.addEventListener('click', () => {
  chosenClass = document.querySelector('option:checked').value
  username = document.querySelector('#username').value
  document.getElementById('login').classList.remove('is-active')
  showPlayerInfo()

  const player = document.getElementById('player')
  if (chosenClass === 'Rogue') {
  player.style.backgroundImage = 'url(./assets/rogue1.png)'
  }
  if (chosenClass === 'Mage') {
  player.style.backgroundImage = 'url(./assets/mage1.png)'
  }
  const soundDefault = document.getElementById('soundDefault')
  soundDefault.volume = 0.3;
  soundDefault.loop = true;
  soundDefault.play();
})

// LEVEL BY STEPS SHOW ON THE RIGHT (guardado numa variável global)
// MONSTERS BY LEVEL
// GAME OVER
// MEDIEVAL BLOCKS
// SECRET PASSAGES (DOORS, ITEMS)
// HERO HP AND POTIONS AROUND THE MAP
// TRAPS AROUND THE MAP
