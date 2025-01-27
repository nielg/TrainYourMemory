const displayBox = document.getElementById('display-box')
const startStopBtn = document.getElementById('start-stop-btn')
const arrowPaths = ['arrow-svg/arrow-up.svg', 'arrow-svg/arrow-down.svg', 'arrow-svg/arrow-right.svg', 'arrow-svg/arrow-left.svg']
const arrowDirectionIndex = {'ArrowUp': 0, 'ArrowDown': 1, 'ArrowRight': 2, 'ArrowLeft': 3}
let gameActive = false
let arrowGues = false
let arrowsIndexPathsToGeuse = []
let score = 0
let arrowCount = 5
let arrowsCreated = 0

const main = () =>{
    document.addEventListener('keydown', async (event) =>{
        if (gameActive){
            if (arrowGues){
                const arrowIndex = arrowDirectionIndex[event.key]
                if (arrowIndex === arrowsIndexPathsToGeuse[0]){
                    arrowGuesTrue(arrowIndex)
        
                    if (arrowsIndexPathsToGeuse.length === 0){
                        arrowGuesDone()
                    }
                }else if (arrowIndex !== undefined){
                    arrowGuesFalse()
                }
            }else{
                if ((event.key === ' ' || event.key === 'Enter') && arrowCount > arrowsCreated){
                    createArrow()
                    console.log('skip')
                }
    
            }
        }
    
    })

    startStopBtn.addEventListener('click', () =>{
        if (gameActive){
            stop()
        }else{
            start()
        }
    })
}



const stop = () =>{
    gameActive = false
    arrowGues = false
    arrowCount = 1
    arrowsIndexPathsToGeuse = []
    setScore(0)
    startStopBtn.innerHTML = 'Start'
}

const start = () =>{
    gameActive = true
    startStopBtn.innerHTML = 'Stop'
    createAndMoveArrows()
}

const createArrow = () =>{
    arrowsCreated ++
    const arrowDisplay = document.getElementById('arrow-display-screen')
    const randIndex = Math.floor(Math.random() * arrowPaths.length)
    const img = document.createElement('img')
    arrowsIndexPathsToGeuse.push(randIndex)
    img.setAttribute('src', arrowPaths[randIndex])
    img.className = 'arrow'
    arrowDisplay.appendChild(img)
    setTimeout(() => {
        arrowDisplay.removeChild(img)
    }, 1000);
}
const createAndMoveArrows = async() =>{
    for (arrowsCreated = 0; arrowsCreated < arrowCount;){
        if (gameActive){
            createArrow()
            await sleep(500)
        }else{
            break
        }
    }
    console.log('go')
    const goP = document.createElement('p')
    goP.innerHTML = 'Go'
    goP.className = 'display-popup'
    displayBox.innerHTML = ''
    displayBox.appendChild(goP)
    arrowGues = true   
    console.log(arrowsIndexPathsToGeuse)
}

const sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms))
}

const setScore = (plusScore) => {
    const scoreP = document.getElementById('score')
    if (plusScore === 0){
        score = 0
    }else{
        score += plusScore
    }
    scoreP.innerHTML = `Score: ${score}`
}

const arrowGuesTrue = (arrowIndex) =>{
    arrowsIndexPathsToGeuse.shift()
    let img = document.createElement('img')
    img.className = 'display-popup'
    img.setAttribute('src', arrowPaths[arrowIndex])
    displayBox.innerHTML = ''
    displayBox.appendChild(img)
    setScore(1)
}

const arrowGuesFalse = () =>{
    console.log('wrong')
    const img = document.createElement('img')
    img.className = 'display-popup'
    img.setAttribute('src', 'arrow-svg/cross.svg')
    displayBox.innerHTML = ''
    displayBox.appendChild(img)
    setScore(-1)
}

const arrowGuesDone = async() =>{
    arrowsIndexPathsToGeuse = []
    arrowGues = false
    // arrowCount ++
    setTimeout(() => {
        createAndMoveArrows()
    }, 1000);
}

main()