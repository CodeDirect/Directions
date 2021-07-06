/* ------------------------- Global Variables Start ------------------------- */
var matrix = {
    data : [],
    rowsCount : 0,
    columnsCount : 0
}
var symbols = {
    stepSymbol : "-",
    startingLocationSymbol : "+",
    currentLocationSymbol : "#",
    previousLocationsSymbol : "O"
}
var locations = {
    currentLocation : {
        row : 0,
        column : 0
    },
    startingLocation : {
        row : 0,
        column : 0
    }
}
/* ------------------------- Global Variables End ------------------------- */

/* ------------------------- Set Starting Location and Symbol Start ------------------------- */
AddNewRowBottom("");    // Add a new row without any column
AddNewColumnRight(symbols.startingLocationSymbol);  // Add a new column in this new row which has no columns
PrintWalk();
/* ------------------------- Set Starting Location and Symbol End ------------------------- */

/* ------------------------- Walk Methods Start ------------------------- */
function walk(){
    var steps = document.getElementById('stepInput').value; // Get the number of steps person will walk
    var direction = document.getElementById('stepDirection').value; // Get the direction in which person will walk
    walking(steps, direction);  // Make the person walk in that direction
    PrintWalk();
}

function walking(steps, direction){
    switch(direction)
    {
        case "N":
            /* Check if required number of rows are above current location so that the person can walk to north. Create new rows if not available */
            if(locations.currentLocation.row < steps)
                AddRow(steps - locations.currentLocation.row, true);  // Add required number of new rows by subtracting current location row number from steps the person has to walk to find out how many more rows are required along with in which direction
            
            for(var step = 0; step < steps; step++){
                if(IsCellContentHasACurrentLocationSymbol(locations.currentLocation.row,locations.currentLocation.column))
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.previousLocationsSymbol;
                locations.currentLocation.row--;
                if(IsCellContentHasAnStartingLocationSymbol(locations.currentLocation.row,locations.currentLocation.column))
                    continue;
                if(step == steps-1)
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.currentLocationSymbol;
                else
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.stepSymbol;
            }
            break;
        case "S":
            /* Check if required number of rows are below current location so that the person can walk to south. Create new rows if not available */
            if((matrix.rowsCount - (locations.currentLocation.row + 1)) < steps)
                AddRow(steps - (matrix.rowsCount - (locations.currentLocation.row + 1)) , false);  // Add required number of new rows by subtracting current location's row number (after adding 1 in it because locations are zero based index) from total number of rows (which are not zero based) to find out how many more rows are required along with in which direction

            for(var step = 0; step < steps; step++){
                if(IsCellContentHasACurrentLocationSymbol(locations.currentLocation.row,locations.currentLocation.column))
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.previousLocationsSymbol;
                locations.currentLocation.row++;
                if(IsCellContentHasAnStartingLocationSymbol(locations.currentLocation.row,locations.currentLocation.column))
                    continue;
                if(step == steps-1)
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.currentLocationSymbol;
                else
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.stepSymbol;
            }
            break;
        case "E":
            /* Check if required number of columns are left to the current location so that the person can walk to east. Create new column if not available */
            if(locations.currentLocation.column < steps)
                AddColumn(steps - locations.currentLocation.column, true);  // Add required number of new columns by subtracting current location's column number from steps the person has to walk to find out how many more columns are required along with in which direction

            for(var step = 0; step < steps; step++){
                if(IsCellContentHasACurrentLocationSymbol(locations.currentLocation.row,locations.currentLocation.column))
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.previousLocationsSymbol;
                locations.currentLocation.column--;
                if(IsCellContentHasAnStartingLocationSymbol(locations.currentLocation.row,locations.currentLocation.column))
                    continue;
                if(step == steps-1)
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.currentLocationSymbol;
                else
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.stepSymbol;
            }
            break;
        case "W":
            /* Check if required number of columns are right to the current location so that the person can walk to west. Create new columns if not available */
            if((matrix.columnsCount - (locations.currentLocation.column + 1)) < steps)
                AddColumn(steps - (matrix.columnsCount - (locations.currentLocation.column + 1)) , false);  // Add required number of new columns by subtracting current location's column number (after adding 1 in it because locations are zero based index) from total number of columns (which are not zero based) to find out how many more rows are required along with in which direction

            for(var step = 0; step < steps; step++){
                if(IsCellContentHasACurrentLocationSymbol(locations.currentLocation.row,locations.currentLocation.column))
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.previousLocationsSymbol;
                locations.currentLocation.column++;
                if(IsCellContentHasAnStartingLocationSymbol(locations.currentLocation.row,locations.currentLocation.column))
                    continue;
                if(step == steps-1)
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.currentLocationSymbol;
                else
                    matrix.data[locations.currentLocation.row][locations.currentLocation.column] = symbols.stepSymbol;
            }
            break;
        default:
            alert("Wrong direction");
    }
}
function AddRow(numberOfRows, above){
    for(var row = 0; row < numberOfRows; row++){
        above ? AddNewRowTop(" ") : AddNewRowBottom(" ");
    }
}
function AddColumn(numberOfColumns, left){
    for(var col = 0; col < numberOfColumns; col++){
        left ? AddNewColumnLeft(" ") : AddNewColumnRight(" ");
    }
}
/* ------------------------- Walk Methods End ------------------------- */

