// workaround for buttons not working on mobile, calls the appropriate function if the checkbox is clicked, then unchecks the box
function onEdit() {
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var activeCell = ss.getActiveSheet().getActiveCell()
  let ref = activeCell.getA1Notation();
  if (ref == "A18") {
    ss.getActiveSheet().setActiveSelection('M37');
    activeCell.uncheck();
    newMonth();
  }
  else if (ref == "A20") {
    ss.getActiveSheet().setActiveSelection('M37');
    activeCell.uncheck();
    normalizeBilling();
  }

}