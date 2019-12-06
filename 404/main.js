const game = document.getElementById("game")
const flag = document.getElementById("flag")
const nextBtn = document.getElementById("nextBtn")
const levelNumber = document.getElementById("level")



var selectedLevel = parseInt(sessionStorage.getItem('level'))


if (sessionStorage.key('level') === null) {
  selectedLevel = 0
  sessionStorage.setItem('level', selectedLevel)
}


levelNumber.innerHTML = selectedLevel + 1

nextLevel = () => {
  location.reload()
}

resetProgression = () => {
  localStorage.setItem('level', 0)
  location.reload()
}

var newObstacle

const gridSize = {
  height: window.getComputedStyle(game).gridTemplateRows.split(' ').length,
  width: window.getComputedStyle(game).gridTemplateColumns.split(' ').length
}


const levels = [
    [ 'A', 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 99],

    [ 'A', 0, 0, -1, 99,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, -1],

    [ 'A', 0, 0, 0, 'B',
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 99, 0, 0,
      0, 0, 0, 0, 0],

    [ 'A', 0, 'B', 0, 0,
      0, -1, 99, -1, 0,
      0, -1, -1, -1, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0],

    [ 0, 0, 0, 0, 0,
      0, 0, 'B', 99, 0,
      0, 0, 'A', 0, 0,
      0, 0, 0, 0, 'C',
      0, 0, 0, 0, 0],

    [ 0, 0, 0, 'B', 0,
      0, -1, -1, 0, 0,
      0, -1, 99, 0, 0,
      0, 0, 0, 0, 0,
      'A', 0, 0, 0, 0],

    [ 0, 0, 0, 0, 'B',
      0, 0, 0, -1, -1,
      0, 0, 0, 99, 0,
      0, 0, 0, 0, -1,
      0, 0, 0, 0, 'A'],

    [ 'A', 0, 0, 0, 0,
      0, 0, -1, 0, 0,
      0, 'B', 99, -1, 'C',
      0, 0, -1, 0, 0,
      0, 0, 0, 0, 0],

]

var obstacles = []



let level = levels[selectedLevel]
for (let i = 0; i < level.length; i++) {

    if (level[i] === -1) {

      obstacles.push(i)
      newObstacle = document.createElement('div')
      newObstacle.classList.add('obstacle')

      newObstacle.style.gridRow = parseInt(i / gridSize.width) + 1 + ' / auto'
      newObstacle.style.gridColumn = i - parseInt(i / gridSize.width) * gridSize.width + 1 + ' / auto'

      game.appendChild(newObstacle)
    }

    else if (level[i] === 99) {
      flag.style.gridRow = parseInt(i / gridSize.width) + 1 + ' / auto'
      flag.style.gridColumn = i - parseInt(i / gridSize.width) * gridSize.width + 1 + ' / auto'
    }

    else if (level[i] !== 0) {
      newPlayer = document.getElementById('player' + level[i])
      newPlayer.classList.add('visible')

      newPlayer.style.gridRow = parseInt(i / gridSize.width) + 1 + ' / auto'
      newPlayer.style.gridColumn = i - parseInt(i / gridSize.width) * gridSize.width + 1 + ' / auto'
    }

}



const flagPosition = {
  y: parseInt(window.getComputedStyle(flag).gridRow.split('/')[0]),
  x: parseInt(window.getComputedStyle(flag).gridColumn.split('/')[0])
}


actualPosition = playerId => {
  let player = document.getElementById(playerId)
  let actualPosition = {
    y: parseInt(window.getComputedStyle(player).gridRow.split('/')[0]),
    x: parseInt(window.getComputedStyle(player).gridColumn.split('/')[0])
  }

  return actualPosition
}

