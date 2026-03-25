// creates a new sheet, copies the previous sheet to
// the new sheet, and copies the previous end column
// to the new start column
function newMonth() {

  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var latestSheet = ss.getSheets()[ss.getNumSheets()-1]

  // copy the sheet
  var newSheet = latestSheet.copyTo(ss);
  app.flush(); 
  ss.setActiveSheet(newSheet);
  // update the dates
  var begDate = newSheet.getRange("B1");
  var endDate = newSheet.getRange("D1");
  var tempEnd = endDate.getValue();
  var tempBeg = endDate.getValue();
 
  // set the beginning/end day of month to the 4/3
  var tabAddr = latestSheet.getRange('J2').getValue();
  var billingDay = latestSheet.getRange(tabAddr).getValues()[0][4];
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

  var protections = ss.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  for (var i = 0; i < protections.length; i++) {
    var p = protections[i];
    var rangeNotation = p.getRange().getA1Notation();
    var p2 = newSheet.getRange(rangeNotation).protect();
    p2.setDescription(p.getDescription());
    p2.setWarningOnly(p.isWarningOnly());
    // if (!p.isWarningOnly()) {
    //   p2.removeEditors(p2.getEditors());  // remove editors 
    //   p2.addEditors(p.getEditors());      // except those permitted for original
    // }
  }
}