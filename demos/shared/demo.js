/* Shiba Dev — shared demo helpers (v=real2) */
(function (global) {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /**
   * Interactive chat for mockup widgets.
   * opts: {
   *   id, greet, intents:[{label, reply}|{label, user, reply}],
   *   replies: {keyword: reply} for free text,
   *   defaultReply, onSend
   * }
   */
  function initChat(opts) {
    opts = opts || {};
    var root = document.getElementById(opts.id || "demo-chat");
    if (!root) return null;
    var body = root.querySelector("[data-chat-body]");
    var intentsEl = root.querySelector("[data-chat-intents]");
    var form = root.querySelector("[data-chat-form]");
    var input = root.querySelector("[data-chat-input]");
    var toggle = root.querySelector("[data-chat-toggle]");
    var closeBtn = root.querySelector("[data-chat-close]");
    var intents = opts.intents || [];
    var busy = false;

    function append(role, text, typing) {
      if (!body) return null;
      var el = document.createElement("div");
      if (typing) {
        el.className = (opts.typingClass || "bubble bubble-typing");
        el.innerHTML = "<span></span><span></span><span></span>";
        el.setAttribute("aria-hidden", "true");
      } else {
        el.className = role === "user"
          ? (opts.userClass || "bubble bubble-user")
          : (opts.botClass || "bubble bubble-bot");
        el.textContent = text;
      }
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
      return el;
    }

    function matchReply(text) {
      var lower = String(text || "").toLowerCase();
      var map = opts.replies || {};
      var keys = Object.keys(map);
      for (var i = 0; i < keys.length; i++) {
        if (lower.indexOf(keys[i].toLowerCase()) !== -1) return map[keys[i]];
      }
      return opts.defaultReply || "Thanks — this is a concept demo. A real assistant would continue from here.";
    }

    function replyWith(userText, botText) {
      if (busy) return;
      busy = true;
      if (userText) append("user", userText, false);
      var typing = reduceMotion ? null : append("bot", "", true);
      delay(reduceMotion ? 0 : (opts.typingMs || 720)).then(function () {
        if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
        append("bot", botText, false);
        busy = false;
        if (typeof opts.onReply === "function") opts.onReply(userText, botText);
      });
    }

    function renderIntents() {
      if (!intentsEl) return;
      intentsEl.innerHTML = "";
      intents.forEach(function (intent) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = intent.className || "";
        b.textContent = intent.label;
        b.addEventListener("click", function () {
          if (busy) return;
          var userMsg = intent.user || intent.label;
          var botMsg = intent.reply;
          replyWith(userMsg, botMsg);
        });
        intentsEl.appendChild(b);
      });
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!input || busy) return;
        var val = String(input.value || "").trim();
        if (!val) return;
        input.value = "";
        replyWith(val, matchReply(val));
      });
    }

    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        root.classList.toggle("is-collapsed");
        toggle.setAttribute("aria-expanded", String(!root.classList.contains("is-collapsed")));
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        root.classList.add("is-hidden");
      });
    }

    if (body && opts.greet && !body.children.length) {
      append("bot", opts.greet, false);
    }
    renderIntents();

    return { replyWith: replyWith, append: append };
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
            errorEl.textContent = options.errorMsg || "Please complete all required fields.";
          }
          return;
        }
      }
      if (options.emailField) {
        var email = String(data.get(options.emailField) || "").trim();
        if (!validEmail(email)) {
          if (errorEl) {
            errorEl.hidden = false;
            errorEl.textContent = options.emailError || "Please enter a valid email.";
          }
          return;
        }
      }
      form.classList.add("is-done");
      if (successEl) successEl.classList.add("is-visible");
      toast(options.toastMsg || "Submitted (concept demo)", 2200);
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


  function openModal(opts) {
    opts = opts || {};
    var existing = document.getElementById("demo-modal");
    if (existing) existing.parentNode.removeChild(existing);
    var overlay = document.createElement("div");
    overlay.id = "demo-modal";
    overlay.className = "demo-modal is-open";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    var card = document.createElement("div");
    card.className = "demo-modal-card";
    if (opts.dark) {
      card.style.background = "#161618";
      card.style.color = "#F4F1EA";
    }
    var close = document.createElement("button");
    close.type = "button";
    close.className = "demo-modal-close";
    close.setAttribute("aria-label", "Close");
    close.textContent = "×";
    var title = document.createElement("h3");
    title.textContent = opts.title || "";
    var body = document.createElement("div");
    if (opts.html) body.innerHTML = opts.html;
    else {
      var p = document.createElement("p");
      p.textContent = opts.body || "";
      body.appendChild(p);
    }
    card.appendChild(close);
    card.appendChild(title);
    card.appendChild(body);
    if (opts.actions && opts.actions.length) {
      var row = document.createElement("div");
      row.className = "demo-modal-actions";
      opts.actions.forEach(function (act) {
        var b = document.createElement(act.href ? "a" : "button");
        if (act.href) b.href = act.href;
        else b.type = "button";
        b.textContent = act.label;
        if (act.className) b.className = act.className;
        if (act.style) b.setAttribute("style", act.style);
        b.addEventListener("click", function (e) {
          if (typeof act.onClick === "function") act.onClick(e);
          if (!act.keepOpen) closeModal();
        });
        row.appendChild(b);
      });
      card.appendChild(row);
    }
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    function onKey(e) { if (e.key === "Escape") closeModal(); }
    function onBg(e) { if (e.target === overlay) closeModal(); }
    close.addEventListener("click", closeModal);
    overlay.addEventListener("click", onBg);
    document.addEventListener("keydown", onKey);
    overlay._cleanup = function () {
      document.removeEventListener("keydown", onKey);
    };
    return overlay;
  }

  function closeModal() {
    var el = document.getElementById("demo-modal");
    if (!el) return;
    if (el._cleanup) el._cleanup();
    el.parentNode.removeChild(el);
  }

  global.ShibaDemo = {
    delay: delay,
    toast: toast,
    validEmail: validEmail,
    initChat: initChat,
    bindForm: bindForm,
    openModal: openModal,
    closeModal: closeModal,
    reduceMotion: reduceMotion
  };
})(window);
