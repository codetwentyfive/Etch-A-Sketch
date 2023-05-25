const container = document.getElementById("container");
function makeRows(rows, cols) {
    container.style.setProperty("--grid-rows", rows);
    container.style.setProperty("--grid-cols", cols);

    let isMouseDown = false; //tracks whether mouse button is pressed or not

    for (let c = 0; c < rows * cols; c++) {
        let cell = document.createElement("div");
        cell.innerText = c + 1;
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
        container.appendChild(cell);
    }
}
makeRows(16, 16);



