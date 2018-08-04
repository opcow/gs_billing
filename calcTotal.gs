//calcBill(2000, [[2000, 2.93, 1000]]);

function calcBill(gal) {
  //gal = 3000;
  //table = [[2000, 3.00, 1000, 25.20],[4999, 8.00, 1000],['-', 9.00, 1000]];
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
  var tabAddr = activeSheet.getRange("J2").getValue();
  var tab = activeSheet.getRange(tabAddr).getValues();
  var total = tab[0][3]; // sets total to minimum charge
  var bracket;
  for (var i = 0, row; row = tab[i]; i++) {
    bracket = row[0];
    if(bracket == '-' || gal <= bracket){
	bracket = gal;
    total = total + bracket * row[1] / row[2];
    break;
    } else {
      total = total + bracket * row[1] / row[2];
    }
    gal = gal - bracket;
  }
  return total;
}

