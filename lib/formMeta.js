export function getParam(name) {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get(name) || ''
}

export function buildTrackingFields() {
  return {

    // google sheet fields
    utm_source:    getParam('utm_source'),
    sub_source:       getParam('sub_source'),
    utm_medium:    getParam('utm_medium'), //
    utm_id:        getParam('utm_id'), // google campaign name
    ad_group_id:  getParam('ad_group_id') || getParam('asset_group_id'),
    utm_content:   getParam('utm_content'),// yhi  addId h
    campaign_name: getParam('campaign_name'),
     ad_group_name: getParam('ad_group_name') || getParam('asset_group_name'),
    ad_name: getParam('ad_name'),
    utm_term:      getParam('utm_term'),

    gclid:         getParam('gclid'),
    gbraid:        getParam('gbraid'),
    wbraid:        getParam('wbraid'),
    fbclid :     getParam('fbclid'),
    
    // utm_campaign:  getParam('utm_campaign'),
    
    
    // campaign_type: getParam('campaign_type'),  
   
    
   
    


    // New Google Parameters
    google_campaign_id:   getParam('utm_id'),
    google_ad_group_id:   getParam('ad_group_id'),
    google_ad_group_name: getParam('ad_group_name'),
    google_ad_name: getParam('ad_name'),
    google_ad_id:         getParam('utm_content'),
    google_wbraid:        getParam('google_wbraid'),
    google_gbraid:        getParam('google_gbraid'),
    google_keyword:       getParam('google_keyword'),
    google_matchtype:     getParam('matchtype'),
    // google_network:       getParam('network'),
    google_device:        getParam('google_device'),
    google_gclid:         getParam('google_gclid'),
    google_gad_source:    getParam('gad_source'),
    google_gad_campaignid:getParam('gad_campaignid'),
    sub_source:           getParam('sub_source'),
    asset_group_id:       getParam('asset_group_id'),

    //Meta variables
    meta_campaign_id: getParam('meta_campaign_id'),
    meta_adset_id:   getParam('meta_adset_id'),
    meta_adset_name: getParam('meta_adset_name'),
    meta_ad_name: getParam('meta_ad_name'),
    meta_ad_id:         getParam('utm_content') || getParam('meta_ad_id'),
    meta_creative_id:    getParam('meta_creative_id'),
    meta_placement:        getParam('meta_placement'),
    

    meta_fbclid :     getParam('fbclid'),
    user_agent: getParam('user_agent'),

    // New UTM Parameters
    utm_campaign_id:      getParam('utm_campaign_id'),
    utm_adgroup:          getParam('utm_adgroup'),
    // google_ad_group_name: getParam('google_ad_group_name'),
    utm_adgroup_id:       getParam('utm_adgroup_id'),
    utm_ad_id:            getParam('utm_ad_id'),
    utm_keyword:          getParam('utm_keyword'),
    utm_matchtype:        getParam('utm_matchtype'),
    utm_network:          getParam('utm_network'),  
    utm_device:           getParam('utm_device'),
    utm_gclid:            getParam('utm_gclid'),
    utm_gbraid:           getParam('utm_gbraid'),
    utm_wbraid:           getParam('utm_wbraid'),

    SourceURL:     typeof window !== 'undefined' ? window.location.href : '',
    landing_page:  typeof window !== 'undefined' ? window.location.href : '',
    referrer:      typeof document !== 'undefined' ? document.referrer : '',
    device:        typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : '',
    ip_address:    '',
    geo_city:      '',
    geo_region:    '',
    geo_postal:    '',
    geo_country:   '',
    website:       '',
  }
}

//landing= domain name +slug 










// /**
//  * Code.gs
//  * Receives form data and inserts leads into Google Sheet
//  * Timezone: IST
//  */
 
// const secret = "6c7f9ad8b2a1e0f4d5a8c0b9f6e2a4d190";
// const sheet_id = "1w3n-uE92SXjyWXLzVqz7SFCGgMJmM31NKdJ2u1GZ0yg";
// const default_tab = "Pune";
 
 
// /**
//  * Get current date/time in IST
//  */
// function getistdate() {
//   return Utilities.formatDate(
//     new Date(),
//     "Asia/Kolkata",
//     "yyyy-MM-dd HH:mm:ss"
//   );
// }
 
 
// /**
//  * Handle POST requests
//  */
// function doPost(e) {
//   try {
 
