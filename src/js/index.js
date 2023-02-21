import 'normalize.css';
import '../scss/index.scss';
import gsap from 'gsap'

let moveCounter = 0
const counterElement =  document.querySelector('.puzzle-menu__moves-counter')
const puzzleBox = document.querySelector('.puzzle__game-container')
const puzzles = puzzleBox.querySelectorAll('.puzzle__puzzle-item')

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
        changePuzzles(chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData)
    }

    if (isEmptyElementOnRight) {
        changePuzzles(chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData)
    }

    if (isEmptyElementOnTop) {
        changePuzzles(chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData)
    }

    if (isEmptyElementOnBottom) {
        changePuzzles(chosenPuzzleElement, emptyPuzzleElement, emptyPuzzleIndex, chosenPuzzleIndex, chosenPuzzleData, emptyPuzzleData)
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
    console.log(checkWin(InitialArr, puzzlesArr))
}

function checkWin(InitialArr, puzzlesArr) {
    let isWin = true

    InitialArr.forEach((element, index) => {
        if (element !== puzzlesArr[index]) {
            isWin = false
        }
    })

    return isWin
}

puzzleBox.addEventListener('click', clickHandler)
