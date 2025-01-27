const bigGameOver = document.getElementById('big-game-over')
const grid = document.querySelector('.grid-tiles')
const gameOverText = document.getElementById('game-over')
const startBtn = document.getElementById('start-stop-btn')
const livesBtn = document.getElementById('lives')
let tiles = []
let indexesToTurn = []
let indexesTurned = []
let scoreBenchMarks = []
let tilesTurnedTrue = 0
let columnCount = 3
let tilesGeuseCount = 3
let score = 0
let highScore = 0
let lives = 3
let tilesClickabel = false
let gameActive = false

const main = () => {
    setGridColoms(columnCount)
    createTiles()
    startBtn.addEventListener('click', () => {
        if (startBtn.innerHTML === 'Stop '){
            stopGame()
        }else{
            startGame()
        }
    })
}

const stopGame = () =>{
    gameActive = false
    gameOverText.style.visibility = 'hidden'
    startBtn.innerHTML = 'Start'
    allTilesBlack()
}

const startGame = () => {
    allTilesBlack() 
    gameOverText.innerHTML = 'Playing'
    gameOverText.style.visibility = 'visible'
    bigGameOver.classList.remove('active')
    startBtn.innerHTML = 'Stop '

    setScore(0)
    lives = 3
    livesBtn.innerHTML = `Lives: ${lives}`
    scoreBenchMarks = []
    tiles = []
    indexesToTurn = []
    columnCount = 3
    tilesGeuseCount = 3
    setTimeout(() => {
        setTimeout(() => {
            turnRandTiles()
        }, 100);
        setGridColoms(columnCount)
        createTiles()
    }, 500);
    gameActive = true
}

const bigReset = () =>{
}


const addColumn = () => {
    columnCount ++
    setGridColoms()
    createTiles()
}
const addTilesGeuseCount = () =>{
    tilesGeuseCount ++ 
}

const setGridColoms = () =>{
    grid.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)` 
}
const createTiles = () => { 
    tiles = []
    grid.innerHTML = ''
    for (let i = 0; i < columnCount ** 2; i++){
        const tile = document.createElement('div')
        tile.classList.add('tile')
        const tileFront = document.createElement('div')
        tileFront.classList.add('tile-front')
        tile.appendChild(tileFront)
        const tileBack = document.createElement('div')
        tileBack.classList.add('tile-back')
        tile.appendChild(tileBack)

        tile.addEventListener('click', function() {
            if (tilesClickabel && gameActive){
                if (indexesToTurn.includes(i)){
                    tile.classList.toggle('fliped');
                    setScore(1)
                    tilesTurnedTrue ++
                    indexesToTurn.splice(indexesToTurn.indexOf(i), 1)
                    indexesTurned.push(i)
                }else if (!indexesTurned.includes(i)){
                    tile.classList.toggle('fliped')
                    indexesTurned.push(i)
                    setScore(-1)
                    lives --
                    livesBtn.innerHTML = `Lives: ${lives}`
                }
                checkGameState()
            }
        })
        tiles.push(tile)
        grid.appendChild(tile)
    }
}

const gameOver = () =>{
    setTimeout(() => {
        gameActive = false
        gameOverText.innerHTML = 'Game-Over'
        bigGameOver.classList.add('active')
    
        setTimeout(() => {
            tiles.forEach(tile => {
                const tileBack = tile.querySelector('.tile-back')
                if (tileBack.classList.contains('white')){
                    tile.classList.add('fliped')
                }
                setTimeout(() => {
                    startBtn.innerHTML = 'Try Again'
                    bigGameOver.classList.add('pull-back')
                    setTimeout(() => {
                        bigGameOver.classList.remove('pull-back')
                        bigGameOver.classList.remove('active')
                    }, 1000);
                }, 500);
            })
        }, 1250);
    }, 750);
    
}

const checkGameState = () =>{
    if (lives === 0 && gameActive){
        gameOver()
    // Check if all tiles are Turned
    }else if (tilesTurnedTrue === tilesGeuseCount && gameActive){
        tilesClickabel = false
        setTimeout(() => {
            if (gameActive){
                allTilesBlack()
                setTimeout(() => {
                    if (gameActive){
                        setTimeout(() => {
                            turnRandTiles()
                        }, 500);
                        gameProgress(score)
                    }
                }, 500);
            }
        }, 1000);
    }
}

const setScore = (plusScore) => {
    const scoreP = document.getElementById('score-span')
    if (plusScore === 0){
        score = 0
    }else{
        score += plusScore * (columnCount ** 2)
        if (score > highScore){
            highScore = score
            const highScoreSpan = document.getElementById('high-score-span')
            highScoreSpan.innerHTML = `${highScore} :Highscore`
        }
    }
    scoreP.innerHTML = `Score: ${score}`
}

const allTilesBlack = () =>{
    tilesTurnedTrue = 0
    tiles.forEach(tile => {
        tile.classList.remove('fliped')
    });
}


const turnRandTiles = () =>{
    if (gameActive){
        indexesToTurn = []
        indexesTurned = []
        tilesClickabel = false
        tiles.forEach(tile => {
            const tileBack = tile.querySelector('.tile-back')
            tileBack.classList.remove('white')
        });
    
        while (indexesToTurn.length !== tilesGeuseCount){
            const randIndex = Math.floor(Math.random() * tiles.length)
            if (!indexesToTurn.includes(randIndex)){
                indexesToTurn.push(randIndex)
                const tileBack = tiles[randIndex].querySelector('.tile-back')
                tileBack.classList.add('white')
                tiles[randIndex].classList.toggle('fliped')
            }
        }
        setTimeout(() => {
            allTilesBlack()
            tilesClickabel = true
        }, 1000);
    }
}











const gameProgress = (score) => {   
    if (score > 1500 && !scoreBenchMarks.includes(1500)){
        addColumn()
        addTilesGeuseCount
        scoreBenchMarks.push(1500)
    }
    else if (score > 900 && !scoreBenchMarks.includes(900)){
        addTilesGeuseCount()
        scoreBenchMarks.push(900)
    }else if (score > 700 && !scoreBenchMarks.includes(700)){
        addTilesGeuseCount()
        scoreBenchMarks.push(700)
    }else if (score > 500 && !scoreBenchMarks.includes(500)){
        addTilesGeuseCount()
        scoreBenchMarks.push(500)
    }else if (score > 400 && !scoreBenchMarks.includes(400)){
        scoreBenchMarks.push(400)
        addColumn()
    }else if (score > 300 && !scoreBenchMarks.includes(300)){
        scoreBenchMarks.push(300)
        addTilesGeuseCount()
    }else if (score > 200 && !scoreBenchMarks.includes(200)){
        scoreBenchMarks.push(200)
        addTilesGeuseCount()
    }else if (score > 100 && !scoreBenchMarks.includes(100)){
        scoreBenchMarks.push(100)
        addColumn()
    }else if (score > 50 && !scoreBenchMarks.includes(50)){
        scoreBenchMarks.push(50)
        addTilesGeuseCount()
    }
}














main()




