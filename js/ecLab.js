var methodes = [];

function show(elem) {
    document.getElementById(elem+'Div').style.display = "inline";
    document.getElementById('addButtonsDiv').style.display = "none";
}


function add(elem, save) {
    document.getElementById(elem+'Div').style.display = "none";
    document.getElementById('addButtonsDiv').style.display = "inline";
    if (save) {
        addParamsToTable(elem);
    }
}

function addParamsToTable(methode) {
    var outDiv = document.getElementById('overviewDiv');

    var newDiv = document.createElement("div");
    newDiv.innerHTML = "<b>"+methode+"</b><br>";

    outDiv.appendChild(newDiv);

    addParamsToOut(methode)
}

function addParamsToOut(methode) {
    if (methode == "BCD") addBcdToOut();

    console.log(methodes);
}

function addBcdToOut() {
    methodes[methodes.length] = 
        `
        Technique : `+(methodes.length+1)+`
        Battery Capacity Determination
        Set I/C             I                   
        Is1                 260,000             
        unit Is1            mA                  
        N1                  1,00                
        I1 sign             > 0                 
        t1 (h:m:s)          11:00:0,0000        
        EM1 (V)             0,400               
        EM1 vs.             Ref                 
        EM2 (V)             -0,200              
        EM2 vs.             Ref                 
        dE1 (mV)            0,00                
        dt1 (s)             10,0000             
        Hold NONE/EM1/EM2   1                   
        tM (h:m:s)          1:00:0,0000         
        Set I limit         0                   
        Im                  130,000             
        unit Im             mA                  
        Nl                  20,00               
        I Range             1 A                 
        Bandwidth           5                   
        E range min (V)     -2,500              
        E range max (V)     2,500               
        tR (h:m:s)          0:00:0,0000         
        dER/dt (mV/h)       0,0                 
        dER (mV)            0,00                
        dtR (s)             0,0000              
        Charge/Discharge    1                   
        Set I/C             I                   
        Is2                 -260,000            
        unit Is2            mA                  
        N2                  1,00                
        I2 sign             > 0                 
        t2 (h:m:s)          11:00:0,0000        
        Return Ei           0                   
        use C               1  
        `;
}