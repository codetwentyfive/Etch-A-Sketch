const grid = document.getElementById("grid");
const resetBtn = document.getElementById("resetButton");
const rainbowBtn = document.getElementById("rainbowButton");

resetBtn.onclick = () => reloadGrid ();

function makeRows(rows, cols) {
    grid.style.setProperty("--grid-rows", rows);
    grid.style.setProperty("--grid-cols", cols);

    let isMouseDown = false; //tracks whether mouse button is pressed or not

    for (let c = 0; c < rows * cols; c++) {
        let cell = document.createElement("div");
        cell.className = "grid-item";

        // Added mousedown and mouseover listeners to each grid item
        cell.addEventListener('mousedown', function () {
            isMouseDown = true;
            this.style.backgroundColor = "black";
            // Added global listener for mousemove events while button is held down

            window.addEventListener('mousemove', function (e) {
                if (isMouseDown && e.target.classList.contains('grid-item')) {
                    e.target.style.backgroundColor = "black";
                }
            });
        });

        // Added mouseup listener to stop coloring cells when button is released
        window.addEventListener('mouseup', function () {
            isMouseDown = false;
        });
        grid.appendChild(cell);
    }
}


function reloadGrid() {
    resetGrid()
    makeRows(16, 16);
  }
  
  function resetGrid() {
    grid.innerHTML = ''
  }
  

makeRows(16, 16);



