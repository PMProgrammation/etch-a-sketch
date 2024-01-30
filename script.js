"use strict";
let gridSize = 16;
let pageContent = document.querySelector(".container");
let gridSizeButton = document.querySelector("#grid-size-button");
let colorCheckbox = document.querySelector("#color-checkbox");
let gridCheckbox = document.querySelector("#grid-checkbox");
let resetButton = document.querySelector("#reset-button");
let enableGrid = gridCheckbox.checked;
let enableColors = colorCheckbox.checked;

gridSizeButton.addEventListener("click", changeGridSize);
colorCheckbox.addEventListener("change", toggleColors);
gridCheckbox.addEventListener("change", toggleGrid);
resetButton.addEventListener("click", refreshPage);

addRowsToPage();

function addRowsToPage() {
    for (let i = 1; i <= gridSize; i++) {
        let row = document.createElement("div");
        row.className = "row";
        addColumnsToRow(row);
        pageContent.appendChild(row);
    }
}

function addColumnsToRow(row) {
    for (let i = 1; i <= gridSize; i++) {
        row.append(createColumn());
    }
}

function createColumn() {
    let column = document.createElement("div");
    column.className = "column";
    if (enableGrid) {
        column.style.border = "1px solid black";
    }
    else {
        column.style.border = 0;
    }
    column.addEventListener("mouseenter", hoverEffect);
    return column;
}

function hoverEffect(event) {
    if (enableColors){
        event.target.style.backgroundColor = "hsla(" + (Math.random() * 360) + ", 100%, 50%, 1)";
    }
    else {
        event.target.style.backgroundColor = "black";
    }
}

function changeGridSize(event) {
    let newGridSize = Number(prompt("Nombre de carrés par côté (2 à 100):"));

    if (!isNaN(newGridSize) &&
            newGridSize > 1 &&
            newGridSize <= 100 &&
            newGridSize !== gridSize) {
        gridSize = newGridSize;
        refreshPage();
    }
}

function toggleColors(event) {
    enableColors = event.target.checked;
    let allSquares = document.querySelectorAll(".column");
    allSquares.forEach(square => {
        if (square.style.backgroundColor !== "" &&
            square.style.backgroundColor !== "white")
        {
            if (enableColors) {
                square.style.backgroundColor = "hsla(" + (Math.random() * 360) + ", 100%, 50%, 1)";
            }
            else {
                square.style.backgroundColor = "black";
            }
        }
    });
}

function toggleGrid(event) {
    enableGrid = event.target.checked;
    let allSquares = document.querySelectorAll(".column");
    allSquares.forEach(square => {
        if (enableGrid) {
            square.style.border = "1px solid black";
        }
        else {
            square.style.border = 0;
        }
    });
}

function refreshPage() {
    pageContent.replaceChildren();
    addRowsToPage()
}