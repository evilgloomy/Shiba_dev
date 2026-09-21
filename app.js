/* Shiba Dev landing — vanilla interactions (visual rebuild) */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Language ---------- */
  var btnEn = document.getElementById("lang-en");
  var btnZh = document.getElementById("lang-zh");

  function isZh() {
    return root.lang === "zh-Hant";
  }

  function setLang(lang) {
    var zh = lang === "zh-Hant";
    root.lang = zh ? "zh-Hant" : "en";
    if (btnEn) btnEn.setAttribute("aria-pressed", String(!zh));
    if (btnZh) btnZh.setAttribute("aria-pressed", String(zh));
    try {
      localStorage.setItem("shiba-lang", root.lang);
    } catch (e) {}

    document.title = zh
      ? "Shiba Dev — 真正可運作的智能系統"
      : "Shiba Dev — Operational Intelligent Systems";

    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        zh
          ? "Shiba Dev 交付真正可運作的智能系統——智能品牌網站、多語言數位代表、ArtistAgent.AI。溫哥華 / 香港。由 The Shiba Inu Media Company Inc. 營運。"
          : "Shiba Dev delivers operational intelligent systems — intelligent brand websites, multilingual digital reps, and ArtistAgent.AI. Vancouver / Hong Kong. Operated by The Shiba Inu Media Company Inc."
      );
    }
    var og = document.querySelector('meta[property="og:locale"]');
    if (og) og.setAttribute("content", zh ? "zh_HK" : "en_US");

    /* Re-run active demo chat in current language */
    if (window.__shibaRerunChat) window.__shibaRerunChat();
    if (window.__shibaResetFab) window.__shibaResetFab();
  }

  if (btnEn && btnZh) {
    setLang(root.lang === "zh-Hant" ? "zh-Hant" : "en");
    btnEn.addEventListener("click", function () { setLang("en"); });
    btnZh.addEventListener("click", function () { setLang("zh-Hant"); });
  }

  if (window.SHIBA_BOOKING_URL) {
    document.querySelectorAll("[data-booking-placeholder]").forEach(function (a) {
      a.setAttribute("href", window.SHIBA_BOOKING_URL);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
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
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Nav spy / progress dots ---------- */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll("[data-spy]"));
  var spyIds = spyLinks.map(function (a) { return a.getAttribute("data-spy"); });
  function updateSpy() {
    var y = window.scrollY + window.innerHeight * 0.28;
    var current = spyIds[0];
    spyIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    spyLinks.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-spy") === current);
    });
  }
  window.addEventListener("scroll", updateSpy, { passive: true });
  updateSpy();

  /* ---------- Demo worlds data ---------- */
  var WORLDS = {
    lumina: {
      name: "LUMINA",
      catEn: "Healthcare · Private clinic",
      catZh: "醫療 · 私人診所",
      blurbEn: "Private clinic · multilingual site + Lumina AI Concierge",
      blurbZh: "私人診所 · 多語言網站 + Lumina AI Concierge",
      agent: "Lumina AI Concierge",
      jpg: "assets/demo-lumina.jpg",
      png: "assets/demo-lumina.png",
      turns: [
        { role: "bot", en: "Hello — I can help with services, FAQs, or booking triage. What do you need today?", zh: "您好——我可協助服務介紹、常見問題或預約分流。今天需要甚麼？" },
        { role: "user", en: "I'd like to book a consultation.", zh: "我想預約諮詢。" },
        { role: "bot", en: "Of course. Prefer morning or afternoon? I'll prepare a triage note for the clinic team.", zh: "好的。您較方便早上還是下午？我會為診所團隊準備分流摘要。" },
        { role: "user", en: "Afternoon, please — and English is fine.", zh: "下午方便，英文或粵語都可以。" },
        { role: "bot", en: "Noted. I've queued an afternoon slot request. A staff member will confirm within one business day. Anything else?", zh: "已記下。已送出下午時段請求，職員會於一個工作天內確認。還需要其他協助嗎？" }
      ]
    },
    veritas: {
      name: "VERITAS LAW",
      catEn: "Professional services · Law",
      catZh: "專業服務 · 法律",
      blurbEn: "Professional services · brand site + Veritas AI Assistant",
      blurbZh: "專業服務 · 品牌網站 + Veritas AI 助理",
      agent: "Veritas AI Assistant",
      jpg: "assets/demo-veritas.jpg",
      png: "assets/demo-veritas.png",
      turns: [
        { role: "bot", en: "I answer from approved practice materials only. Complex matters escalate to a lawyer.", zh: "我只依據核准實務材料回覆。複雜事項會升級至律師。" },
        { role: "user", en: "Do you handle corporate structuring in Hong Kong?", zh: "你們有處理香港公司架構嗎？" },
        { role: "bot", en: "Yes — corporate and commercial matters are in scope. I can take a brief enquiry and route it for conflict checks.", zh: "可以——公司與商事屬服務範圍。我可先收簡述並安排利益衝突檢查。" },
        { role: "user", en: "Please connect me with a partner.", zh: "請幫我轉接合夥人。" },
        { role: "bot", en: "Handing off now with your notes. A lawyer will follow up — I won't give legal advice in this chat.", zh: "正在連同摘要轉接。律師會跟進——此對話不會提供法律意見。" }
      ]
    },
    aurora: {
      name: "AURORA RESIDENCES",
      catEn: "Hospitality / Real estate",
      catZh: "酒店／地產",
      blurbEn: "Hotel / RE · high-end imagery + Aurora Concierge",
      blurbZh: "酒店／地產 · 高端形象 + Aurora Concierge",
      agent: "Aurora Concierge",
      jpg: "assets/demo-aurora.jpg",
      png: "assets/demo-aurora.png",
      turns: [
        { role: "bot", en: "I can introduce the project, book a viewing, or connect you to our VIP desk.", zh: "我可介紹項目、預約睇樓，或轉接 VIP 專席。" },
        { role: "user", en: "I'd like a private waterfront viewing this weekend.", zh: "想預約今個週末的海濱私人睇樓。" },
        { role: "bot", en: "Wonderful. Saturday or Sunday — and how many guests?", zh: "好的。星期六還是日？同行幾位？" },
        { role: "user", en: "Sunday, two of us.", zh: "星期日，兩位。" },
        { role: "bot", en: "Request sent to VIP scheduling. You'll receive confirmation with arrival details shortly.", zh: "已送出 VIP 排程請求，稍後會收到確認與到訪詳情。" }
      ]
    },
    velocity: {
      name: "VELOCITY X",
      catEn: "Automotive · Simulator",
      catZh: "汽車 · 模擬器",
      blurbEn: "Auto / simulator · interactive platform + VXR ELITE",
      blurbZh: "汽車／模擬器 · 互動平台 + VXR ELITE",
      agent: "VXR ELITE",
      jpg: "assets/demo-velocity.jpg",
      png: "assets/demo-velocity.png",
      turns: [
        { role: "bot", en: "Ready to drive? I can book a bay, explain models, or open your member telemetry.", zh: "準備開跑？我可預約車位、介紹車型，或開啟會員數據面板。" },
        { role: "user", en: "Book Friday evening — GT3 if available.", zh: "預約星期五晚，有 GT3 更好。" },
        { role: "bot", en: "Checking bay availability… GT3 bay B is free 19:00–20:00. Shall I hold it?", zh: "查詢中……GT3 B 位 19:00–20:00 空閒。要我暫留嗎？" },
        { role: "user", en: "Hold it — use my member points.", zh: "暫留，用我的會員積分。" },
        { role: "bot", en: "Held. 2,840 → 2,640 points after session. See you Friday.", zh: "已暫留。完場後積分 2,840 → 2,640。星期五見。" }
      ]
    },
    luna: {
      name: "LUNA",
      catEn: "Creator brand",
      catZh: "創作者品牌",
      blurbEn: "Creator brand · personal site + LUNA AI Rep",
      blurbZh: "創作者品牌 · 個人官網 + LUNA AI Rep",
      agent: "LUNA AI Rep",
      jpg: "assets/demo-luna.jpg",
      png: "assets/demo-luna.png",
      turns: [
        { role: "bot", en: "Ask about shows, merch, or collabs — deals escalate to Luna's team.", zh: "可查詢演出、周邊或合作——商務決策轉接團隊。" },
        { role: "user", en: "When is the next Asia tour date?", zh: "下次亞洲巡演是甚麼時候？" },
        { role: "bot", en: "Next confirmed stop: Taipei · Oct 18. Want merch pre-order links too?", zh: "下一站確認：台北 · 10 月 18 日。要一併看周邊預購連結嗎？" },
        { role: "user", en: "Yes — and a brand collab enquiry.", zh: "好，另外有品牌合作查詢。" },
        { role: "bot", en: "Merch link queued. Collab notes go to the team — they'll reply with guidelines.", zh: "周邊連結已備好。合作摘要已轉交團隊，他們會回覆指引。" }
      ]
    },
    nexora: {
      name: "NEXORA",
      catEn: "Startup / investor",
      catZh: "初創／投資者",
      blurbEn: "Startup / investor · enterprise showcase + portal",
      blurbZh: "初創／投資者 · 企業展示 + 投資入口",
      agent: "Nexora Portal",
      jpg: "assets/demo-nexora.jpg",
      png: "assets/demo-nexora.png",
      turns: [
        { role: "bot", en: "Welcome. I can share product FAQs, ARR highlights, or route investor / partner access requests.", zh: "歡迎。我可分享產品 FAQ、ARR 重點，或轉介投資／商務入口申請。" },
        { role: "user", en: "Request investor portal access.", zh: "想申請投資者入口。" },
        { role: "bot", en: "Gladly. Organisation name and preferred contact email?", zh: "好的。機構名稱與聯絡電郵？" },
        { role: "user", en: "Horizon Capital · ir@horizon.example", zh: "Horizon Capital · ir@horizon.example" },
        { role: "bot", en: "Request logged. IR will review and send NDA + portal credentials if approved.", zh: "已登記。IR 審核後若通過會寄出 NDA 與入口憑證。" }
      ]
    }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll("#example-tabs [role='tab']"));
  var stageImg = document.getElementById("stage-img");
  var stageSource = document.getElementById("stage-source");
  var stageCat = document.getElementById("stage-cat");
  var stageName = document.getElementById("stage-name");
  var stageBlurbEn = document.getElementById("stage-blurb-en");
  var stageBlurbZh = document.getElementById("stage-blurb-zh");
  var chatAgent = document.getElementById("chat-agent");
  var chatBody = document.getElementById("chat-body");
  var demoStage = document.getElementById("demo-stage");
  var chatTimer = null;
  var activeWorld = "lumina";

  function clearChatTimers() {
    if (chatTimer) {
      clearTimeout(chatTimer);
      chatTimer = null;
    }
  }

  function appendBubble(role, text, typing) {
    if (!chatBody) return null;
    var el = document.createElement("div");
    if (typing) {
      el.className = "bubble bubble-typing";
      el.innerHTML = "<span></span><span></span><span></span>";
      el.setAttribute("aria-hidden", "true");
    } else {
      el.className = "bubble bubble-" + (role === "user" ? "user" : "bot");
      el.textContent = text;
    }
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
    return el;
  }

  function playChat(id) {
    clearChatTimers();
    var world = WORLDS[id];
    if (!world || !chatBody) return;
    chatBody.innerHTML = "";
    var turns = world.turns.slice();
    var i = 0;
    var delay = reduceMotion ? 0 : 420;

    function next() {
      if (i >= turns.length) return;
      var turn = turns[i];
      var text = isZh() ? turn.zh : turn.en;

      if (turn.role === "bot" && !reduceMotion) {
        var typing = appendBubble("bot", "", true);
        chatTimer = setTimeout(function () {
          if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
          appendBubble("bot", text, false);
          i += 1;
          chatTimer = setTimeout(next, 520);
        }, 780);
      } else {
        appendBubble(turn.role, text, false);
        i += 1;
        chatTimer = setTimeout(next, delay);
      }
    }
    next();
  }

  function activateExample(id, focusTab, scrollLive) {
    if (!WORLDS[id]) return;
    activeWorld = id;
    var world = WORLDS[id];

    tabs.forEach(function (tab) {
      var selected = tab.getAttribute("data-example") === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle("is-selected", selected);
    });

    if (stageSource) stageSource.setAttribute("srcset", world.jpg);
    if (stageImg) {
      stageImg.src = world.png;
      stageImg.alt = world.name + " demo — photoreal mockup";
      stageImg.style.animation = "none";
      void stageImg.offsetWidth;
      stageImg.style.animation = "";
    }
    if (stageCat) stageCat.textContent = isZh() ? world.catZh : world.catEn;
    if (stageName) stageName.textContent = world.name;
    if (stageBlurbEn) stageBlurbEn.textContent = world.blurbEn;
    if (stageBlurbZh) stageBlurbZh.textContent = world.blurbZh;
    if (chatAgent) chatAgent.textContent = world.agent;
    if (demoStage) {
      var tab = tabs.find(function (t) { return t.getAttribute("data-example") === id; });
      if (tab) demoStage.setAttribute("aria-labelledby", tab.id);
    }

    playChat(id);

    if (scrollLive && (id === "lumina" || id === "veritas")) {
      var liveTarget = document.getElementById(id === "lumina" ? "demo-concierge" : "demo-intake");
      if (liveTarget) {
        document.querySelectorAll(".live-demo-card.is-spotlight").forEach(function (el) {
          el.classList.remove("is-spotlight");
        });
        liveTarget.classList.add("is-spotlight");
        if (!reduceMotion) {
          try { liveTarget.scrollIntoView({ behavior: "smooth", block: "start" }); }
          catch (e) { liveTarget.scrollIntoView(true); }
        }
        window.setTimeout(function () {
          liveTarget.classList.remove("is-spotlight");
        }, 2600);
      }
    }

    if (focusTab) {
      var t = tabs.find(function (tab) { return tab.getAttribute("data-example") === id; });
      if (t) t.focus();
    }
  }

  window.__shibaRerunChat = function () {
    if (stageCat && WORLDS[activeWorld]) {
      stageCat.textContent = isZh() ? WORLDS[activeWorld].catZh : WORLDS[activeWorld].catEn;
    }
    playChat(activeWorld);
  };

  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateExample(tab.getAttribute("data-example"), false, true);
      });
      tab.addEventListener("keydown", function (e) {
        var i = tabs.indexOf(tab);
        var next = i;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          next = (i + 1) % tabs.length; e.preventDefault();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          next = (i - 1 + tabs.length) % tabs.length; e.preventDefault();
        } else if (e.key === "Home") { next = 0; e.preventDefault(); }
        else if (e.key === "End") { next = tabs.length - 1; e.preventDefault(); }
        else return;
        activateExample(tabs[next].getAttribute("data-example"), true, true);
      });
    });
    activateExample("lumina", false, false);
  }

  /* ---------- Say / Avoid ---------- */
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
    sayBtn.addEventListener("click", function () { setCompareView("say"); });
    avoidBtn.addEventListener("click", function () { setCompareView("avoid"); });
    setCompareView("say");
  }

  /* ---------- Pointer tilt / parallax ---------- */
  function bindTilt(el) {
    if (reduceMotion || !finePointer) return;
    var raf = null;
    var rx = 0, ry = 0;
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      ry = px * 10;
      rx = -py * 8;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        el.style.transform = "perspective(800px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
        raf = null;
      });
    });
    el.addEventListener("pointerleave", function () {
      el.style.transform = "";
    });
  }
  document.querySelectorAll("[data-tilt]").forEach(bindTilt);

  /* Ambient blob parallax */
  var blobs = document.querySelectorAll(".ambient-blob");
  if (!reduceMotion && blobs.length && finePointer) {
    var braf = null, tx = 0, ty = 0;
    window.addEventListener("pointermove", function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 18;
      ty = (e.clientY / window.innerHeight - 0.5) * 14;
      if (braf) return;
      braf = requestAnimationFrame(function () {
        blobs.forEach(function (b, i) {
          var f = (i + 1) * 0.55;
          b.style.transform = "translate(" + tx * f + "px, " + ty * f + "px)";
        });
        braf = null;
      });
    }, { passive: true });
  }

  /* Soft cursor glow */
  var glow = document.querySelector(".cursor-glow");
  if (!reduceMotion && glow && hoverFine) {
    document.body.classList.add("has-cursor-glow");
    window.addEventListener("pointermove", function (e) {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }, { passive: true });
  }

  /* ---------- Magnetic CTAs ---------- */
  if (!reduceMotion && hoverFine) {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      var inner = btn.querySelector(".magnetic-inner") || btn;
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.12 + "px, " + y * 0.18 + "px)";
        inner.style.transform = "translate(" + x * 0.08 + "px, " + y * 0.1 + "px)";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
        inner.style.transform = "";
      });
    });
  }

  /* ---------- Floating Shiba FAB chat ---------- */
  var fabToggle = document.getElementById("fab-toggle");
  var fabPanel = document.getElementById("fab-panel");
  var fabClose = document.getElementById("fab-close");
  var fabBody = document.getElementById("fab-body");
  var fabPrompts = document.getElementById("fab-prompts");

  var FAB_SCRIPT = {
    greetEn: "Hi — I'm a demo Shiba. Ask about our AI engineering stack, Discovery, or how engagements work.",
    greetZh: "嗨——我是示範 Shiba。可問我們的技術棧、Discovery，或合作怎麼進行。非醫療建議。",
    prompts: [
      {
        en: "What do you build?",
        zh: "你們做甚麼？",
        replyEn: "We build agentic systems, digital humans, private/local AI, intelligent workflows, and complete AI-native software products.",
        replyZh: "真正可運作的智能系統——Agents、數碼人、私有 AI、工作流程，以及 ArtistAgent.AI。不是 chatbot 元件推銷。"
      },
      {
        en: "What's your stack?",
        zh: "技術棧？",
        replyEn: "ShibaOS for objectives and approvals, Mina for realtime voice, ArtistAgent for creative ops, and Shiba Compute for local/hybrid inference — dogfooded inside our own companies.",
        replyZh: "ShibaOS 負責 Objective 與審批、Mina 即時語音、ArtistAgent 創作營運、Shiba Compute 本地／混合推理——先在自己公司 dogfood。"
      },
      {
        en: "How does Discovery work?",
        zh: "Discovery 怎麼進行？",
        replyEn: "A 30-minute call to clarify the problem and fit — then a scoped proposal. We never quote public starting prices. Email hello@shiba-dev.com to book.",
        replyZh: "30 分鐘先釐清問題與適配度，再出範圍提案。公開網站不報具體金額。電郵 hello@shiba-dev.com 預約。"
      }
    ]
  };

  function fabBubble(role, text) {
    if (!fabBody) return;
    var el = document.createElement("div");
    el.className = "bubble bubble-" + (role === "user" ? "user" : "bot");
    el.style.opacity = "1";
    el.style.transform = "none";
    el.textContent = text;
    fabBody.appendChild(el);
    fabBody.scrollTop = fabBody.scrollHeight;
  }

  function renderFabPrompts() {
    if (!fabPrompts) return;
    fabPrompts.innerHTML = "";
    FAB_SCRIPT.prompts.forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = isZh() ? p.zh : p.en;
      b.addEventListener("click", function () {
        fabBubble("user", isZh() ? p.zh : p.en);
        setTimeout(function () {
          fabBubble("bot", isZh() ? p.replyZh : p.replyEn);
        }, reduceMotion ? 0 : 450);
      });
      fabPrompts.appendChild(b);
    });
  }

  function resetFab() {
    if (!fabBody) return;
    fabBody.innerHTML = "";
    fabBubble("bot", isZh() ? FAB_SCRIPT.greetZh : FAB_SCRIPT.greetEn);
    renderFabPrompts();
  }
  window.__shibaResetFab = resetFab;

  function setFabOpen(open) {
    if (!fabPanel || !fabToggle) return;
    fabPanel.hidden = !open;
    fabToggle.setAttribute("aria-expanded", String(open));
    if (open && fabBody && !fabBody.childElementCount) resetFab();
  }

  if (fabToggle && fabPanel) {
    fabToggle.addEventListener("click", function () {
      setFabOpen(fabPanel.hidden);
    });
    if (fabClose) fabClose.addEventListener("click", function () { setFabOpen(false); });
  }

  /* ---------- Live concept demos ---------- */
  (function initLiveDemos() {
    var delay = function (ms) { return reduceMotion ? 0 : ms; };

    /* A. Objective Lab */
    var objForm = document.getElementById("obj-lab-form");
    var objAsk = document.getElementById("obj-ask");
    var objStages = document.getElementById("obj-stages");
    var objResult = document.getElementById("obj-result");
    var objTitle = document.getElementById("obj-result-title");
    var objBody = document.getElementById("obj-result-body");
    var objApprove = document.getElementById("obj-approve");
    var objReset = document.getElementById("obj-reset");
    var objToast = document.getElementById("obj-toast");
    var objTimers = [];
    var objRunning = false;

    function clearObjTimers() {
      objTimers.forEach(function (t) { clearTimeout(t); });
      objTimers = [];
    }

    function resetObjectiveLab() {
      clearObjTimers();
      objRunning = false;
      if (objStages) {
        Array.prototype.forEach.call(objStages.querySelectorAll("li"), function (li) {
          li.classList.remove("is-running", "is-complete");
          var b = li.querySelector("b");
          if (b) b.textContent = "—";
        });
      }
      if (objResult) objResult.hidden = true;
      if (objApprove) objApprove.disabled = true;
      if (objToast) { objToast.hidden = true; objToast.textContent = ""; }
      if (objAsk) objAsk.value = "";
    }

    function runObjectiveLab(ask) {
      if (!objStages || objRunning) return;
      objRunning = true;
      clearObjTimers();
      if (objToast) { objToast.hidden = true; objToast.textContent = ""; }
      if (objApprove) objApprove.disabled = true;
      if (objResult) objResult.hidden = true;

      var steps = Array.prototype.slice.call(objStages.querySelectorAll("li"));
      steps.forEach(function (li) {
        li.classList.remove("is-running", "is-complete");
        var b = li.querySelector("b");
        if (b) b.textContent = "—";
      });

      var i = 0;
      function advance() {
        if (i > 0) {
          var prev = steps[i - 1];
          prev.classList.remove("is-running");
          prev.classList.add("is-complete");
          var pb = prev.querySelector("b");
          if (pb) pb.textContent = "✓";
        }
        if (i >= steps.length) {
          if (objTitle) {
            objTitle.textContent = isZh()
              ? "已準備建議（虛構）——等待人工審批"
              : "Recommendation prepared (fictional) — awaiting human approval";
          }
          if (objBody) {
            objBody.textContent = isZh()
              ? "針對「" + ask + "」：已彙整虛構證據並草擬受控下一步。狀態：Prepared — Not Deployed。"
              : "For “" + ask + "”: fictional evidence gathered and a bounded next step drafted. Status: Prepared — Not Deployed.";
          }
          if (objResult) objResult.hidden = false;
          if (objApprove) objApprove.disabled = false;
          objRunning = false;
          return;
        }
        var cur = steps[i];
        cur.classList.add("is-running");
        var cb = cur.querySelector("b");
        if (cb) cb.textContent = "•••";
        i += 1;
        objTimers.push(setTimeout(advance, delay(700)));
      }
      advance();
    }

    if (objForm) {
      objForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var ask = (objAsk && objAsk.value ? objAsk.value.trim() : "");
        if (!ask) return;
        runObjectiveLab(ask);
      });
    }
    if (objApprove) {
      objApprove.addEventListener("click", function () {
        if (objToast) {
          objToast.hidden = false;
          objToast.textContent = isZh()
            ? "已記錄於 Discovery——非真實部署"
            : "Logged for Discovery — not a real deploy";
        }
        objApprove.disabled = true;
      });
    }
    if (objReset) objReset.addEventListener("click", resetObjectiveLab);

    /* B. AI Concierge */
    var concBody = document.getElementById("concierge-body");
    var concIntents = document.getElementById("concierge-intents");
    var concTimer = null;

    var CONCIERGE = {
      greetEn: "Hello — I'm a demo Lumina Concierge (not a real clinic). Ask about hours, booking, languages, or talk to a human.",
      greetZh: "您好——我是示範 Lumina 禮賓（非真實診所）。可問營業時間、預約、語言，或轉接真人。",
      intents: [
        {
          id: "hours",
          en: "Clinic hours",
          zh: "營業時間",
          replyEn: "Demo hours: Mon–Fri 10:00–18:00 HKT. Weekend triage is by request only — a human confirms.",
          replyZh: "示範時間：星期一至五 10:00–18:00（香港）。週末分流需預約，由職員確認。"
        },
        {
          id: "booking",
          en: "Book a visit",
          zh: "預約診症",
          replyEn: "I can queue a fictional afternoon slot request. A staff member would confirm within one business day — this demo does not book anything real.",
          replyZh: "我可送出虛構下午時段請求。真實情況下職員會於一個工作天內確認——此示範不會真實預約。"
        },
        {
          id: "languages",
          en: "Languages",
          zh: "語言",
          replyEn: "This demo replies in English or 繁中. Live builds can add Cantonese voice and more locales after Discovery.",
          replyZh: "此示範支援英文或繁中。真實建置可於 Discovery 後加入粵語語音與更多語系。"
        },
        {
          id: "handoff",
          en: "Talk to human",
          zh: "轉接真人",
          replyEn: "Handing off — continue with a Discovery Call so we can scope a real concierge for your clinic.",
          replyZh: "正在轉接——請繼續預約 Discovery Call，我們再為你的診所定範圍。",
          handoff: true
        }
      ]
    };

    function concBubble(role, text, typing) {
      if (!concBody) return null;
      var el = document.createElement("div");
      if (typing) {
        el.className = "bubble bubble-typing";
        el.innerHTML = "<span></span><span></span><span></span>";
        el.setAttribute("aria-hidden", "true");
      } else {
        el.className = "bubble bubble-" + (role === "user" ? "user" : "bot");
        el.textContent = text;
      }
      concBody.appendChild(el);
      concBody.scrollTop = concBody.scrollHeight;
      return el;
    }

    function resetConcierge() {
      if (concTimer) { clearTimeout(concTimer); concTimer = null; }
      if (!concBody) return;
      concBody.innerHTML = "";
      concBubble("bot", isZh() ? CONCIERGE.greetZh : CONCIERGE.greetEn, false);
    }

    function renderConciergeIntents() {
      if (!concIntents) return;
      concIntents.innerHTML = "";
      CONCIERGE.intents.forEach(function (intent) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = isZh() ? intent.zh : intent.en;
        b.addEventListener("click", function () {
          Array.prototype.forEach.call(concIntents.querySelectorAll("button"), function (btn) {
            btn.disabled = true;
          });
          concBubble("user", isZh() ? intent.zh : intent.en, false);
          var typing = reduceMotion ? null : concBubble("bot", "", true);
          concTimer = setTimeout(function () {
            if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
            concBubble("bot", isZh() ? intent.replyZh : intent.replyEn, false);
            if (intent.handoff) {
              var cta = document.createElement("div");
              cta.className = "bubble bubble-bot";
              var link = document.createElement("a");
              link.href = "mailto:hello@shiba-dev.com?subject=Discovery%20Call%20%E2%80%94%20Lumina%20demo";
              link.textContent = isZh() ? "電郵預約 Discovery Call →" : "Email to book a Discovery Call →";
              cta.appendChild(link);
              concBody.appendChild(cta);
              concBody.scrollTop = concBody.scrollHeight;
            }
            Array.prototype.forEach.call(concIntents.querySelectorAll("button"), function (btn) {
              btn.disabled = false;
            });
          }, delay(720));
        });
        concIntents.appendChild(b);
      });
    }

    if (concBody && concIntents) {
      resetConcierge();
      renderConciergeIntents();
      var prevSetLang = null;
      // Refresh greet/intents on language change via existing hooks
      var origResetFab = window.__shibaResetFab;
      window.__shibaResetFab = function () {
        if (typeof origResetFab === "function") origResetFab();
        resetConcierge();
        renderConciergeIntents();
      };
    }

    /* C. Intake form */
    var intakeForm = document.getElementById("intake-form");
    var intakeFields = document.getElementById("intake-fields");
    var intakeSuccess = document.getElementById("intake-success");
    var intakeError = document.getElementById("intake-error");
    var intakeMailto = document.getElementById("intake-mailto");
    var intakeAgain = document.getElementById("intake-again");

    function showIntakeError(msg) {
      if (!intakeError) return;
      intakeError.hidden = !msg;
      intakeError.textContent = msg || "";
    }

    function validateEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    if (intakeForm) {
      intakeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = (document.getElementById("intake-name") || {}).value || "";
        var email = (document.getElementById("intake-email") || {}).value || "";
        var matter = (document.getElementById("intake-matter") || {}).value || "";
        var message = (document.getElementById("intake-message") || {}).value || "";
        name = name.trim(); email = email.trim(); message = message.trim();

        if (!name || !email || !matter || !message) {
          showIntakeError(isZh() ? "請填寫所有欄位。" : "Please complete all fields.");
          return;
        }
        if (!validateEmail(email)) {
          showIntakeError(isZh() ? "請輸入有效電郵。" : "Please enter a valid email.");
          return;
        }
        showIntakeError("");
        if (intakeFields) intakeFields.hidden = true;
        if (intakeSuccess) intakeSuccess.hidden = false;
        if (intakeMailto) {
          var body = "Hi Shiba Dev,\n\nIntake demo brief (fictional):\nName: " + name +
            "\nEmail: " + email + "\nMatter: " + matter + "\nMessage: " + message + "\n";
          intakeMailto.href = "mailto:hello@shiba-dev.com?subject=" +
            encodeURIComponent("Discovery Call — Intake demo") + "&body=" + encodeURIComponent(body);
        }
      });
    }
    if (intakeAgain) {
      intakeAgain.addEventListener("click", function () {
        if (intakeForm) intakeForm.reset();
        if (intakeSuccess) intakeSuccess.hidden = true;
        if (intakeFields) intakeFields.hidden = false;
        showIntakeError("");
      });
    }
  })();

})();
