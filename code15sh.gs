// ============================================================
// تنظیمات اصلی
// ============================================================

const NEWS_SHEET_NAME = "اخبار";
const ASSESSMENT_SHEET_NAME = "آزمون‌ها";
const RESERVATION_SHEET_NAME = "Sheet1";
const CONSULTATION_SHEET_NAME = "پکیج‌های مشاوره";
const TIMEZONE = "Asia/Tehran";

// ============================================================
// GET
// ============================================================

function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : "";

    if (action === "getNews") {
      return getNews();
    }

    if (action === "getAllNews") {
      return getAllNews();
    }

    if (action === "getPackages") {
      return getPackages();
    }

    if (action === "getReservations") {
      return getReservations();
    }

    if (action === "getAssessments") {
      return getAssessments();
    }

    return jsonResponse({
      success: true,
      message: "Google Apps Script is running."
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      message: String(error)
    });
  }
}

// ============================================================
// POST
// ============================================================

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("اطلاعات ارسالی دریافت نشد.");
    }

    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // آزمون‌ها
    if (data.type === "assessment") {
      const sheet = findAssessmentSheet(spreadsheet);
      if (!sheet) throw new Error("شیت «آزمون‌ها» پیدا نشد.");

      sheet.appendRow([
        new Date(),
        data.name || "",
        data.phone || "",
        data.testType || "",
        data.result || "",
        data.description || ""
      ]);

      return jsonResponse({ success: true, message: "نتیجه آزمون با موفقیت ثبت شد." });
    }

    // ثبت خبر
    if (data.type === "news") {
      const sheet = spreadsheet.getSheetByName(NEWS_SHEET_NAME);
      if (!sheet) throw new Error("شیت «اخبار» پیدا نشد.");

      const id = data.id || generateNewsId(data.title || "", data.sourceUrl || "");
      if (newsExists(sheet, id, data.sourceUrl || "", data.title || "")) {
        return jsonResponse({ success: true, duplicate: true, message: "این خبر قبلاً ثبت شده است." });
      }

      sheet.appendRow([
        new Date(),
        data.title || "",
        data.summary || "",
        data.content || "",
        data.source || "",
        data.category || "",
        data.sourceUrl || "",
        data.status || "pending",
        data.image || "",
        id
      ]);

      return jsonResponse({ success: true, message: "خبر با موفقیت ثبت شد.", id: id });
    }

    // مدیریت اخبار
    if (data.type === "newsAction") {
      return handleNewsAction(data.action, data.id);
    }

    // ثبت پکیج مشاوره
    if (data.type === "package") {
      const sheet = spreadsheet.getSheetByName(CONSULTATION_SHEET_NAME);
      if (!sheet) throw new Error("شیت «پکیج‌های مشاوره» پیدا نشد.");

      const id = generatePackageId(data.title || "");

      sheet.appendRow([
        new Date(),
        data.title || "",
        data.shortDescription || "",
        data.fullDescription || "",
        data.image1 || "",
        data.image2 || "",
        data.image3 || "",
        data.price || "",
        data.duration || "",
        data.features || "",
        data.consultationType || "",
        data.city || "",
        id
      ]);

      return jsonResponse({
        success: true,
        message: "پکیج مشاوره با موفقیت ثبت شد.",
        id: id
      });
    }

    // مدیریت پکیج‌های مشاوره
    if (data.type === "packageAction") {
      return handlePackageAction(data.action, data.id);
    }

    // مدیریت رزروها (پنل ادمین)
    if (data.type === "reservationAction") {
      return handleReservationAction(data.action, data.id);
    }

    // مدیریت آزمون‌ها (پنل ادمین)
    if (data.type === "assessmentAction") {
      return handleAssessmentAction(data.action, data.id);
    }

    // رزرو مشاوره
    const reservationSheet = spreadsheet.getSheetByName(RESERVATION_SHEET_NAME);
    if (!reservationSheet) throw new Error("شیت Sheet1 پیدا نشد.");

    reservationSheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.grade || "",
      data.field || "",
      data.city || "",
      data.package || "",
      data.description || "",
      data.consultationType || "",
      data.date || "",
      data.time || "",
      "pending"
    ]);

    return jsonResponse({ success: true, message: "درخواست مشاوره با موفقیت ثبت شد." });
  } catch (error) {
    return jsonResponse({ success: false, message: String(error) });
  }
}

