const DEFAULT_COLOR = '#b1b0a5'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const resetBtn = document.getElementById('resetBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')
const saveBtn = document.getElementById("saveBtn");


colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
resetBtn.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)
saveBtn.onclick = saveGrid;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid() {
  resetGrid()
  setupGrid(currentSize)
}

function resetGrid() {
  grid.innerHTML = ''
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    gridElement.addEventListener('mouseover', changeColor)
    gridElement.addEventListener('mousedown', changeColor)
    grid.appendChild(gridElement)
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newMode === 'color') {
    colorBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}

function saveGrid() {
  // Calculate the total size of the grid
  const gridSize = currentSize;
  const cellSize = grid.offsetWidth / gridSize;
  const gridWidth = cellSize * gridSize;
  const gridHeight = cellSize * gridSize;
  
  // Create a canvas element with the grid size
  const canvas = document.createElement('canvas');
  canvas.width = gridWidth;
  canvas.height = gridHeight;
  const ctx = canvas.getContext('2d');
  
  // Set canvas background color to white
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, gridWidth, gridHeight);
  
  // Draw each grid element individually
  const gridItems = document.querySelectorAll('.grid-element');
  gridItems.forEach((item) => {
    const itemStyle = getComputedStyle(item);
    const backgroundColor = itemStyle.backgroundColor;
    const borderColor = itemStyle.borderColor; // Added border color
    const itemRect = item.getBoundingClientRect();
    const itemX = itemRect.left - grid.getBoundingClientRect().left;
    const itemY = itemRect.top - grid.getBoundingClientRect().top;
    
    // Draw border rectangle
    ctx.strokeStyle = borderColor; // Set border color
    ctx.lineWidth = 1; // Border width
    ctx.strokeRect(itemX, itemY, cellSize, cellSize);
    
    // Draw background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(itemX + 1, itemY + 1, cellSize - 2, cellSize - 2); // Adjusted position and size to include the border
    
  });
  
  // Convert the canvas to a JPEG image
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
  
    // Create a temporary link element to download the image
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dumplingMagic.jpg';
    link.click();
  
    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  }, 'image/jpeg');
}

  
  
window.onload = () => {
  setupGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}
