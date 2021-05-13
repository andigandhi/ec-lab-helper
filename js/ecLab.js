

function show(elem) {
    document.getElementById(elem+'Div').style.display = "inline";
    document.getElementById('addButtonsDiv').style.display = "none";
}


function add(elem, save) {
    document.getElementById(elem+'Div').style.display = "none";
    document.getElementById('addButtonsDiv').style.display = "inline";
    if (save) {
        addParamsToTable();
    }
}

function addParamsToTable() {
    var tbl = document.getElementById('overviewTable');

    var tblTd = document.createElement("td");
    tblTd.innerHTML = "YOOOOOO";
    tbl.appendChild(tblTd);
}