// ============================================================
// پیدا کردن شیت آزمون‌ها
// ============================================================

function findAssessmentSheet(spreadsheet) {
  const names = ["آزمون‌ها", "آزمون ها", "آزمون‌ها ", "آزمون ها ", "آزمون"];
  for (const name of names) {
    const sheet = spreadsheet.getSheetByName(name);
    if (sheet) return sheet;
  }
  return null;
}

// ============================================================
// دریافت اخبار برای سایت (تنها تأییدشده‌ها)
// ============================================================

function getNews() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(NEWS_SHEET_NAME);
  if (!sheet) throw new Error("شیت «اخبار» پیدا نشد.");

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return jsonResponse({ success: true, news: [] });

  const news = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const status = String(row[7] || "pending").trim().toLowerCase();
    if (status !== "approved") continue;

    news.push({
      rowNumber: i + 1,
      date: formatDate(row[0]),
      title: row[1] || "",
      summary: row[2] || "",
      content: row[3] || "",
      source: row[4] || "",
      category: row[5] || "",
      sourceUrl: row[6] || "",
      status: status,
      image: row[8] || "",
      id: String(row[9] || ""),
      slug: createSlug(row[1] || "")
    });
  }
  news.reverse();
  return jsonResponse({ success: true, news: news });
}

// ============================================================
// دریافت همه اخبار برای پنل مدیریت
// ============================================================

function getAllNews() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(NEWS_SHEET_NAME);
  if (!sheet) throw new Error("شیت «اخبار» پیدا نشد.");

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return jsonResponse({ success: true, news: [] });

  const news = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const status = String(row[7] || "pending").trim().toLowerCase();

    news.push({
      rowNumber: i + 1,
      date: formatDate(row[0]),
      title: row[1] || "",
      summary: row[2] || "",
      content: row[3] || "",
      source: row[4] || "",
      category: row[5] || "",
      sourceUrl: row[6] || "",
      status: status,
      image: row[8] || "",
      id: String(row[9] || ""),
      slug: createSlug(row[1] || "")
    });
  }
  news.reverse();
  return jsonResponse({ success: true, news: news });
}

// ============================================================
// دریافت پکیج‌های مشاوره برای سایت
// ============================================================

function getPackages() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(CONSULTATION_SHEET_NAME);
  if (!sheet) throw new Error("شیت «پکیج‌های مشاوره» پیدا نشد.");

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return jsonResponse({ success: true, packages: [] });

  // ستون‌ها هنگام ذخیره:
  // 0:تاریخ | 1:عنوان | 2:توضیح کوتاه | 3:توضیح کامل | 4:تصویر1 | 5:تصویر2 | 6:تصویر3
  // 7:قیمت | 8:مدت | 9:ویژگی‌ها | 10:نوع مشاوره | 11:شهر | 12:شناسه
  const packages = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const title = String(row[1] || "").trim();
    if (!title) continue;

    packages.push({
      id: String(row[12] || ""),
      title: title,
      shortDescription: String(row[2] || ""),
      fullDescription: String(row[3] || ""),
      image1: String(row[4] || ""),
      image2: String(row[5] || ""),
      image3: String(row[6] || ""),
      price: String(row[7] || ""),
      duration: String(row[8] || ""),
      features: String(row[9] || ""),
      consultationType: String(row[10] || ""),
      city: String(row[11] || ""),
    });
  }
  return jsonResponse({ success: true, packages: packages });
}

// ============================================================
// دریافت رزروهای مشاوره برای پنل مدیریت
// ============================================================

function getReservations() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(RESERVATION_SHEET_NAME);
  if (!sheet) throw new Error("شیت رزروها پیدا نشد.");

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return jsonResponse({ success: true, reservations: [] });

  const reservations = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const status = String(row[11] || "pending").trim().toLowerCase() || "pending";

    reservations.push({
      rowNumber: i + 1,
      id: String(i + 1),
      createdAt: formatDate(row[0]),
      name: row[1] || "",
      phone: row[2] || "",
      grade: row[3] || "",
      field: row[4] || "",
      city: row[5] || "",
      package: row[6] || "",
      description: row[7] || "",
      consultationType: row[8] || "",
      date: row[9] || "",
      time: row[10] || "",
      status: status
    });
  }
  reservations.reverse();
  return jsonResponse({ success: true, reservations: reservations });
}

// ============================================================
// عملیات مدیریت رزروها (پیگیری‌شد / برگشت به انتظار / حذف)
// ============================================================

function handleReservationAction(action, id) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(RESERVATION_SHEET_NAME);
  if (!sheet) throw new Error("شیت رزروها پیدا نشد.");

  if (!id) throw new Error("شناسه رزرو ارسال نشده است.");

  const targetRow = parseInt(id, 10);
  if (!targetRow || targetRow < 2 || targetRow > sheet.getLastRow()) {
    throw new Error("رزرو مورد نظر پیدا نشد.");
  }

  if (action === "markContacted") {
    sheet.getRange(targetRow, 12).setValue("contacted");
    return jsonResponse({ success: true, message: "رزرو پیگیری‌شده علامت خورد." });
  }
  if (action === "markPending") {
    sheet.getRange(targetRow, 12).setValue("pending");
    return jsonResponse({ success: true, message: "رزرو به در انتظار برگشت." });
  }
  if (action === "delete") {
    sheet.deleteRow(targetRow);
    return jsonResponse({ success: true, message: "رزرو با موفقیت حذف شد." });
  }
  throw new Error("عملیات نامعتبر است.");
}

// ============================================================
// دریافت نتایج آزمون‌ها برای پنل مدیریت
// ============================================================

function getAssessments() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = findAssessmentSheet(spreadsheet);
  if (!sheet) throw new Error("شیت «آزمون‌ها» پیدا نشد.");

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return jsonResponse({ success: true, assessments: [] });

  const assessments = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];

    assessments.push({
      rowNumber: i + 1,
      id: String(i + 1),
      createdAt: formatDate(row[0]),
      name: row[1] || "",
      phone: row[2] || "",
      testType: row[3] || "",
      result: row[4] || "",
      detail: row[5] || ""
    });
  }
  assessments.reverse();
  return jsonResponse({ success: true, assessments: assessments });
}

// ============================================================
// عملیات مدیریت آزمون‌ها (حذف)
// ============================================================

function handleAssessmentAction(action, id) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = findAssessmentSheet(spreadsheet);
  if (!sheet) throw new Error("شیت «آزمون‌ها» پیدا نشد.");

  if (!id) throw new Error("شناسه آزمون ارسال نشده است.");

  const targetRow = parseInt(id, 10);
  if (!targetRow || targetRow < 2 || targetRow > sheet.getLastRow()) {
    throw new Error("نتیجه آزمون مورد نظر پیدا نشد.");
  }

  if (action === "delete") {
    sheet.deleteRow(targetRow);
    return jsonResponse({ success: true, message: "نتیجه آزمون با موفقیت حذف شد." });
  }
  throw new Error("عملیات نامعتبر است.");
}

// ============================================================
// عملیات مدیریت اخبار
// ============================================================

function handleNewsAction(action, id) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(NEWS_SHEET_NAME);
  if (!sheet) throw new Error("شیت «اخبار» پیدا نشد.");

  if (!id) throw new Error("شناسه خبر ارسال نشده است.");

  const values = sheet.getDataRange().getValues();
  let targetRow = -1;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][9] || "") === String(id)) {
      targetRow = i + 1;
      break;
    }
  }

  if (targetRow === -1) throw new Error("خبر مورد نظر پیدا نشد.");

  if (action === "approve") {
    sheet.getRange(targetRow, 8).setValue("approved");
    return jsonResponse({ success: true, message: "خبر تأیید و منتشر شد." });
  }
  if (action === "reject") {
    sheet.getRange(targetRow, 8).setValue("rejected");
    return jsonResponse({ success: true, message: "خبر رد شد." });
  }
  if (action === "delete") {
    sheet.deleteRow(targetRow);
    return jsonResponse({ success: true, message: "خبر حذف شد." });
  }
  throw new Error("عملیات نامعتبر است.");
}

// ============================================================
// عملیات مدیریت پکیج‌های مشاوره
// ============================================================

function handlePackageAction(action, id) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(CONSULTATION_SHEET_NAME);
  if (!sheet) throw new Error("شیت «پکیج‌های مشاوره» پیدا نشد.");

  if (!id) throw new Error("شناسه پکیج ارسال نشده است.");

  const values = sheet.getDataRange().getValues();
  let targetRow = -1;
  // شناسه پکیج در ستون ۱۳ (ایندکس ۱۲) ذخیره می‌شود
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][12] || "") === String(id)) {
      targetRow = i + 1;
      break;
    }
  }

  if (targetRow === -1) throw new Error("پکیج مورد نظر پیدا نشد.");

  if (action === "delete") {
    sheet.deleteRow(targetRow);
    return jsonResponse({ success: true, message: "پکیج با موفقیت حذف شد." });
  }
  throw new Error("عملیات نامعتبر است.");
}

// ============================================================
// دریافت خودکار اخبار
// ============================================================

function fetchNews() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return;

  try {
    const sources = [
      { name: "سازمان سنجش", category: "سازمان سنجش", urls: ["https://www.sanjesh.org/", "https://sanjesh.org/"] },
      { name: "هیوا", category: "کنکور", urls: ["https://www.heyvagroup.com/"] }
    ];

    let totalAdded = 0;
    for (const source of sources) {
      try {
        const result = fetchSourceNews(source);
        totalAdded += Number(result) || 0;
      } catch (e) {
        Logger.log("خطا در منبع " + source.name + ": " + String(e));
      }
    }
  } finally {
    lock.releaseLock();
  }
}

function fetchSourceNews(source) {
  let added = 0;
  const maxAttempts = 3;
  for (const url of source.urls) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = UrlFetchApp.fetch(url, {
          muteHttpExceptions: true,
          followRedirects: true,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
          }
        });

        if (response.getResponseCode() < 200 || response.getResponseCode() >= 400) break;

        const html = response.getContentText("UTF-8");
        const rssNews = parseRSS(html, source);
        for (const item of rssNews) {
          if (saveAutoNews(item)) added++;
        }
        return added;
      } catch (e) {
        if (attempt < maxAttempts) Utilities.sleep(3000 * attempt);
      }
    }
  }
  return added;
}

// تابع‌های parseRSS, parseHTMLNews, saveAutoNews, newsExists, generateNewsId, uniqueNews, ... (بدون تغییر – همان نسخه قبلی)

function parseRSS(html, source) { /* همان کد قبلی */ }
function parseHTMLNews(html, source, baseUrl) { /* همان کد قبلی */ }
function saveAutoNews(item) { /* همان کد قبلی */ }
function newsExists(sheet, id, sourceUrl, title) { /* همان کد قبلی */ }
function generateNewsId(title, sourceUrl) { /* همان کد قبلی */ }
function uniqueNews(items) { /* همان کد قبلی */ }
// ... (بقیه توابع: isGoogleNewsUrl, resolveGoogleNewsUrl, followRedirectChain, extractCanonicalUrlFromHtml, getSourceDomain, searchSourceArticleByTitle, isValidSourceUrl, cleanExtractedUrl, decodeHtmlEntities, stripHtml, cleanText, normalizeTitle, normalizeUrl, makeAbsoluteUrl, getJsonLdImage, createSlug, formatDate) 

