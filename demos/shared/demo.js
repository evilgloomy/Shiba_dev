/* Shiba Dev — shared demo helpers */
(function (global) {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function isZh() {
    return document.documentElement.lang === "zh-Hant";
  }

  function setLang(lang) {
    var zh = lang === "zh-Hant";
    document.documentElement.lang = zh ? "zh-Hant" : "en";
    var btnEn = document.getElementById("lang-en");
    var btnZh = document.getElementById("lang-zh");
    if (btnEn) btnEn.setAttribute("aria-pressed", String(!zh));
    if (btnZh) btnZh.setAttribute("aria-pressed", String(zh));
    try {
      localStorage.setItem("shiba-lang", document.documentElement.lang);
    } catch (e) {}
    document.dispatchEvent(new CustomEvent("shiba:lang", { detail: { zh: zh } }));
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem("shiba-lang"); } catch (e) {}
    if (saved === "zh-Hant" || saved === "en") setLang(saved);
    else setLang(document.documentElement.lang === "zh-Hant" ? "zh-Hant" : "en");
    var btnEn = document.getElementById("lang-en");
    var btnZh = document.getElementById("lang-zh");
    if (btnEn) btnEn.addEventListener("click", function () { setLang("en"); });
    if (btnZh) btnZh.addEventListener("click", function () { setLang("zh-Hant"); });
  }

  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, reduceMotion ? 0 : ms);
    });
  }

  function toast(msg, ms) {
    var el = document.getElementById("demo-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "demo-toast";
      el.className = "demo-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(el._t);
    el._t = setTimeout(function () {
      el.classList.remove("is-visible");
    }, ms || 2600);
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  }

  /* Interactive chat widget */
  function initChat(opts) {
    opts = opts || {};
    var root = document.getElementById(opts.id || "demo-chat");
    if (!root) return null;
    var body = root.querySelector("[data-chat-body]");
    var intentsEl = root.querySelector("[data-chat-intents]");
    var toggle = root.querySelector("[data-chat-toggle]");
    var head = root.querySelector(".demo-chat-head");
    var intents = opts.intents || [];
    var busy = false;

    function append(role, text, typing) {
      if (!body) return null;
      var el = document.createElement("div");
      if (typing) {
        el.className = "bubble bubble-typing";
        el.innerHTML = "<span></span><span></span><span></span>";
        el.setAttribute("aria-hidden", "true");
      } else {
        el.className = "bubble bubble-" + (role === "user" ? "user" : "bot");
        el.textContent = text;
      }
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
      return el;
    }

    function greet() {
      if (!body) return;
      body.innerHTML = "";
      var g = isZh() ? (opts.greetZh || opts.greetEn) : (opts.greetEn || "");
      append("bot", g, false);
    }

    function renderIntents() {
      if (!intentsEl) return;
      intentsEl.innerHTML = "";
      intents.forEach(function (intent) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = isZh() ? intent.zh : intent.en;
        b.addEventListener("click", function () {
          if (busy) return;
          runIntent(intent);
        });
        intentsEl.appendChild(b);
      });
    }

    function setIntentsDisabled(disabled) {
      if (!intentsEl) return;
      intentsEl.querySelectorAll("button").forEach(function (b) {
        b.disabled = disabled;
      });
    }

    function runIntent(intent) {
      busy = true;
      setIntentsDisabled(true);
      append("user", isZh() ? intent.zh : intent.en, false);
      var typing = reduceMotion ? null : append("bot", "", true);
      delay(reduceMotion ? 0 : 780).then(function () {
        if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
        var reply = isZh() ? intent.replyZh : intent.replyEn;
        append("bot", reply, false);
        if (intent.handoff) {
          var link = document.createElement("a");
          link.className = "bubble bubble-bot";
          link.href = "mailto:hello@shiba-dev.com?subject=Discovery%20Call%20%E2%80%94%20" + encodeURIComponent(opts.brand || "Demo");
          link.style.textDecoration = "none";
          link.style.display = "inline-block";
          link.textContent = isZh() ? "電郵預約 Discovery Call →" : "Email to book a Discovery Call →";
          body.appendChild(link);
          body.scrollTop = body.scrollHeight;
        }
        busy = false;
        setIntentsDisabled(false);
      });
    }

    function setCollapsed(collapsed) {
      root.classList.toggle("is-collapsed", collapsed);
      if (toggle) {
        toggle.setAttribute("aria-expanded", String(!collapsed));
        toggle.textContent = collapsed ? "+" : "−";
      }
    }

    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        setCollapsed(!root.classList.contains("is-collapsed"));
      });
    }
    if (head) {
      head.addEventListener("click", function (e) {
        if (e.target.closest("[data-chat-toggle]")) return;
        if (root.classList.contains("is-collapsed")) setCollapsed(false);
      });
    }

    greet();
    renderIntents();
    document.addEventListener("shiba:lang", function () {
      greet();
      renderIntents();
    });

    return { greet: greet, runIntent: runIntent };
  }

  function bindForm(formId, options) {
    var form = document.getElementById(formId);
    if (!form) return;
    options = options || {};
    var errorEl = form.querySelector("[data-form-error]");
    var successEl = form.querySelector("[data-form-success]");
    var againBtn = form.querySelector("[data-form-again]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorEl) { errorEl.hidden = true; errorEl.textContent = ""; }
      var data = new FormData(form);
      var required = options.required || [];
      for (var i = 0; i < required.length; i++) {
        var key = required[i];
        var val = String(data.get(key) || "").trim();
        if (!val) {
          if (errorEl) {
            errorEl.hidden = false;
            errorEl.textContent = isZh()
              ? (options.errorZh || "請填寫所有必填欄位。")
              : (options.errorEn || "Please complete all required fields.");
          }
          return;
        }
      }
      if (options.emailField) {
        var email = String(data.get(options.emailField) || "").trim();
        if (!validEmail(email)) {
          if (errorEl) {
            errorEl.hidden = false;
            errorEl.textContent = isZh() ? "請輸入有效電郵。" : "Please enter a valid email.";
          }
          return;
        }
      }
      form.classList.add("is-done");
      if (successEl) successEl.classList.add("is-visible");
      toast(isZh() ? (options.toastZh || "已送出（示範）") : (options.toastEn || "Submitted (demo)"), 2200);
      if (typeof options.onSuccess === "function") options.onSuccess(data);
    });

    if (againBtn) {
      againBtn.addEventListener("click", function () {
        form.reset();
        form.classList.remove("is-done");
        if (successEl) successEl.classList.remove("is-visible");
        if (errorEl) { errorEl.hidden = true; }
      });
    }
  }

  global.ShibaDemo = {
    isZh: isZh,
    setLang: setLang,
    initLang: initLang,
    delay: delay,
    toast: toast,
    validEmail: validEmail,
    initChat: initChat,
    bindForm: bindForm,
    reduceMotion: reduceMotion
  };

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
  });
})(window);
