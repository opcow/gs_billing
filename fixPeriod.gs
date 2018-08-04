function normalizeBilling() {
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet();

  var MSECS = 1000 * 60 * 60 * 24;
  var begDate = activeSheet.getRange("B1").getValue();
  var endDate = activeSheet.getRange("D1").getValue();
  var diffTime = (endDate - begDate) / MSECS + 1;
  var firstRow = activeSheet.getRange("H2").getValue();
  var lastRow = activeSheet.getRange("I2").getValue();
  var tab = activeSheet.getRange(activeSheet.getRange("J2").getValue()).getValues();
  var billDate = tab[0][4];

  endDate.setDate(billDate);
  activeSheet.getRange('D1').setValue(endDate);

  //var total = activeSheet.getRange("D"+firstRow+":D"+lastRow).getValues();

  for (var i = firstRow; i <= lastRow; i++) {
    var beg = "B"+i;
    var end = "C"+i;
    var net = "D"+i;
    var total = activeSheet.getRange(net).getValue();
    total = (total / diffTime) * 31;
    total = total - total % 10;
    activeSheet.getRange(end).setValue(activeSheet.getRange(beg).getValue()+total);
  }
  // do main meter which is 3 rows below the last
  total = activeSheet.getRange("D"+(lastRow+3)).getValue();
  total = (total / diffTime) * 31;
  total = total - total % 10;
  activeSheet.getRange("C"+(lastRow+3)).setValue(activeSheet.getRange("B"+(lastRow+3)).getValue()+total);
}