// ============================================================
// ساخت شناسه پکیج
// ============================================================

function generatePackageId(title) {
  const value = normalizeTitle(title) + "|" + Date.now();
  return hashString(value);
}

// ============================================================
// تست‌ها
// ============================================================

function testConnection() {
  Logger.log(jsonResponse({ success: true, message: "Google Apps Script is running." }).getContent());
}

// ============================================================
// پاسخ JSON
// ============================================================

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// بقیه توابع (copy از نسخه قبلی شما – بدون تغییر)
// ============================================================
// (parseRSS, parseHTMLNews, isGoogleNewsUrl, resolveGoogleNewsUrl, followRedirectChain, extractCanonicalUrlFromHtml, getSourceDomain, searchSourceArticleByTitle, isValidSourceUrl, cleanExtractedUrl, decodeHtmlEntities, stripHtml, cleanText, normalizeTitle, normalizeUrl, makeAbsoluteUrl, getJsonLdImage, createSlug, formatDate, testFetchNews, testHeyva, testHeyvaGoogleNews, testGoogleNewsRedirect)

function parseRSS(html, source) {
  const results = [];
  if (!html) return results;
  const lower = html.toLowerCase();
  if (lower.indexOf("<rss") === -1 && lower.indexOf("<feed") === -1 && lower.indexOf("<rdf:rdf") === -1) return results;

  try {
    const document = XmlService.parse(html);
    const root = document.getRootElement();
    const rootName = root.getName().toLowerCase();

    if (rootName === "rss") {
      const channel = root.getChild("channel");
      if (!channel) return results;
      const items = channel.getChildren("item");
      for (const item of items) {
        const title = getXmlChildText(item, "title");
        const rawLink = getXmlChildText(item, "link");
        const description = getXmlChildText(item, "description");
        const pubDate = getXmlChildText(item, "pubDate");
        if (!title || !rawLink) continue;

        let finalUrl = rawLink;
        if (isGoogleNewsUrl(finalUrl)) finalUrl = resolveGoogleNewsUrl(finalUrl, title, source);
        if (!finalUrl || !isValidSourceUrl(finalUrl, source)) continue;

        results.push({
          title: cleanText(title),
          summary: cleanText(description),
          content: cleanText(description),
          source: source.name,
          category: source.category,
          sourceUrl: finalUrl,
          image: "",
          date: pubDate || ""
        });
      }
      return uniqueNews(results);
    }

    if (rootName === "feed") {
      const entries = root.getChildren("entry");
      for (const entry of entries) {
        const title = getXmlChildText(entry, "title");
        const summary = getXmlChildText(entry, "summary");
        const content = getXmlChildText(entry, "content");
        let link = "";
        const links = entry.getChildren("link");
        for (const linkElement of links) {
          const href = linkElement.getAttribute("href");
          if (href) { link = href.getValue(); break; }
        }
        if (!title || !link) continue;
        if (isGoogleNewsUrl(link)) link = resolveGoogleNewsUrl(link, title, source);
        if (!link || !isValidSourceUrl(link, source)) continue;

        results.push({
          title: cleanText(title),
          summary: cleanText(summary),
          content: cleanText(content || summary),
          source: source.name,
          category: source.category,
          sourceUrl: link,
          image: "",
          date: link || ""
        });
      }
      return uniqueNews(results);
    }
  } catch (e) {}
  return results;
}

