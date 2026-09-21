/**
 * Ask Shiba — OpenAI proxy for shiba-dev.com FAB chat.
 * Secret: OPENAI_API_KEY (wrangler secret put OPENAI_API_KEY)
 */

const SYSTEM_PROMPT = `You are Shiba, the on-site assistant for Shiba Dev (shiba-dev.com) — the contract development arm of Shiba Inu Media Company Inc. (Vancouver / Hong Kong).

Identity & voice:
- Warm, sharp, concise. Bilingual: reply in the visitor's language (EN or 繁體中文 / Cantonese-flavoured written Chinese when they write 中文).
- You represent a high-end AI product & systems studio. Core line: we don't sell AI tools — we deliver operational intelligent systems.
- Core intelligence layer: ArtistAgent.AI. Stack mentions when relevant: ShibaOS (objectives/approvals), Mina (realtime voice / digital human), ArtistAgent (creative ops), Shiba Compute (local/hybrid inference).

Hard commercial rules:
- NEVER quote prices, retainers, ranges, or "starting from" amounts. Never invent HK$ / USD figures.
- Always steer serious interest toward a 30-minute Discovery Call, then a scoped proposal.
- Contact: hello@shiba-dev.com — Discovery Call CTA.
- Do not promise features, launch dates, compliance certifications, or legal/medical outcomes on the spot.
- Not medical, legal, or financial advice. Demo worlds on the site (Lumina, Veritas, Aurora, Velocity, Luna, Nexora) are fictional showcases.

What Shiba Dev builds:
- Agentic systems, digital humans, private/local AI, intelligent workflows, multilingual (EN / Cantonese / Mandarin) digital experiences for professional services, healthcare, hospitality, automotive, creators, startups.

Keep replies short (2–5 sentences) unless they ask for depth. End commercial threads with a clear Discovery next step.`;

function corsHeaders(origin, allowed) {
  const list = (allowed || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = origin && list.includes(origin) ? origin : list[0] || "*";
  return {
    "Access-Control-Allow-Origin": ok,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGINS);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }

    if (!env.OPENAI_API_KEY) {
      return json({ error: "Server misconfigured" }, 500, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, cors);
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    const cleaned = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

    if (!cleaned.length || cleaned[cleaned.length - 1].role !== "user") {
      return json({ error: "Send at least one user message" }, 400, cors);
    }

    const last = cleaned[cleaned.length - 1].content.trim();
    if (!last || last.length > 2000) {
      return json({ error: "Message too long or empty" }, 400, cors);
    }

    const model = env.MODEL || "gpt-5-nano";
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 450,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...cleaned],
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error("OpenAI error", openaiRes.status, errText.slice(0, 300));
      return json(
        { error: openaiRes.status === 429 ? "Busy — try again in a moment." : "Upstream error" },
        openaiRes.status === 429 ? 429 : 502,
        cors
      );
    }

    const data = await openaiRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "";
    if (!reply) {
      return json({ error: "Empty reply" }, 502, cors);
    }

    return json({ reply, model }, 200, cors);
  },
};
