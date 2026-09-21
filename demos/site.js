(function(){
  "use strict";

  function qs(sel,root){return (root||document).querySelector(sel)}
  function qsa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}
  function esc(str){return String(str||"").replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[ch]})}

  var id=document.body.getAttribute("data-world");
  if(!id){
    var p=new URLSearchParams(location.search);
    id=p.get("world")||"lumina";
  }
  var world=(window.SHIBA_DEMO_WORLDS||{})[id];
  if(!world){
    document.body.innerHTML="<main style='font-family:sans-serif;padding:40px'>Demo world not found.</main>";
    return;
  }

  document.documentElement.style.setProperty("--accent",world.accent);
  document.title=world.brand+" — Functional Demo | Shiba Dev";

  var navLinks=world.nav.map(function(n,i){return '<a href="#section-'+(i+1)+'">'+esc(n)+'</a>'}).join("");
  var highlights=world.highlights.map(function(item,i){
    return '<article class="demo-highlight"><span class="demo-highlight-index">0'+(i+1)+'</span><h3>'+esc(item[0])+'</h3><p>'+esc(item[1])+'</p></article>';
  }).join("");

  document.body.innerHTML=
    '<div class="demo-shell">'+
      '<header class="demo-topbar">'+
        '<div class="demo-wrap demo-nav">'+
          '<a class="demo-brand" href="#top"><i class="demo-brand-mark"></i><span>'+esc(world.brand)+'<small>'+esc(world.category)+'</small></span></a>'+
          '<nav class="demo-links" aria-label="Demo navigation">'+navLinks+'</nav>'+
          '<div class="demo-actions"><span class="demo-chip">Functional Shiba Dev mockup</span><button class="demo-btn demo-btn--accent" data-open-flow>'+esc(world.primary)+'</button><button class="demo-mobile-toggle" aria-label="Open navigation">☰</button></div>'+
        '</div>'+
      '</header>'+

      '<main id="top">'+
        '<section class="demo-hero">'+
          '<div class="demo-wrap demo-hero-grid">'+
            '<div class="demo-copy">'+
              '<div class="demo-eyebrow">'+esc(world.eyebrow)+'</div>'+
              '<h1>'+esc(world.headline)+'</h1>'+
              '<p class="demo-subhead">'+esc(world.subhead)+'</p>'+
              '<div class="demo-cta"><button class="demo-btn demo-btn--accent" data-open-flow>'+esc(world.primary)+'</button><a class="demo-btn demo-btn--ghost" href="#section-1">'+esc(world.secondary)+'</a></div>'+
              '<div class="demo-trust"><span>Interactive journey</span><span>Human handoff</span><span>No real submission</span></div>'+
            '</div>'+
            '<figure class="demo-reference"><img src="'+esc(world.hero)+'" alt="'+esc(world.brand)+' visual reference" /><figcaption class="demo-reference-label">Visual direction from Shiba Dev concept art</figcaption></figure>'+
          '</div>'+
        '</section>'+

        '<section class="demo-section demo-section--white" id="section-1">'+
          '<div class="demo-wrap">'+
            '<div class="demo-section-head"><div><div class="demo-kicker">Designed around the job to be done</div><h2>A site that actually moves the enquiry forward.</h2></div><p class="demo-section-intro">The mockup is intentionally functional: visitors can explore the proposition, interact with an assistant, and complete a realistic business-specific journey instead of clicking dead UI.</p></div>'+
            '<div class="demo-highlight-grid">'+highlights+'</div>'+
          '</div>'+
        '</section>'+

        '<section class="demo-section demo-section--dark" id="section-2">'+
          '<div class="demo-wrap">'+
            '<div class="demo-section-head"><div><div class="demo-kicker">Product experience</div><h2>AI sits inside the workflow, not on top of it.</h2></div><p class="demo-section-intro">The assistant can explain approved information and prepare context, while important decisions and real-world actions stay with the business.</p></div>'+
            '<div class="demo-experience">'+
              '<div class="demo-experience-copy"><h3>'+esc(world.assistant.name)+'</h3><p>'+esc(world.assistant.intro)+'</p><div class="demo-experience-points"><div><b>01 · Understand</b><span>Capture intent and context</span></div><div><b>02 · Structure</b><span>Prepare a useful request</span></div><div><b>03 · Handoff</b><span>Send the right context to a human</span></div></div><button class="demo-btn demo-btn--accent" style="margin-top:26px" data-open-chat>Try the assistant</button></div>'+
              '<div class="demo-experience-ui">'+
                '<div class="demo-window"><div class="demo-window-head"><i></i><i></i><i></i></div><div class="demo-window-body"><div class="demo-window-row"><div class="demo-window-card"><small>Visitor intent</small><strong>'+esc(world.primary)+'</strong><p>Turn browsing into a structured next step.</p></div><div class="demo-window-card"><small>Assistant</small><strong>Approved knowledge + routing</strong><p>Useful answers without pretending the AI owns the decision.</p></div></div><div class="demo-window-list"><div><b>Context ready</b> · service / need / timing</div><div><b>Business rule</b> · human confirmation required</div><div><b>Next action</b> · prepared for team review</div></div></div></div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</section>'+

        '<section class="demo-section" id="section-3">'+
          '<div class="demo-wrap">'+
            '<div class="demo-section-head"><div><div class="demo-kicker">Conversion flow</div><h2>Complete the journey yourself.</h2></div><p class="demo-section-intro">This is the acceptance test Grok kept missing: the primary CTA must open a multi-step journey, preserve the user's selections, validate required fields, and finish in a visible success state.</p></div>'+
            '<button class="demo-btn demo-btn--accent" data-open-flow>'+esc(world.primary)+'</button>'+
          '</div>'+
        '</section>'+

        '<section class="demo-final-cta" id="section-4">'+
          '<div class="demo-wrap"><div class="demo-final-panel"><h2>'+esc(world.headline)+'</h2><p>'+esc(world.subhead)+'</p><button class="demo-btn" data-open-flow>'+esc(world.primary)+'</button></div></div>'+
        '</section>'+
      '</main>'+

      '<footer class="demo-footer"><div class="demo-wrap demo-footer-row"><span>'+esc(world.brand)+' · fictional functional demo by Shiba Dev</span><a href="../../index.html#examples">Back to Shiba Dev</a></div></footer>'+

      '<div class="demo-modal-backdrop" id="flow-backdrop" aria-hidden="true"><div class="demo-modal" role="dialog" aria-modal="true" aria-labelledby="flow-title"><div class="demo-modal-head"><div><h3 id="flow-title">'+esc(world.flow.title)+'</h3><small>Functional demo · no real submission</small></div><button class="demo-modal-close" data-close-flow aria-label="Close">×</button></div><div class="demo-progress" id="flow-progress"><span></span><span></span><span></span></div><div class="demo-modal-body" id="flow-body"></div></div></div>'+

      '<aside class="demo-chat" id="demo-chat"><div class="demo-chat-panel"><div class="demo-chat-head"><div class="demo-chat-avatar">'+esc(world.brand.charAt(0))+'</div><div><strong>'+esc(world.assistant.name)+'</strong><span>Scripted functional demo</span></div></div><div class="demo-chat-messages" id="chat-messages"></div><div class="demo-chat-prompts" id="chat-prompts"></div></div><button class="demo-chat-toggle" aria-label="Open assistant">AI</button></aside>'+
    '</div>';

  var flowState={step:0,values:{}};
  var backdrop=qs("#flow-backdrop");
  var flowBody=qs("#flow-body");
  var progress=qsa("#flow-progress span");

  function fieldHtml(field){
    var name=field[0],type=field[1],label=field[2],extra=field[3]||"";
    if(type==="select"){
      var opts=extra.split("|").map(function(o){return '<option value="'+esc(o)+'">'+esc(o)+'</option>'}).join("");
      return '<div class="demo-field"><label for="f-'+esc(name)+'">'+esc(label)+'</label><select id="f-'+esc(name)+'" name="'+esc(name)+'" required><option value="">Choose…</option>'+opts+'</select></div>';
    }
    if(type==="textarea"){
      return '<div class="demo-field demo-field--wide"><label for="f-'+esc(name)+'">'+esc(label)+'</label><textarea id="f-'+esc(name)+'" name="'+esc(name)+'" placeholder="'+esc(extra)+'" required></textarea></div>';
    }
    return '<div class="demo-field"><label for="f-'+esc(name)+'">'+esc(label)+'</label><input id="f-'+esc(name)+'" name="'+esc(name)+'" type="'+esc(type)+'" placeholder="'+esc(extra)+'" required /></div>';
  }

  function saveCurrent(){
    qsa("[name]",flowBody).forEach(function(el){flowState.values[el.name]=el.value});
  }

  function restore(){
    Object.keys(flowState.values).forEach(function(k){
      var el=qs('[name="'+CSS.escape(k)+'"]',flowBody);
      if(el)el.value=flowState.values[k];
    });
  }

  function validStep(){
    var inputs=qsa("[required]",flowBody);
    var ok=true;
    inputs.forEach(function(el){
      if(!el.value.trim()){ok=false;el.style.borderColor="#c45151"}else{el.style.borderColor=""}
    });
    return ok;
  }

  function renderStep(){
    progress.forEach(function(p,i){p.classList.toggle("is-active",i<=flowState.step)});
    if(flowState.step>=world.flow.steps.length){
      flowBody.innerHTML='<div class="demo-success"><div class="demo-success-icon">✓</div><h4>'+esc(world.flow.success)+'</h4><p>'+esc(world.flow.successDetail)+'</p><div class="demo-modal-actions" style="justify-content:center"><button class="demo-btn demo-btn--accent" data-close-flow>Done</button></div></div>';
      qsa("[data-close-flow]",flowBody).forEach(function(b){b.addEventListener("click",closeFlow)});
      return;
    }
    var step=world.flow.steps[flowState.step];
    flowBody.innerHTML='<div class="demo-flow-step"><h4>'+(flowState.step+1)+'. '+esc(step.title)+'</h4><div class="demo-fields">'+step.fields.map(fieldHtml).join("")+'</div><div class="demo-modal-actions"><button class="demo-btn demo-btn--ghost" id="flow-back" '+(flowState.step===0?"disabled":"")+'>Back</button><button class="demo-btn demo-btn--accent" id="flow-next">'+(flowState.step===world.flow.steps.length-1?"Submit demo":"Continue")+'</button></div></div>';
    restore();
    qs("#flow-back").addEventListener("click",function(){saveCurrent();flowState.step=Math.max(0,flowState.step-1);renderStep()});
    qs("#flow-next").addEventListener("click",function(){
      if(!validStep())return;
      saveCurrent();
      flowState.step+=1;
      renderStep();
    });
  }

  function openFlow(){
    flowState={step:0,values:{}};
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    renderStep();
  }
  function closeFlow(){
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
  }

  qsa("[data-open-flow]").forEach(function(b){b.addEventListener("click",openFlow)});
  qsa("[data-close-flow]").forEach(function(b){b.addEventListener("click",closeFlow)});
  backdrop.addEventListener("click",function(e){if(e.target===backdrop)closeFlow()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeFlow()});

  var chat=qs("#demo-chat");
  var toggle=qs(".demo-chat-toggle",chat);
  var messages=qs("#chat-messages");
  var prompts=qs("#chat-prompts");

  function bubble(role,text){
    var d=document.createElement("div");
    d.className="demo-bubble demo-bubble--"+role;
    d.textContent=text;
    messages.appendChild(d);
    messages.scrollTop=messages.scrollHeight;
  }
  function renderPrompts(){
    prompts.innerHTML="";
    world.assistant.prompts.forEach(function(p){
      var b=document.createElement("button");
      b.type="button";b.textContent=p[0];
      b.addEventListener("click",function(){
        bubble("user",p[0]);
        b.disabled=true;
        setTimeout(function(){bubble("bot",p[1]);b.disabled=false},300);
      });
      prompts.appendChild(b);
    });
  }
  function openChat(){
    chat.classList.add("is-open");
    if(!messages.childElementCount){
      bubble("bot",world.assistant.intro);
      renderPrompts();
    }
  }
  toggle.addEventListener("click",function(){
    chat.classList.toggle("is-open");
    if(chat.classList.contains("is-open")&&!messages.childElementCount){
      bubble("bot",world.assistant.intro);
      renderPrompts();
    }
  });
  qsa("[data-open-chat]").forEach(function(b){b.addEventListener("click",openChat)});

  var mobile=qs(".demo-mobile-toggle");
  mobile.addEventListener("click",function(){
    var nav=qs(".demo-links");
    var visible=getComputedStyle(nav).display!=="none";
    nav.style.display=visible?"none":"flex";
    nav.style.position="absolute";
    nav.style.left="12px";nav.style.right="12px";nav.style.top="66px";
    nav.style.background="white";nav.style.padding="14px";
    nav.style.borderRadius="14px";nav.style.boxShadow="0 18px 50px rgba(0,0,0,.14)";
    nav.style.flexDirection="column";nav.style.alignItems="stretch";
  });
})();