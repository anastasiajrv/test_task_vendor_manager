var SHEET_NAME = 'Submissions';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Header row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name', 'Email',
        'Part 1 — Role Understanding',
        'Part 2 — Targeted Vendor Sourcing',
        'Part 3 — Mass Hiring Scenario',
        'Part 4 — Margin Analysis',
        'Part 5 — Translation Quality',
        'Part 6 — Vendor Risk',
        'Part 7 — Process Improvement'
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#0075ff').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toLocaleString('en-GB'),
      data.name  || '',
      data.email || '',
      data.ans1  || '',
      data.ans2  || '',
      data.ans3  || '',
      data.ans4  || '',
      data.ans5  || '',
      data.ans6  || '',
      data.ans7  || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run manually in the editor to check the sheet
function testSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Sheet URL: ' + ss.getUrl());
}
