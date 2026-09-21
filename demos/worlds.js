window.SHIBA_DEMO_WORLDS = {
  lumina: {
    brand:"LUMINA", category:"Private Healthcare", eyebrow:"Private care, without the friction.",
    headline:"A calmer way to start your care journey.",
    subhead:"Explore services, ask common questions, and request a private consultation through a multilingual digital concierge.",
    hero:"../../assets/demo-lumina.png", accent:"#8d6e63",
    nav:["Services","Approach","Doctors","Contact"],
    primary:"Book consultation", secondary:"Explore services",
    highlights:[
      ["Private consultations","Specialist-led care with a discreet, coordinated experience."],
      ["Multilingual support","English, Cantonese and Mandarin enquiry flows."],
      ["Human handoff","The assistant prepares context; clinic staff confirm medical matters."]
    ],
    assistant:{name:"Lumina Concierge",intro:"Hello — I can explain services, help with common questions, or prepare a consultation request.",prompts:[
      ["What services do you offer?","We can guide visitors through general consultation, specialist referral and preventive-care pathways. Clinical advice is always handled by licensed staff."],
      ["I want a consultation","I can prepare a request now. Use the Book consultation button and choose your preferred day and language."],
      ["Can I speak Cantonese?","Yes. The live implementation can support Cantonese, English and Mandarin interfaces."]
    ]},
    flow:{
      title:"Request a private consultation",
      steps:[
        {title:"What do you need?",fields:[["service","select","Service","General consultation|Specialist referral|Preventive health|Not sure yet"],["note","textarea","Brief note","Tell us what you would like help with"]]},
        {title:"When should we contact you?",fields:[["day","select","Preferred day","Monday|Tuesday|Wednesday|Thursday|Friday|Weekend"],["period","select","Time","Morning|Afternoon|Evening"],["language","select","Language","English|廣東話|普通話"]]},
        {title:"Your details",fields:[["name","text","Name","Your name"],["contact","email","Email","name@example.com"],["phone","text","Phone (optional)","+852"]]}
      ],
      success:"Consultation request prepared",
      successDetail:"A clinic team member would review this request and confirm the appointment. No medical diagnosis was made by the demo."
    }
  },
  veritas: {
    brand:"VERITAS LAW", category:"Corporate & Commercial", eyebrow:"Clarity before complexity.",
    headline:"A modern front door for serious legal work.",
    subhead:"Understand practice areas, prepare an enquiry, and route it for human conflict checking without pretending AI is your lawyer.",
    hero:"../../assets/demo-veritas.png", accent:"#27364a",
    nav:["Practice","People","Insights","Contact"],
    primary:"Start an enquiry", secondary:"View practice areas",
    highlights:[
      ["Corporate & commercial","Structured intake for company and transaction matters."],
      ["Approved knowledge only","Answers are grounded in firm-approved public materials."],
      ["Lawyer handoff","Legal advice and engagement decisions stay with qualified professionals."]
    ],
    assistant:{name:"Veritas Assistant",intro:"I can explain the firm's public practice information and prepare an enquiry. I do not provide legal advice.",prompts:[
      ["Do you handle HK company structuring?","Corporate and commercial structuring can be routed to the relevant team. I can collect a short matter summary for conflict checking."],
      ["Can you review my contract?","A lawyer would need to assess the document and engagement terms. I can prepare an enquiry, but I won't give a legal opinion here."],
      ["Talk to a partner","Start an enquiry and select Partner / senior lawyer as the preferred contact level. The firm would decide routing after review."]
    ]},
    flow:{
      title:"Prepare a legal enquiry",
      steps:[
        {title:"Matter type",fields:[["matter","select","Practice area","Corporate / M&A|Commercial contracts|Employment|Technology / IP|Other"],["summary","textarea","Matter summary","Briefly describe the issue without confidential details"]]},
        {title:"Routing",fields:[["urgency","select","Timing","General enquiry|This week|Time-sensitive"],["contactLevel","select","Preferred contact","Appropriate lawyer|Partner / senior lawyer|No preference"]]},
        {title:"Contact",fields:[["name","text","Name","Your name"],["company","text","Company","Organisation"],["email","email","Business email","name@company.com"]]}
      ],
      success:"Enquiry prepared for conflict review",
      successDetail:"In a live deployment, the firm would run its conflict and engagement process before any legal advice is provided."
    }
  },
  aurora: {
    brand:"AURORA RESIDENCES", category:"Luxury Property", eyebrow:"Waterfront living, privately presented.",
    headline:"Discover the residence before you arrive.",
    subhead:"Explore the project, ask the concierge about amenities, and request a private viewing in a premium digital sales experience.",
    hero:"../../assets/demo-aurora.png", accent:"#836f58",
    nav:["Residences","Amenities","Location","Private Viewings"],
    primary:"Book a private viewing", secondary:"Explore residences",
    highlights:[
      ["Private viewings","Request preferred dates and guest count instantly."],
      ["Project concierge","Answers from approved project information and availability feeds."],
      ["VIP handoff","Qualified enquiries can be routed to the sales team with context."]
    ],
    assistant:{name:"Aurora Concierge",intro:"Welcome to Aurora. I can introduce the residences, amenities, location, or prepare a private viewing request.",prompts:[
      ["Do you have waterfront units?","The demo project includes waterfront-facing residence types. A live system would use the current inventory feed before confirming availability."],
      ["Book Sunday","Use Book a private viewing and choose Sunday, guest count and preferred time. The sales desk would confirm the slot."],
      ["What amenities are included?","The concept includes private arrival, resident lounge, wellness facilities and waterfront common areas."]
    ]},
    flow:{
      title:"Request a private viewing",
      steps:[
        {title:"Viewing preference",fields:[["residence","select","Interest","Waterfront residence|High-floor residence|Penthouse collection|Not sure"],["guests","select","Guests","1|2|3|4+"]]},
        {title:"Schedule",fields:[["day","select","Preferred day","Friday|Saturday|Sunday|Next week"],["time","select","Preferred time","11:00|14:00|16:00|18:00"]]},
        {title:"Contact",fields:[["name","text","Name","Your name"],["email","email","Email","name@example.com"],["phone","text","Phone","+852"]]}
      ],
      success:"Private viewing request sent to VIP scheduling",
      successDetail:"A live sales team would confirm inventory, host availability and arrival instructions."
    }
  },
  velocity: {
    brand:"VELOCITY X", category:"Performance Simulator Club", eyebrow:"Drive. Measure. Improve.",
    headline:"The club experience starts before you reach the rig.",
    subhead:"Browse experiences, reserve a simulator bay, use membership points and surface telemetry through one interactive platform.",
    hero:"../../assets/demo-velocity.png", accent:"#c33b2f",
    nav:["Drive","Cars","Telemetry","Membership"],
    primary:"Book a bay", secondary:"View experiences",
    highlights:[
      ["GT & formula bays","Reserve by rig type, duration and session objective."],
      ["Member identity","Points, preferences and history can travel with the booking."],
      ["Telemetry layer","Session data can feed coaching and post-drive dashboards."]
    ],
    assistant:{name:"VXR Elite",intro:"Ready to drive? I can explain experiences, prepare a bay reservation, or describe the member telemetry concept.",prompts:[
      ["GT3 Friday evening?","The demo flow can reserve a GT-class bay for Friday evening. In production, availability would come from the booking system."],
      ["Use my points","The booking mockup includes a membership-points option before confirmation."],
      ["What telemetry do I get?","A live member dashboard could surface lap times, sectors, consistency and selected vehicle channels."]
    ]},
    flow:{
      title:"Reserve a simulator bay",
      steps:[
        {title:"Choose experience",fields:[["rig","select","Rig","GT / Touring|Formula|Rally|Road car"],["duration","select","Duration","30 minutes|60 minutes|90 minutes|120 minutes"]]},
        {title:"Schedule",fields:[["day","select","Day","Friday|Saturday|Sunday|Next week"],["time","select","Time","17:00|18:00|19:00|20:00|21:00"],["points","select","Payment preference","Card / onsite|Use member points"]]},
        {title:"Driver",fields:[["name","text","Driver name","Your name"],["email","email","Email","driver@example.com"],["member","text","Member ID (optional)","VXR-"]]}
      ],
      success:"Bay held for 10 minutes",
      successDetail:"The production version would lock real inventory, calculate points and take payment before final confirmation."
    }
  },
  luna: {
    brand:"LUNA", category:"Creator & Artist", eyebrow:"One world for the audience.",
    headline:"Music, shows, merch and brand enquiries — in one place.",
    subhead:"A creator-owned digital home with an AI representative that can answer approved questions and route commercial opportunities to the team.",
    hero:"../../assets/demo-luna.png", accent:"#8d5d87",
    nav:["Music","Live","Merch","Collaborate"],
    primary:"Contact the team", secondary:"Explore releases",
    highlights:[
      ["Fan information","Release, tour and merch answers from approved artist context."],
      ["Creator commerce","Merch and ticket pathways stay inside the artist-owned experience."],
      ["Commercial routing","Brand and appearance enquiries become structured briefs for the team."]
    ],
    assistant:{name:"Luna AI Rep",intro:"Ask about music, shows, merch or collaborations. Commercial decisions are always handed to Luna's team.",prompts:[
      ["Next Asia show?","The demo artist's next highlighted Asia stop is Taipei. A live site would read the current approved tour schedule."],
      ["Where is the merch?","The creator experience can route fans to owned merch products and release-specific drops."],
      ["I have a brand collaboration","Use Contact the team and choose Brand collaboration. I'll structure the brief for human review."]
    ]},
    flow:{
      title:"Contact Luna's team",
      steps:[
        {title:"Enquiry type",fields:[["type","select","Type","Brand collaboration|Live appearance|Press / interview|Licensing|Fan / merch"],["brief","textarea","Brief","Tell the team what you have in mind"]]},
        {title:"Project",fields:[["market","text","Market / location","Hong Kong"],["timing","text","Timing","Proposed date or campaign period"],["budget","select","Budget band","Not specified|Under HK$100k|HK$100k–300k|HK$300k+"]]},
        {title:"Contact",fields:[["name","text","Name","Your name"],["company","text","Company / outlet","Organisation"],["email","email","Email","name@company.com"]]}
      ],
      success:"Enquiry prepared for Luna's team",
      successDetail:"A live workflow would route this brief to the correct manager and track follow-up."
    }
  },
  nexora: {
    brand:"NEXORA", category:"Technology Company", eyebrow:"Complex infrastructure, clearly explained.",
    headline:"An investor and partner experience built around live company context.",
    subhead:"Present the product, answer approved company questions, and route qualified investor or partner access without emailing decks back and forth.",
    hero:"../../assets/demo-nexora.png", accent:"#5664c8",
    nav:["Platform","Solutions","Company","Investors"],
    primary:"Request portal access", secondary:"Explore platform",
    highlights:[
      ["Company knowledge","Approved product, market and company information in one interface."],
      ["Investor routing","Structured access requests before sensitive materials are exposed."],
      ["Partner portal","NDA, diligence and collaboration workflows can sit behind authenticated access."]
    ],
    assistant:{name:"Nexora Portal",intro:"I can explain public product information or prepare an investor / partner portal request.",prompts:[
      ["What does Nexora build?","This demo positions Nexora as an enterprise technology platform. A real deployment would answer from approved product and company materials."],
      ["Show me financials","Sensitive investor information would require approved portal access. I can prepare a request but not expose private materials here."],
      ["Request investor access","Use Request portal access and provide your organisation, role and reason for access."]
    ]},
    flow:{
      title:"Request secure portal access",
      steps:[
        {title:"Access type",fields:[["type","select","Access","Investor diligence|Strategic partnership|Customer evaluation|Media / analyst"],["reason","textarea","Reason for access","What would you like to evaluate?"]]},
        {title:"Organisation",fields:[["org","text","Organisation","Company or fund"],["role","text","Your role","Partner / Director / etc."],["website","text","Website","https://"]]},
        {title:"Contact",fields:[["name","text","Name","Your name"],["email","email","Business email","name@company.com"],["nda","select","NDA readiness","Ready to sign|Existing NDA|Need to discuss"]]}
      ],
      success:"Portal request submitted for review",
      successDetail:"In production, approved users would receive the appropriate NDA and authenticated portal access."
    }
  }
};