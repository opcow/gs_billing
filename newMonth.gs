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
  var tempEnd = endDate.getValue();
  var tempBeg = endDate.getValue();
 
  // set the beginning/end day of month to the 4/3
  var tabAddr = activeSheet.getRange('J2').getValue();
  var billingDay = activeSheet.getRange(tabAddr).getValues()[0][4];
  tempEnd.setDate(billingDay);
  tempBeg.setDate(billingDay+1);
  begDate.setValue(tempBeg);

 // set new month and handle new year change
  var oldMonth = tempEnd.getMonth();
  tempEnd.setMonth((oldMonth+1) % 12);
  if (oldMonth == 11.0) {
    tempEnd.setFullYear(tempEnd.getFullYear()+1);
    }
  endDate.setValue(tempEnd);
  newSheet.setName(Utilities.formatDate(tempEnd, Session.getScriptTimeZone(), "MMM YYYY"));

  // copy end reading to start reading
  var firstRow = newSheet.getRange("H2").getValue();
  var lastRow = newSheet.getRange("I2").getValue();
  var endRange = newSheet.getRange("C"+firstRow+":C"+lastRow);
  var begRange = newSheet.getRange("B"+firstRow+":B"+lastRow);
  endRange.copyTo(begRange);
}