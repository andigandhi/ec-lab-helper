
// The whole stack of methods of the routine
var methodes = [];

// Shows a specific menu to add a testing method to the routine
function show(elem) {
    document.getElementById(elem+'Div').style.display = "inline";
    document.getElementById('addButtonsDiv').style.display = "none";
}


// Adds the method to the stack and shows the main menu
function add(elem, save) {
    document.getElementById(elem+'Div').style.display = "none";
    document.getElementById('addButtonsDiv').style.display = "inline";
    if (save) {
        addParamsToTable(elem);
    }
}

function addParamsToTable(methode) {
    var shortDescription = addParamsToOut(methode)

    var outDiv = document.getElementById('overviewDiv');
    var newDiv = document.createElement("div");

    newDiv.innerHTML = "<b>"+methode+"</b><br>";
    newDiv.innerHTML += shortDescription;

    outDiv.appendChild(newDiv);
}





// **** All the methodes to add input to the output string ****

function addParamsToOut(methode) {
    if (methode == "CVA") return addCvaToOut();
    else if (methode == "BCD") return addBcdToOut();
}

function addCvaToOut() {
    var dedt = document.getElementById("dEdtIn").value;

    methodes[methodes.length] = 
        `
Technique : `+(methodes.length+1)+`
Cyclic Voltammetry Advanced
Ei (V)              lowerVoltageBoundary               
vs.                 Eoc                 
ti (h:m:s)          0:00:10,0000        
dti (s)             1,0000              
dE/dt               `+dedt+`             
dE/dt unit          mV/s                
E1 (V)              upperVoltageBoundary               
vs.                 Ref                 
t1 (h:m:s)          0:00:0,0000         
dt1 (s)             0,1000              
Step percent        50                  
N                   10                  
E range min (V)     -2,500              
E range max (V)     2,500               
I Range             Auto                
I Range min         Unset               
I Range max         Unset               
I Range init        Unset               
Bandwidth           8                   
E2 (V)              0,000               
vs.                 Ref                 
t2 (h:m:s)          0:00:0,0000         
dt2 (s)             0,1000              
nc cycles           0                   
nr                  1                   
Reverse Scan        1                   
Ef (V)              0,000               
vs.                 Eoc                 
tf (h:m:s)          0:00:0,0000         
dtf (s)             0,1000              

`;

    return "CV with a cycling speed of " + dedt + "mV/s";
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
EM1 (V)             upperVoltageBoundary               
EM1 vs.             Ref                 
EM2 (V)             lowerVoltageBoundary              
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

    return "Battery Capacity Determination";
}





// create and download the file
function download(filename) {
    // Header for the mps file
    var text = 
    `EC-LAB SETTING FILE

Number of linked techniques : `+methodes.length+`

Filename : EC-Lab-config.mps

Device : VMP-300
Electrode connection : standard
Ewe ctrl range : min = -2,50 V, max = 2,50 V
Ewe,I filtering : <None>
Safety Limits :
    Do not start on E overload
Channel : Floating
Electrode material : 
Initial state : 
Electrolyte : 
Comments : Li-ion 18650 1.35 A.h 
Comments : GITT 
Mass of active material : 7000,000 mg
    at x = 1,000
Molecular weight of active material (at x = 0) : 90,930 g/mol
Atomic weight of intercalated ion : 6,940 g/mol
Acquisition started at : xo = 0,900
Number of e- transfered per intercalated ion : 1
for DX = 1, DQ = 1916,936 mA.h
Battery capacity : 0,000 A.h
Cable : standard
Electrode surface area : 0,001 cm??
Characteristic mass : 0,001 g
Record Power
Cycle Definition : Charge/Discharge alternance
Turn to OCV between techniques

    `;

    // Add all the methods after the mps header
    for (var i = 0; i<methodes.length;i++) {
        text += methodes[i];
    }

    // Get the lower and upper voltage boundaries
    var lowVolt = document.getElementById("lowerBound").value.replace(".",",");
    var uppVolt = document.getElementById("upperBound").value.replace(".",",");

    // Put bounds into the text string
    if (lowVolt != "") {
        text = text.replace("lowerVoltageBoundary", lowVolt);
        text = text.replace("upperVoltageBoundary", uppVolt);
    }

    // Create the download file and download it
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "EC-Lab-config.mps");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }