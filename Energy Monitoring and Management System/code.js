function getAllData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets()[0];
  var sheet = ss.getActiveSheet();

  var firebaseUrl = '';

  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl);

  var dataSet = [base.getData()];

  // the following lines will depend on the structure of your data
  var rows = [],
    data;

  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    rows.push([
      data.current,
      data.voltage,
      data.pf,
      data.kw,
      data.kwh,
      data.hour,
      data.minute,
      data.second,
    ]);
  }
  // the get range depends on where you want the sheet to start inputting the data
  var lr = sheet.getRange('A41').getDataRegion().getLastRow();

  dataRange = sheet.getRange(lr + 1, 1, rows.length, 8);
  dataRange.setValues(rows);
}
