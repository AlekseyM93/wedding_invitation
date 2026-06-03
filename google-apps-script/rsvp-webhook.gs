/**
 * RSVP Webhook для свадебного приглашения.
 * 1. Создайте лист «RSVP» с заголовками в строке 1.
 * 2. Вставьте этот код в Apps Script таблицы.
 * 3. Задайте WEBHOOK_SECRET и разверните как веб-приложение (доступ: Все).
 */

const WEBHOOK_SECRET = "замените-на-длинный-секрет-минимум-32-символа";
const SHEET_NAME = "RSVP";

function attendanceLabel(value) {
  if (value === "yes") return "Приду";
  if (value === "no") return "Не смогу";
  return String(value || "");
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Лист "' + SHEET_NAME + '" не найден');
  }

  return sheet;
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (!payload.secret || payload.secret !== WEBHOOK_SECRET) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Unauthorized" }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getSheet_();
    const timestamp = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "dd.MM.yyyy HH:mm:ss",
    );

    sheet.appendRow([
      timestamp,
      String(payload.name || "").trim(),
      attendanceLabel(payload.attendance),
      String(payload.guests || "").trim(),
      String(payload.comment || "").trim(),
      String(payload.source || "Свадебное приглашение").trim(),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ success: true, message: "RSVP webhook is running" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