//     /* ---------- Validate POST Request ---------- */
 
//     if (!e || !e.postData) {
//       return jsonout(false, "no post data received");
//     }
 
 
//     /* ---------- Parse Incoming Data ---------- */
 
//     let data = {};
//     const contenttype = e.postData.type || "";
 
//     if (contenttype.indexOf("json") !== -1) {
 
//       data = JSON.parse(
//         e.postData.contents || "{}"
//       );
 
//     } else {
 
//       data = Object.assign(
//         {},
//         e.parameter || {}
//       );
 
//     }
 
 
//     /* ---------- Secret Validation ---------- */
 
//     if (!data.secret || data.secret !== secret) {
//       return jsonout(false, "invalid secret");
//     }
 
 
//     /* ---------- Sheet Name ---------- */
 
//     const sheetname = String(
//       data.sheet_name || default_tab
//     ).trim();
 
 
//     /* ---------- Open Spreadsheet ---------- */
 
//     const ss = SpreadsheetApp.openById(sheet_id);
 
//     let sheet = ss.getSheetByName(sheetname);
 
 
//     /* ---------- Create Sheet If Not Exists ---------- */
 
//     if (!sheet) {
 
//       sheet = ss.insertSheet(sheetname);
 
//       sheet.appendRow([
//         "fullname",
//         "firstname",
//         "lastname",
//         "mobile",
//         "email",
 
//         "utm_source",
//         "utm_id",
//         "utm_medium",
//         "campaign_name",
//         "sub_source",
//         "utm_term",
//         "utm_content",
 
//         "ad_name",
//         "ad_group_name",
//         "ad_group_id",
 
//         "gclid",
//         "gbraid",
//         "wbraid",
//         "fbclid",
 
//         "projectname",
//         "projectid",
 
//         "timestamp",
//         "formname",
//         "ipaddress",
//         "device",
 
//         "sourceurl",
//         "referrer",
//         "projectcity"
//       ]);
 
//     }
 
 
//     /* ---------- Build Row ----------
//        IMPORTANT:
//        Order must exactly match headers
//     */
 
//     const row = [
 
//       // Personal Details
//       data.fullname || "",
//       data.firstname || "",
//       data.lastname || "",
//       data.mobile || "",
//       data.email || "",
 
 
//       // UTM Tracking
//       data.utm_source || "",
//       data.utm_id || "",
//       data.utm_medium || "",
//       data.campaign_name || "",
//       data.sub_source || "",
//       data.utm_term || "",
//       data.utm_content || "",
 
 
//       // Ad Details
//       data.ad_name || "",
 
//       // Supports both:
//       // ad_group_name
//       // adgroup_name
//       data.ad_group_name ||
//       data.adgroup_name ||
//       "",
 
//       data.ad_group_id || "",
 
 
//       // Google / Meta Click IDs
//       data.gclid || "",
//       data.gbraid || "",
//       data.wbraid || "",
//       data.fbclid || "",
 
 
//       // Project Details
//       data.projectname || "",
//       data.projectid || "",
 
 
//       // Lead Details
//       getistdate(),
//       data.formname || "",
//       data.ipaddress || "",
//       data.device || "",
 
 
//       // Page Details
//       data.sourceurl ||
//       data.landing_page ||
//       "",
 
//       data.referrer || "",
 
//       data.projectcity || ""
//     ];
 
 
//     /* ---------- Insert Lead at Top ---------- */
 
//     sheet.insertRowBefore(2);
 
//     sheet
//       .getRange(
//         2,
//         1,
//         1,
//         row.length
//       )
//       .setValues([row]);
 
 
//     /* ---------- Success Response ---------- */
 
//     return jsonout(
//       true,
//       "lead added successfully"
//     );
 
 
//   } catch (err) {
 
//     console.error(err);
 
//     return jsonout(
//       false,
//       err.message || String(err)
//     );
//   }
// }
 
 
// /**
//  * JSON Response
//  */
// function jsonout(success, message) {
 
//   return ContentService
//     .createTextOutput(
//       JSON.stringify({
//         success: success,
//         message: message
//       })
//     )
//     .setMimeType(
//       ContentService.MimeType.JSON
//     );
// }