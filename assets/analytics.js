/* Shiba Dev — privacy-first GA4 (consent-gated). Measurement ID G-YZ3KBSHPJV */
(function () {
  "use strict";

  var MEASUREMENT_ID = "G-YZ3KBSHPJV";
  var STORAGE_KEY = "shiba_ga_consent";
  var GTAG_SRC = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function loadGtag() {
    if (window.__shibaGaLoaded) return;
    window.__shibaGaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID);

    var s = document.createElement("script");
    s.async = true;
    s.src = GTAG_SRC;
    document.head.appendChild(s);
  }

  function injectStyles() {
    if (document.getElementById("shiba-ga-styles")) return;
    var style = document.createElement("style");
    style.id = "shiba-ga-styles";
    style.textContent = [
      "#shiba-ga-banner{",
      "position:fixed;left:0;right:0;bottom:0;z-index:9999;",
      "padding:0.85rem clamp(0.85rem,3vw,1.25rem);",
      "background:#FAF7F4;color:#111111;",
      "border-top:1px solid rgba(17,17,17,0.12);",
      "box-shadow:0 -8px 28px rgba(17,17,17,0.08);",
      "font-family:Inter,\"Noto Sans TC\",\"Noto Sans HK\",\"PingFang TC\",\"Microsoft JhengHei\",system-ui,-apple-system,sans-serif;",
      "}",
      "#shiba-ga-banner .shiba-ga-inner{",
      "width:min(1120px,100%);margin-inline:auto;",
      "display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem 1rem;",
      "}",
      "#shiba-ga-banner .shiba-ga-text{",
      "flex:1 1 16rem;margin:0;font-size:0.875rem;line-height:1.45;color:#3D3530;",
      "}",
      "#shiba-ga-banner .shiba-ga-actions{",
      "display:flex;flex-wrap:wrap;gap:0.5rem;flex-shrink:0;",
      "}",
      "#shiba-ga-banner button{",
      "appearance:none;border-radius:999px;padding:0.45rem 0.95rem;",
      "font:inherit;font-size:0.8125rem;font-weight:600;cursor:pointer;",
      "border:1px solid rgba(17,17,17,0.14);background:#fff;color:#111;",
      "}",
      "#shiba-ga-banner button:hover{border-color:#6B4A3A;}",
      "#shiba-ga-banner button.shiba-ga-accept{",
      "background:#111;color:#F5D6C6;border-color:#111;",
      "}",
      "#shiba-ga-banner button.shiba-ga-accept:hover{background:#3D3530;border-color:#3D3530;}",
      "#shiba-ga-banner button:focus-visible{outline:2px solid #6B4A3A;outline-offset:2px;}",
      "html[lang=\"en\"] #shiba-ga-banner .lang-zh,",
      "html[lang=\"zh-Hant\"] #shiba-ga-banner .lang-en{display:none!important;}",
      "@media (max-width:560px){",
      "#shiba-ga-banner{padding-bottom:calc(0.85rem + env(safe-area-inset-bottom,0px));}",
      "#shiba-ga-banner .shiba-ga-actions{width:100%;}",
      "#shiba-ga-banner button{flex:1 1 auto;text-align:center;}",
      "}"
    ].join("");
    document.head.appendChild(style);
  }

  function hideBanner() {
    var el = document.getElementById("shiba-ga-banner");
    if (el) el.remove();
  }

  function showBanner() {
    if (document.getElementById("shiba-ga-banner")) return;
    injectStyles();

    var banner = document.createElement("div");
    banner.id = "shiba-ga-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<div class="shiba-ga-inner">' +
      '<p class="shiba-ga-text">' +
      '<span class="lang-en">We use cookies and analytics to understand site traffic. No sale of personal data.</span>' +
      '<span class="lang-zh">我們使用 cookies 與分析工具了解網站流量。不會出售個人資料。</span>' +
      "</p>" +
      '<div class="shiba-ga-actions">' +
      '<button type="button" class="shiba-ga-accept" data-ga-consent="1">' +
      '<span class="lang-en">Accept</span><span class="lang-zh">接受</span>' +
      "</button>" +
      '<button type="button" class="shiba-ga-decline" data-ga-consent="0">' +
      '<span class="lang-en">Decline</span><span class="lang-zh">拒絕</span>' +
      "</button>" +
      "</div></div>";

    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-ga-consent]");
      if (!btn) return;
      var value = btn.getAttribute("data-ga-consent");
      setConsent(value);
      hideBanner();
      if (value === "1") loadGtag();
    });

    document.body.appendChild(banner);
  }

  function init() {
    var consent = getConsent();
    if (consent === "1") {
      loadGtag();
      return;
    }
    if (consent === "0") {
      return;
    }
    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