move = (playerId, direction) => {
  let player = document.getElementById(playerId)

  switch (direction) {
    case 'up':
      while ( !obstacles.includes( actualPosition(playerId).x + ((actualPosition(playerId).y - 1) * gridSize.width) - gridSize.width - 1)
      && actualPosition(playerId).y > 1
      && (
        (!(actualPosition(playerId).y - 1 === actualPosition('playerA').y)
      || !(actualPosition(playerId).x === actualPosition('playerA').x))
        ||  !(actualPosition(playerId).y - 1 === actualPosition('playerB').y)
      || !(actualPosition(playerId).x === actualPosition('playerB').x))
      && (!(actualPosition(playerId).y - 1 === actualPosition('playerC').y)
      || !(actualPosition(playerId).x === actualPosition('playerC').x)))
     {
        player.style.gridRow = actualPosition(playerId).y - 1 + '/ auto'
      }
      break;

    case 'down':
      while ( !obstacles.includes( actualPosition(playerId).x + ((actualPosition(playerId).y - 1) * gridSize.width) + gridSize.width - 1)
      && actualPosition(playerId).y < gridSize.height
      && (
        (
          !(actualPosition(playerId).y + 1 === actualPosition('playerA').y)
        || !(actualPosition(playerId).x === actualPosition('playerA').x))
        || !(actualPosition(playerId).y + 1 === actualPosition('playerB').y)
      || !(actualPosition(playerId).x === actualPosition('playerB').x))
      && (!(actualPosition(playerId).y + 1 === actualPosition('playerC').y)
      || !(actualPosition(playerId).x === actualPosition('playerC').x))
    ) {
        player.style.gridRow = actualPosition(playerId).y + 1 + '/ auto'
      }
      break;

    case 'left':
      while ( !obstacles.includes( actualPosition(playerId).x + ((actualPosition(playerId).y - 1) * gridSize.width) - 2)
      && actualPosition(playerId).x > 1

      && ((!(actualPosition(playerId).y === actualPosition('playerA').y)
    || !(actualPosition(playerId).x - 1 === actualPosition('playerA').x))
        &&(!(actualPosition(playerId).y === actualPosition('playerB').y)
      || !(actualPosition(playerId).x - 1 === actualPosition('playerB').x))
      && (!(actualPosition(playerId).y === actualPosition('playerC').y)
      || !(actualPosition(playerId).x - 1 === actualPosition('playerC').x)))) {
        player.style.gridColumn = actualPosition(playerId).x - 1 + '/ auto'
      }
      break;

    case 'right':
      while ( !obstacles.includes( actualPosition(playerId).x + ((actualPosition(playerId).y - 1) * gridSize.width))
      && actualPosition(playerId).x < gridSize.width
      && (
        (!(actualPosition(playerId).y === actualPosition('playerA').y)
      || !(actualPosition(playerId).x + 1 === actualPosition('playerA').x))
      &&
        (!(actualPosition(playerId).y === actualPosition('playerB').y)
      || !(actualPosition(playerId).x + 1 === actualPosition('playerB').x))
      && (!(actualPosition(playerId).y === actualPosition('playerC').y)
      || !(actualPosition(playerId).x + 1 === actualPosition('playerC').x)))) {
        player.style.gridColumn = actualPosition(playerId).x + 1 + '/ auto'
      }
      break;
  }

    if (flagPosition.x === actualPosition('playerA').x && flagPosition.y === actualPosition('playerA').y) {
      sessionStorage.setItem('level', selectedLevel + 1)
      nextBtn.disabled = false
    }


  return null
}


// Player A


Mousetrap
.bind('up', () => {
  move('playerA', 'up')
})
.bind('down', () => {
  move('playerA', 'down')
})

.bind('left', () => {
  move('playerA', 'left')
})
.bind('right', () => {
  move('playerA', 'right')
})



// Player B

Mousetrap
.bind('i', () => {
  move('playerB', 'up')
})
.bind('k', () => {
  move('playerB', 'down')
})

.bind('j', () => {
  move('playerB', 'left')
})
.bind('l', () => {
  move('playerB', 'right')
})



// Player C

Mousetrap
.bind('z', () => {
  move('playerC', 'up')
})
.bind('s', () => {
  move('playerC', 'down')
})

.bind('q', () => {
  move('playerC', 'left')
})
.bind('d', () => {
  move('playerC', 'right')
})
