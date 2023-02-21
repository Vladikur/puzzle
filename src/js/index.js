import 'normalize.css';
import '../scss/index.scss';
import gsap from 'gsap'

const mobileBox = 75
const desktopBox = 100
const mobileScreenWidth = 767
let pixelsDelta = window.innerWidth < mobileScreenWidth ? mobileBox : desktopBox

let moveCounter = 0

const pictureButton =  document.querySelector('.puzzle-menu__button')
const counterElement =  document.querySelector('.puzzle-menu__moves-counter')
const puzzleBox = document.querySelector('.puzzle__game-container')
const puzzles = puzzleBox.querySelectorAll('.puzzle__puzzle-item')
const initialPicture = puzzleBox.querySelector('.puzzle__initial-image')

const timeLine = gsap.timeline()

const InitialArr =  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
const puzzlesArr =  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]

puzzlesArr.sort(() => Math.random() - 0.5);

puzzles.forEach((puzzle, index) => {
    const flexOrder = puzzlesArr.indexOf(index)

    puzzle.style.setProperty(
        'order',
        String(flexOrder),
    )
})

function clickHandler(e) {
    const chosenPuzzleElement = e.target
    const chosenPuzzleData = Number(chosenPuzzleElement.dataset.puzzle)
    const chosenPuzzleIndex = puzzlesArr.indexOf(chosenPuzzleData)

    const emptyPuzzleData = 15
    const emptyPuzzleElement = puzzleBox.querySelector(`[data-puzzle="${emptyPuzzleData}"]`)
    const emptyPuzzleIndex = puzzlesArr.indexOf(emptyPuzzleData)

    let isEmptyElementOnLeft =
        chosenPuzzleIndex - 1 === emptyPuzzleIndex && chosenPuzzleIndex !== 4 && chosenPuzzleIndex !== 8 && chosenPuzzleIndex !== 12
    let isEmptyElementOnRight =
        chosenPuzzleIndex + 1 === emptyPuzzleIndex && chosenPuzzleIndex !== 3 && chosenPuzzleIndex !== 7 && chosenPuzzleIndex !== 11
    let isEmptyElementOnTop = chosenPuzzleIndex - 4 === emptyPuzzleIndex
    let isEmptyElementOnBottom = chosenPuzzleIndex + 4 === emptyPuzzleIndex

    if (isEmptyElementOnLeft) {
        timeLine.to(chosenPuzzleElement, {x: -pixelsDelta, duration: 0.15}).then(() => {
            changePuzzles(chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData)
        })
        timeLine.to(chosenPuzzleElement, {x: 0, duration: 0})
    }

    if (isEmptyElementOnRight) {
        timeLine.to(chosenPuzzleElement, {x: pixelsDelta, duration: 0.15}).then(() => {
            changePuzzles(chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData)
        })
        timeLine.to(chosenPuzzleElement, {x: 0, duration: 0})
    }

    if (isEmptyElementOnTop) {
        timeLine.to(chosenPuzzleElement, {y: -pixelsDelta, duration: 0.15}).then(() => {
            changePuzzles(chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData)
        })
        timeLine.to(chosenPuzzleElement, {y: 0, duration: 0})
    }

    if (isEmptyElementOnBottom) {
        timeLine.to(chosenPuzzleElement, {y: pixelsDelta, duration: 0.15}).then(() => {
            changePuzzles(chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData)
        })
        timeLine.to(chosenPuzzleElement, {y: 0, duration: 0})
    }
}

function changePuzzles (chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData) {
    chosenPuzzleElement.style.setProperty(
        'order',
        String(emptyPuzzleIndex),
    )
    emptyPuzzleElement.style.setProperty(
        'order',
        String(chosenPuzzleIndex),
    )
    puzzlesArr[emptyPuzzleIndex] = chosenPuzzleData
    puzzlesArr[chosenPuzzleIndex] = emptyPuzzleData

    moveCounter++
    counterElement.textContent = String(moveCounter)

    checkWin(InitialArr, puzzlesArr)
}

function checkWin(InitialArr, puzzlesArr) {
    let isWin = true

    InitialArr.forEach((element, index) => {
        if (element !== puzzlesArr[index]) {
            isWin = false
        }
    })

    if (isWin) {
        counterElement.innerHTML = "you won!"
        initialPicture.classList.add('_visible')
    }
}

function showPicture() {
    initialPicture.classList.add('_visible')

    setTimeout(() => {
        initialPicture.classList.remove('_visible')
    }, 2000)
}

puzzleBox.addEventListener('click', clickHandler)
pictureButton.addEventListener('click', showPicture)
window.addEventListener('resize', (e) => {
    if (e.currentTarget.innerWidth < mobileScreenWidth) pixelsDelta = mobileBox
    else pixelsDelta = desktopBox
})
