const SHEET_ID = '{SHEET_ID}';
const SHEET_NAME = '{SHEET_NAME}';

function doGet() {
  const data = getData();
  // console.log(data);

  return ContentService.createTextOutput(
    JSON.stringify(
      {
        data
      }
    )
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e: GoogleAppsScript.Events.DoPost){
  const contents = JSON.parse(e.postData.contents);
  const data = contents.data;
  addData(data);

  return ContentService.createTextOutput(
    JSON.stringify(
      {
        content: "post ok",
      }
    )
  ).setMimeType(ContentService.MimeType.JSON);
}

// Business Logic =============================================

function getData() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const sheetData = sheet.getDataRange().getValues();
  const headers = sheetData[0];

  return sheetData
    .filter((row, index) => index !== 0)
    .map((row) => {
      return row.reduce((accumulator, value, index) => {
        const key = headers[index];
        return {
          ...accumulator,
          [key]: value
        }
      }, {});
    });
}

function addData(data){
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const sheetData  = sheet.getDataRange().getValues();
  sheetData.push([new Date(), data]);

  // getRange(開始行、開始列、行数、列数)
  sheet.getRange(1, 1, sheetData.length, 2).setValues(sheetData);
}