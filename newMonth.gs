function newMonth() {
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var activeSheet = ss.getActiveSheet();
  // copy the sheet
  var newSheet = activeSheet.copyTo(ss);
  app.flush(); 
  ss.setActiveSheet(newSheet);
  // update the dates
  var begDate = newSheet.getRange("B1");
  var endDate = newSheet.getRange("D1");
  endDate.copyTo(begDate);
  var oldDate = newSheet.getRange('D1').getValue();
  var newMonth = oldDate.getMonth();
  oldDate.setMonth((newMonth+1) % 12);
  newSheet.getRange('D1').setValue(oldDate);
  newSheet.setName(Utilities.formatDate(oldDate, Session.getScriptTimeZone(), "MMM YYYY"));
  // copy end reading to start reading
  var firstRow = newSheet.getRange("H2").getValue();
  var lastRow = newSheet.getRange("I2").getValue();
  var endRange = newSheet.getRange("C"+firstRow+":C"+lastRow);
  var begRange = newSheet.getRange("B"+firstRow+":B"+lastRow);
  endRange.copyTo(begRange);

}

