/* Shiba Dev — shared mockup demo helpers (v=mock1) */
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

  global.ShibaDemo = {
    delay: delay,
    toast: toast,
    validEmail: validEmail,
    initChat: initChat,
    bindForm: bindForm,
    reduceMotion: reduceMotion
  };
})(window);