function PrintWalk(){
    var printContainer = document.getElementById('displayContainer');
    printContainer.innerHTML = "";
    matrix.data.forEach(row => {
        var newRowDiv = document.createElement("div");
        newRowDiv.setAttribute("class", "row");
        row.forEach(cell => {
            var newCellSpan = document.createElement('span');
            if(cell == symbols.startingLocationSymbol) newCellSpan.setAttribute("id", "startingPoint")
            else if(cell == symbols.currentLocationSymbol) newCellSpan.setAttribute("id", "endPoint");
            else if(cell == symbols.stepSymbol)  newCellSpan.setAttribute("class", "filledCell");
            else if(cell == symbols.previousLocationsSymbol) newCellSpan.setAttribute("class", "prevLocation");
            else if(cell == " ") newCellSpan.setAttribute("class", "emptyCell");
            newCellSpan.classList.add("cell");
            newCellSpan.innerText = cell;
            newRowDiv.appendChild(newCellSpan);
        })
        printContainer.appendChild(newRowDiv);
    })
}
/* ------------------------- 2D Matrix Row and Column Add Methods Start ------------------------- */
/**
 * Act as a common code which Prepare the new row for the 2D matrix and return it
 * Total number of columns in this new row will be equal to the total number of columns currently in the 2D matrix
 * Default value for the each column of this new row will be passed using data parameter
 * @param {*} data Default value for each column of this new row
 * @returns new row for the 2D matrix
 */
function PrepareNewRow(data){
    var newRow = [];    // New row that will be added in the 2D matrix
    /* Add total number of columns in this new row equal to the current total number of columns in the 2D matrix */
    for(var column = 0; column < matrix.columnsCount; column++){
        newRow.push(data);
    }
    return newRow;
}
/**
 * Add a new row in 2D matrix in bottom of the matrix which will not move any locations and increase matrix row count by 1
 * New Row will have same number of columns as every other row has in 2D matrix
 * @param {*} data Default value for each column of this new row
 */
function AddNewRowBottom(data){
    var newRow = PrepareNewRow(data);   // Prepare a new row for the 2D matrix
    matrix.data.push(newRow);    // Add this new row to the bottom of the 2D matrix
    matrix.rowsCount++; // Increase 2D matrix rows count by 1
}
/**
 * Add a new row in 2D matrix at top of the matrix which will move every location and increase it by 1 and also increase the 2D matrix rows count by 1
 * New Row will have same number of columns as every other row has in 2D matrix
 * @param {*} data Default value for each column of this new row
 */
function AddNewRowTop(data){
    var newRow = PrepareNewRow(data);   // Prepare a new row for the 2D matrix
    matrix.data.unshift(newRow); // Add this new row to the top of the 2D matrix
    matrix.rowsCount++; // Increase 2D matrix rows count by 1
    locations.startingLocation.row++;   // Increase starting location's row number by 1 because the row number has changed after new row added to the top of the 2D matrix
    locations.currentLocation.row++;    // Increase current Location's row number by 1 because the row number has changed after new row added to the top of the 2D matrix
}
/**
 * Add a new column in 2D matrix to the right most side of the matrix which will not move any location and increase matrix's columns count by 1
 * New column will have same number of rows as every other column has in 2D matrix
 * @param {*} data Default value for each row of this new column
 */
function AddNewColumnRight(data){
    /* Add total number of rows in this new column equal to the current total number of rows in the 2D matrix */
    for(var row = 0; row < matrix.rowsCount; row++){
        matrix.data[row].push(data);    // Access 2D matrix row one by one and add column in the row to the right most side and it's default value
    }
    matrix.columnsCount++;  // Increase columns count of 2D matrix by 1
}
/**
 * Add a new column in 2D matrix to the left most side of the matrix which will move every location by 1 and increase matrix's columns count by 1
 * New column will have same number of rows as every other column has in 2D matrix
 * @param {*} data Default value for each row of this new column
 */
function AddNewColumnLeft(data){
    /* Add total number of rows in this new column equal to the current total number of rows in the 2D matrix */
    for(var row = 0; row < matrix.rowsCount; row++){
        matrix.data[row].unshift(data); // Access 2D matrix row one by one and add column in the row to the left most side and it's default value
    }
    matrix.columnsCount++;  // Increase columns count of 2D matrix by 1
    locations.startingLocation.column++;    // Increase starting location's column number by 1 because the column number has changed after new column added to the left most of the 2D matrix
    locations.currentLocation.column++;     // Increase current Location's column number by 1 because the column number has changed after new column added to the left most of the 2D matrix
}
/* ------------------------- 2D Matrix Row and Column Add Methods End ------------------------- */

/* ------------------------- Conditions Checker Methods Start ------------------------- */
/**
 * Check if the current cell you are accessing has a starting location symbol
 * @param {*} row row number of 2D matrix cell you want to access
 * @param {*} column column number of 2D matrix cell you want to access
 * @returns true - if starting location symbol found, false - if starting location symbol not found
 */
function IsCellContentHasAnStartingLocationSymbol(row, column){
    if(matrix.data[row][column] == symbols.startingLocationSymbol)
        return true;
    else
        return false;
}
/**
 * Check if the current cell you are accessing has a current location symbol
 * @param {*} row row number of 2D matrix cell you want to access
 * @param {*} column column number of 2D matrix cell you want to access
 * @returns true - if current location symbol found, false - if current location symbol not found
 */
function IsCellContentHasACurrentLocationSymbol(row, column){
    if(matrix.data[row][column] == symbols.currentLocationSymbol)
        return true;
    else
        return false;
}
/* ------------------------- Conditions Checker Methods End ------------------------- */