function parseHTMLNews(html, source, baseUrl) {
  const results = [];
  if (!html) return results;

  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const raw = match[1].trim();
      const data = JSON.parse(raw);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (!item || typeof item !== "object") continue;
        const type = String(item["@type"] || "").toLowerCase();
        if (type.indexOf("newsarticle") === -1 && type.indexOf("article") === -1) continue;

        const title = item.headline || item.name || "";
        const description = item.description || "";
        const url = item.url || "";
        if (!title || !url) continue;

        const finalUrl = makeAbsoluteUrl(url, baseUrl);
        if (!isValidSourceUrl(finalUrl, source)) continue;

        results.push({
          title: cleanText(title),
          summary: cleanText(description),
          content: cleanText(description),
          source: source.name,
          category: source.category,
          sourceUrl: finalUrl,
          image: getJsonLdImage(item),
          date: item.datePublished || ""
        });
      }
    } catch (e) {}
  }

  const linkRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const candidates = [];
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const anchorHtml = match[2];
    const text = cleanText(stripHtml(anchorHtml));
    if (!text || text.length < 15) continue;

    const hrefLower = href.toLowerCase();
    if (hrefLower.indexOf("javascript:") === 0 || hrefLower.indexOf("#") === 0) continue;

    const absoluteUrl = makeAbsoluteUrl(href, baseUrl);
    if (!isValidSourceUrl(absoluteUrl, source)) continue;

    candidates.push({
      title: text,
      summary: text,
      content: text,
      source: source.name,
      category: source.category,
      sourceUrl: absoluteUrl,
      image: "",
      date: ""
    });
  }
  return uniqueNews(candidates.slice(0, 20));
}

function saveAutoNews(item) {
  if (!item || !item.title || !item.sourceUrl) return false;
  if (!isAllowedEducationNews(item)) return false;

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(NEWS_SHEET_NAME);
  if (!sheet) throw new Error("شیت «اخبار» پیدا نشد.");

  const id = generateNewsId(item.title, item.sourceUrl);
  if (newsExists(sheet, id, item.sourceUrl, item.title)) return false;

  sheet.appendRow([
    new Date(),
    cleanText(item.title),
    cleanText(item.summary || ""),
    cleanText(item.content || item.summary || ""),
    item.source || "",
    item.category || "کنکور",
    item.sourceUrl || "",
    "pending",
    item.image || "",
    id
  ]);
  return true;
}

function isAllowedEducationNews(item) {
  const text = normalizeTitle([item.title || "", item.summary || "", item.content || "", item.category || ""].join(" "));
  const keywords = ["کنکور", "آزمون سراسری", "سازمان سنجش", "انتخاب رشته", "ثبت نام کنکور", "امتحان", "امتحانات", "امتحانات نهایی", "آموزش و پرورش", "دانشگاه فرهنگیان", "فرهنگیان", "تربیت معلم"];
  return keywords.some(k => text.indexOf(normalizeTitle(k)) !== -1);
}

function newsExists(sheet, id, sourceUrl, title) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  const values = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
  const normalizedUrl = normalizeUrl(sourceUrl);
  const normalizedTitle = normalizeTitle(title);

  for (const row of values) {
    const existingId = String(row[9] || "");
    const existingUrl = normalizeUrl(row[6] || "");
    const existingTitle = normalizeTitle(row[1] || "");

    if (id && existingId === String(id)) return true;
    if (normalizedUrl && existingUrl && normalizedUrl === existingUrl) return true;
    if (normalizedTitle && existingTitle && normalizedTitle === existingTitle) return true;
  }
  return false;
}

function generateNewsId(title, sourceUrl) {
  const value = normalizeTitle(title) + "|" + normalizeUrl(sourceUrl);
  return hashString(value);
}

function hashString(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, value, Utilities.Charset.UTF_8);
  let result = "";
  for (const byte of bytes) {
    const normalized = byte < 0 ? byte + 256 : byte;
    result += ("0" + normalized.toString(16)).slice(-2);
  }
  return result;
}

function uniqueNews(items) {
  const result = [];
  const seen = {};
  for (const item of items) {
    const key = normalizeUrl(item.sourceUrl) || normalizeTitle(item.title);
    if (!key || seen[key]) continue;
    seen[key] = true;
    result.push(item);
  }
  return result;
}

function getXmlChildText(element, childName) {
  const child = element.getChild(childName);
  return child ? child.getText().trim() : "";
}

function stripHtml(value) {
  return String(value || "").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
}

function cleanText(value) {
  return stripHtml(value).replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/\s+/g, " ").trim();
}

