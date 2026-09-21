/* Shiba Dev landing — vanilla interactions */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Language ---------- */
  var btnEn = document.getElementById("lang-en");
  var btnZh = document.getElementById("lang-zh");

  function setLang(lang) {
    var isZh = lang === "zh-Hant";
    root.lang = isZh ? "zh-Hant" : "en";
    if (btnEn) btnEn.setAttribute("aria-pressed", String(!isZh));
    if (btnZh) btnZh.setAttribute("aria-pressed", String(isZh));
    try {
      localStorage.setItem("shiba-lang", root.lang);
    } catch (e) {}

    document.title = isZh
      ? "Shiba Dev — 真正可運作的智能系統"
      : "Shiba Dev — Operational Intelligent Systems";

    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        isZh
          ? "Shiba Dev 交付真正可運作的智能系統——智能品牌網站、多語言數位代表、ArtistAgent.AI。溫哥華 / 香港。由 The Shiba Inu Media Company Inc. 營運。"
          : "Shiba Dev delivers operational intelligent systems — intelligent brand websites, multilingual digital reps, and ArtistAgent.AI. Vancouver / Hong Kong. Operated by The Shiba Inu Media Company Inc."
      );
    }

    var og = document.querySelector('meta[property="og:locale"]');
    if (og) og.setAttribute("content", isZh ? "zh_HK" : "en_US");
  }

  if (btnEn && btnZh) {
    setLang(root.lang === "zh-Hant" ? "zh-Hant" : "en");
    btnEn.addEventListener("click", function () {
      setLang("en");
    });
    btnZh.addEventListener("click", function () {
      setLang("zh-Hant");
    });
  }

  if (window.SHIBA_BOOKING_URL) {
    document.querySelectorAll("[data-booking-placeholder]").forEach(function (a) {
      a.setAttribute("href", window.SHIBA_BOOKING_URL);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Example gallery tabs ---------- */
  var tablist = document.getElementById("example-tabs");
  var tabs = tablist ? Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]')) : [];
  var panes = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"][data-example]'));

  function activateExample(id, focusTab) {
    tabs.forEach(function (tab) {
      var selected = tab.getAttribute("data-example") === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panes.forEach(function (pane) {
      var on = pane.getAttribute("data-example") === id;
      pane.classList.toggle("is-active", on);
      pane.hidden = !on;
    });
    if (focusTab) {
      var t = tabs.find(function (tab) {
        return tab.getAttribute("data-example") === id;
      });
      if (t) t.focus();
    }
  }

  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateExample(tab.getAttribute("data-example"), false);
      });
      tab.addEventListener("keydown", function (e) {
        var i = tabs.indexOf(tab);
        var next = i;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          next = (i + 1) % tabs.length;
          e.preventDefault();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          next = (i - 1 + tabs.length) % tabs.length;
          e.preventDefault();
        } else if (e.key === "Home") {
          next = 0;
          e.preventDefault();
        } else if (e.key === "End") {
          next = tabs.length - 1;
          e.preventDefault();
        } else {
          return;
        }
        activateExample(tabs[next].getAttribute("data-example"), true);
      });
    });
    var initial = tabs.find(function (t) {
      return t.getAttribute("aria-selected") === "true";
    });
    activateExample((initial || tabs[0]).getAttribute("data-example"), false);
  }

  /* ---------- Say / Avoid mobile toggle ---------- */
  var compareStack = document.getElementById("compare-stack");
  var sayBtn = document.getElementById("view-say");
  var avoidBtn = document.getElementById("view-avoid");

  function setCompareView(view) {
    if (!compareStack) return;
    compareStack.setAttribute("data-view", view);
    if (sayBtn) sayBtn.setAttribute("aria-pressed", String(view === "say"));
    if (avoidBtn) avoidBtn.setAttribute("aria-pressed", String(view === "avoid"));
  }

  if (sayBtn && avoidBtn) {
    sayBtn.addEventListener("click", function () {
      setCompareView("say");
    });
    avoidBtn.addEventListener("click", function () {
      setCompareView("avoid");
    });
    setCompareView("say");
  }

  /* ---------- Ambient blob parallax ---------- */
  var blobs = document.querySelectorAll(".ambient-blob");
  if (!reduceMotion && blobs.length && window.matchMedia("(pointer: fine)").matches) {
    var raf = null;
    var tx = 0;
    var ty = 0;
    window.addEventListener(
      "pointermove",
      function (e) {
        tx = (e.clientX / window.innerWidth - 0.5) * 18;
        ty = (e.clientY / window.innerHeight - 0.5) * 14;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          blobs.forEach(function (b, i) {
            var f = (i + 1) * 0.55;
            b.style.transform = "translate(" + tx * f + "px, " + ty * f + "px)";
          });
          raf = null;
        });
      },
      { passive: true }
    );
  }

  /* ---------- Soft cursor glow ---------- */
  var glow = document.querySelector(".cursor-glow");
  if (!reduceMotion && glow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.body.classList.add("has-cursor-glow");
    window.addEventListener(
      "pointermove",
      function (e) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      },
      { passive: true }
    );
  }
})();