function normalizeTitle(value) {
  return cleanText(value).replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200c/g, "").replace(/\s+/g, " ").toLowerCase().trim();
}

function normalizeUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "").toLowerCase();
}

function makeAbsoluteUrl(url, baseUrl) {
  if (!url) return "";
  url = decodeHtmlEntities(String(url).trim());
  if (/^https?:\/\//i.test(url)) return url;

  try {
    const base = String(baseUrl || "").match(/^(https?:\/\/[^\/]+)(\/.*)?$/i);
    if (!base) return url;
    const origin = base[1];
    if (url.indexOf("/") === 0) return origin + url;

    const basePath = base[2] || "/";
    const directory = basePath.substring(0, basePath.lastIndexOf("/") + 1);
    return origin + directory + url;
  } catch (e) {
    return url;
  }
}

function getJsonLdImage(item) {
  if (!item) return "";
  const image = item.image;
  if (typeof image === "string") return image;
  if (Array.isArray(image) && image.length > 0) return String(image[0]);
  if (image && typeof image === "object") return image.url || image.contentUrl || "";
  return "";
}

function createSlug(text) {
  let value = String(text || "").trim().toLowerCase();
  value = value.replace(/[^\u0600-\u06FFa-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return value || "news";
}

function formatDate(value) {
  if (!value) return "";
  try {
    return Utilities.formatDate(new Date(value), Session.getScriptTimeZone() || TIMEZONE, "yyyy/MM/dd HH:mm");
  } catch (e) {
    return String(value);
  }
}

// تست‌ها
function testFetchNews() {
  fetchNews();
  Logger.log("دریافت آزمایشی اخبار انجام شد.");
}

function testHeyva() {
  const source = { name: "هیوا", category: "کنکور", urls: ["https://www.heyvagroup.com/"] };
  const result = fetchSourceNews(source);
  Logger.log("تعداد اخبار جدید هیوا: " + result);
}

function testHeyvaGoogleNews() {
  const url = "https://news.google.com/rss/search?q=site%3Aheyvagroup.com&hl=fa&gl=IR&ceid=IR:fa";
  try {
    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36" }
    });
    Logger.log("Google News RSS: " + url);
    Logger.log("HTTP: " + response.getResponseCode());

    const xml = response.getContentText("UTF-8");
    const source = { name: "هیوا", category: "کنکور", urls: ["https://www.heyvagroup.com/"] };
    const news = parseRSS(xml, source);
    Logger.log("تعداد خبرهای قابل استخراج: " + news.length);
    for (let i = 0; i < news.length; i++) {
      Logger.log("--------------------------------");
      Logger.log("عنوان: " + news[i].title);
      Logger.log("لینک: " + news[i].sourceUrl);
    }
  } catch (error) {
    Logger.log("خطا: " + String(error));
  }
}

function testGoogleNewsRedirect() {
  const rssUrl = "https://news.google.com/rss/search?q=site%3Aheyvagroup.com&hl=fa&gl=IR&ceid=IR:fa";
  const source = { name: "هیوا", category: "کنکور", urls: ["https://www.heyvagroup.com/"] };
  try {
    const response = UrlFetchApp.fetch(rssUrl, {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36" }
    });
    const xml = response.getContentText("UTF-8");
    const document = XmlService.parse(xml);
    const channel = document.getRootElement().getChild("channel");
    if (!channel) { Logger.log("channel پیدا نشد."); return; }
    const items = channel.getChildren("item");
    if (!items.length) { Logger.log("هیچ item در RSS وجود ندارد."); return; }

    const firstItem = items[0];
    const title = getXmlChildText(firstItem, "title");
    const link = getXmlChildText(firstItem, "link");
    Logger.log("عنوان نمونه: " + title);
    Logger.log("Google News URL: " + link);

    const resolved = resolveGoogleNewsUrl(link, title, source);
    Logger.log("نتیجه نهایی: " + (resolved || "هیچ لینک واقعی پیدا نشد."));
  } catch (error) {
    Logger.log("خطای testGoogleNewsRedirect: " + String(error));
  }
}