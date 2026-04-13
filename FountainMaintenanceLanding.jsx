import { useState, useEffect, useRef, useCallback } from "react";

const LOGO_SRC = "data:image/webp;base64,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";

const C = {
  navy: "#1a1f35", navyDeep: "#0e1120", navyLight: "#242a45", navyMid: "#1e2440",
  cyan: "#3dd8d0", cyanBright: "#5aeee6", cyanGlow: "rgba(61,216,208,0.12)",
  gold: "#d4a843", amber: "#d49243",
  white: "#f0f4f8", offWhite: "#c8d0e0", gray: "#8892a8", grayDark: "#5a6478",
  green: "#2ecc71",
};
const F = `'DM Sans', system-ui, sans-serif`;
const FD = `'Outfit', system-ui, sans-serif`;
const tierC = { basic: "#74c0fc", standard: C.cyan, premium: C.gold };

// ─── Swipeable Carousel ────────────────────
const Carousel = ({ children, dots = true, peek = false }) => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const dragging = useRef(false);
  const count = Array.isArray(children) ? children.length : 1;

  const snapTo = useCallback((idx) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx];
    if (card) {
      const offset = card.offsetLeft - (peek ? 16 : 0);
      track.scrollTo({ left: offset, behavior: "smooth" });
      setActive(idx);
    }
  }, [peek]);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || dragging.current) return;
    const cards = Array.from(track.children);
    let closest = 0, minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.scrollLeft - (peek ? 16 : 0));
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActive(closest);
  }, [peek]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timeout;
    const handler = () => { clearTimeout(timeout); timeout = setTimeout(onScroll, 80); };
    track.addEventListener("scroll", handler, { passive: true });
    return () => { track.removeEventListener("scroll", handler); clearTimeout(timeout); };
  }, [onScroll]);

  return (
    <div style={{ position: "relative" }}>
      <div ref={trackRef} style={{
        display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none",
        padding: peek ? "0 16px" : "0 16px",
      }}>
        <style>{`.carousel-track::-webkit-scrollbar { display: none; }`}</style>
        {Array.isArray(children) ? children.map((child, i) => (
          <div key={i} style={{
            flex: "0 0 auto", scrollSnapAlign: "start",
            width: peek ? "calc(85% - 8px)" : "calc(100% - 32px)",
            maxWidth: 400,
          }}>{child}</div>
        )) : children}
      </div>
      {dots && count > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
          {Array.from({ length: count }, (_, i) => (
            <button key={i} onClick={() => snapTo(i)} style={{
              width: active === i ? 20 : 6, height: 6, borderRadius: 3,
              background: active === i ? C.cyan : `${C.cyan}33`,
              border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
            }} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Water Particles ───────────────────────
const WaterParticles = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let raf;
    const resize = () => { c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2; ctx.scale(2, 2); };
    resize(); window.addEventListener("resize", resize);
    const ps = Array.from({ length: 35 }, () => ({
      x: Math.random() * c.offsetWidth, y: Math.random() * c.offsetHeight,
      r: Math.random() * 2 + 0.5, dx: (Math.random() - 0.5) * 0.2,
      dy: Math.random() * -0.4 - 0.1, o: Math.random() * 0.35 + 0.08,
      ph: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.offsetWidth, c.offsetHeight);
      const t = Date.now() * 0.001;
      ps.forEach(p => {
        p.x += p.dx + Math.sin(t + p.ph) * 0.1; p.y += p.dy;
        if (p.y < -10) { p.y = c.offsetHeight + 10; p.x = Math.random() * c.offsetWidth; }
        if (p.x < -10) p.x = c.offsetWidth + 10;
        if (p.x > c.offsetWidth + 10) p.x = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61,216,208,${p.o * (0.6 + 0.4 * Math.sin(t * 1.8 + p.ph))})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
};

const Counter = ({ end, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const r = useRef(null), s = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !s.current) {
        s.current = true; const t0 = Date.now();
        const tick = () => { const p = Math.min((Date.now() - t0) / 2000, 1); setVal(Math.round((1 - Math.pow(1 - p, 3)) * end)); if (p < 1) requestAnimationFrame(tick); };
        tick();
      }
    }, { threshold: 0.3 });
    if (r.current) obs.observe(r.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={r}>{val}{suffix}</span>;
};

const Label = ({ children, color = C.cyan }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12, fontFamily: F }}>
    <span style={{ width: 20, height: 2, background: color, borderRadius: 1 }} />{children}
  </div>
);

// ═══════════════════════════════════════════
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeQ, setActiveQ] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const services = [
    { icon: "🧹", t: "Cleaning & Debris", d: "Basin scrubbing, skimming, algae treatment, mineral deposit removal." },
    { icon: "🧪", t: "Water Treatment", d: "pH balancing, algaecide, mineral management, clarity optimization." },
    { icon: "⚙️", t: "Mechanical Inspection", d: "Pump testing, filter checks, nozzle cleaning, flow calibration." },
    { icon: "📸", t: "Service Reports", d: "Notes and photos uploaded to your portal after every visit." },
    { icon: "🔧", t: "Repair & Restoration", d: "Pump replacements, crack repair, plumbing, LED restoration." },
    { icon: "🌊", t: "Deep Cleans", d: "Quarterly full drain-and-clean. Total system teardown & rebuild." },
  ];

  const tiers = [
    { id: "basic", icon: "💧", name: "Basic", price: 89, freq: "Monthly visits",
      features: ["Debris removal & basin cleaning", "Water level check & top-off", "Basic water treatment", "Pump inspection", "Service report with photos"], cta: "Start Basic" },
    { id: "standard", icon: "🌊", name: "Standard", price: 169, freq: "Bi-weekly visits", popular: true,
      features: ["Everything in Basic", "Full mechanical inspection", "Chemical balancing & pH testing", "Nozzle & jet cleaning", "Filter replacement as needed", "Bi-weekly photo reports"], cta: "Start Standard" },
    { id: "premium", icon: "⛲", name: "Premium", price: 299, freq: "Weekly visits",
      features: ["Everything in Standard", "Weekly full-service maintenance", "Priority same-day repair response", "Quarterly seasonal deep cleans", "LED & lighting system checks", "24/7 emergency support"], cta: "Start Premium" },
  ];

  const testimonials = [
    { name: "Maria G.", loc: "Rancho Cucamonga", tier: "Premium", text: "Our tiered stone fountain has never looked better. Weekly visits keep everything spotless and the photo reports give me total peace of mind." },
    { name: "Tony R.", loc: "Ontario", title: "Facilities Mgr", tier: "Premium", text: "Managing a hotel lobby fountain used to be a headache. Now it's completely hands-off. The Fountain Doctor handles everything." },
    { name: "Sandra W.", loc: "Redlands", tier: "Standard", text: "Super professional, always on time. My fountain looks gorgeous year-round. Bi-weekly is the perfect cadence." },
  ];

  const faqs = [
    { q: "What's in the $185 first visit?", a: "Full service — not just a quote. We clean your fountain, inspect pump and plumbing, test water chemistry, take photos, and recommend a monthly plan." },
    { q: "What areas do you serve?", a: "All of Southern California — San Bernardino, Riverside, LA, and Orange County." },
    { q: "Homes and businesses?", a: "Both. Residential fountains and commercial installations — hotels, offices, campuses." },
    { q: "Am I locked in?", a: "No contracts. Choose a monthly plan after your first visit. Change or cancel anytime." },
    { q: "What about repairs?", a: "Premium gets same-day priority. All plans can submit requests through the portal." },
    { q: "How fast to get started?", a: "Most first visits within 3–5 business days. Call for urgent situations." },
  ];

  const firstVisitItems = [
    { icon: "🧹", t: "Full Cleaning", d: "Basin scrub, debris, surface treatment" },
    { icon: "⚙️", t: "Mechanical Check", d: "Pump, filter, plumbing, flow rate" },
    { icon: "🧪", t: "Water Chemistry", d: "pH, minerals, algae assessment" },
    { icon: "📸", t: "Photo Documentation", d: "Before & after in your portal" },
    { icon: "📋", t: "Condition Report", d: "Detailed findings write-up" },
    { icon: "✅", t: "Plan Recommendation", d: "Custom plan for your fountain" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xojyabvd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: F, background: C.navy, color: C.white, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:${C.cyan}44}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .fu{animation:fadeUp .6s ease forwards}
        .fu1{animation:fadeUp .6s ease .1s forwards;opacity:0}
        .fu2{animation:fadeUp .6s ease .2s forwards;opacity:0}
        .fu3{animation:fadeUp .6s ease .3s forwards;opacity:0}
        a{color:${C.cyan};text-decoration:none}
        .sec{padding:72px 0;position:relative}
        .sec-inner{max-width:1120px;margin:0 auto;padding:0 20px;position:relative;z-index:2}
        .ttl{font-size:clamp(24px,5vw,42px);font-weight:800;font-family:${FD};color:${C.white};line-height:1.12;letter-spacing:-0.03em;margin:0 0 12px}
        .sub{font-size:clamp(13px,2.5vw,15px);color:${C.offWhite};line-height:1.6;max-width:460px}
        .sub-c{margin-left:auto;margin-right:auto}

        /* Desktop grid overrides */
        @media(min-width:901px){
          .desktop-grid-3{display:grid!important;grid-template-columns:repeat(3,1fr);gap:20px}
          .desktop-grid-3 .carousel-wrapper{display:contents}
          .desktop-grid-2{display:grid!important;grid-template-columns:repeat(2,1fr);gap:20px}
          .mobile-only{display:none!important}
          .desktop-only{display:flex!important}
          .hero-row{flex-direction:row!important;text-align:left!important}
          .hero-logo-wrap{display:flex!important}
          .stats-row{justify-content:flex-start!important}
          .fv-grid{grid-template-columns:repeat(3,1fr)!important}
          .step-grid{display:grid!important;grid-template-columns:repeat(4,1fr);gap:0}
          .step-line-d{display:block!important}
          .footer-cols{flex-direction:row!important;gap:40px!important}
        }
        @media(max-width:900px){
          .desktop-only{display:none!important}
          .mobile-only{display:block!important}
          .hero-row{flex-direction:column!important;text-align:center!important}
          .hero-logo-wrap{display:none!important}
          .stats-row{justify-content:center!important}
          .fv-grid{grid-template-columns:1fr 1fr!important}
          .step-grid{display:grid!important;grid-template-columns:1fr 1fr;gap:20px}
          .step-line-d{display:none!important}
        }
        @media(max-width:480px){
          .fv-grid{grid-template-columns:1fr!important}
          .step-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 16px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled || menuOpen ? `${C.navyDeep}f0` : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.cyan}12` : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <img src={LOGO_SRC} alt="The Fountain Doctor" style={{ height: 40 }} />
        <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {["How It Works", "Services", "Pricing", "FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={{ color: C.offWhite, fontSize: 13, fontWeight: 500 }}>{item}</a>
          ))}
          <a href="#book" style={{ padding: "8px 16px", borderRadius: 8, background: C.cyan, color: C.navyDeep, fontSize: 12, fontWeight: 700, fontFamily: F }}>Book — $185</a>
        </div>
        <button className="mobile-only" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ width: 20, height: 2, background: C.white, borderRadius: 1, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ width: 20, height: 2, background: C.white, borderRadius: 1, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 20, height: 2, background: C.white, borderRadius: 1, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 99, background: `${C.navyDeep}f5`, backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", padding: "12px 16px 20px", gap: 0, borderBottom: `1px solid ${C.cyan}12` }}>
          {["How It Works", "Services", "Pricing", "FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMenuOpen(false)}
              style={{ color: C.offWhite, fontSize: 15, fontWeight: 500, padding: "12px 0", borderBottom: `1px solid ${C.cyan}08`, display: "block" }}>{item}</a>
          ))}
          <a href="#book" onClick={() => setMenuOpen(false)} style={{ marginTop: 10, padding: "13px 0", borderRadius: 10, background: C.cyan, color: C.navyDeep, fontSize: 14, fontWeight: 700, fontFamily: F, textAlign: "center", display: "block" }}>Book First Visit — $185</a>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
        background: `radial-gradient(ellipse at 30% 20%, ${C.navyLight}44 0%, transparent 60%), ${C.navyDeep}`,
        padding: "70px 0 32px",
      }}>
        <WaterParticles />
        <div className="sec-inner" style={{ width: "100%" }}>
          <div className="hero-row" style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div style={{ flex: 1 }}>
              <div className="fu" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: 18, background: `${C.cyan}12`, border: `1px solid ${C.cyan}22`, marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: C.cyan, letterSpacing: "0.06em", textTransform: "uppercase" }}>Serving Southern California</span>
              </div>

              <h1 className="fu1" style={{ fontSize: "clamp(30px, 7vw, 60px)", fontWeight: 900, fontFamily: FD, lineHeight: 1.08, letterSpacing: "-0.035em", marginBottom: 16 }}>
                <span style={{ color: C.white }}>Your fountain,</span><br />
                <span style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanBright}, ${C.gold})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>always perfect.</span>
              </h1>

              <p className="fu2" style={{ fontSize: "clamp(14px, 3vw, 17px)", color: C.offWhite, lineHeight: 1.6, marginBottom: 18, maxWidth: 480 }}>
                Professional fountain maintenance on subscription. We clean, treat, inspect, and document every visit.
              </p>

              {/* $185 CTA */}
              <div className="fu3" style={{ padding: "16px 18px", borderRadius: 14, background: `linear-gradient(135deg, ${C.cyan}12, ${C.gold}08)`, border: `1px solid ${C.cyan}22`, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 24, fontWeight: 900, fontFamily: FD, color: C.white }}>$185</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.cyan }}>First Visit & Full Assessment</div>
                    <div style={{ fontSize: 11, color: C.gray }}>Service + inspection + plan recommendation</div>
                  </div>
                </div>
                <a href="#book" style={{ display: "block", textAlign: "center", padding: "12px 0", borderRadius: 10, background: C.cyan, color: C.navyDeep, fontSize: 14, fontWeight: 700, fontFamily: F }}>Book Your First Visit →</a>
              </div>

              <div className="fu3 stats-row" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[{ val: <Counter end={150} suffix="+" />, l: "Fountains" }, { val: <Counter end={98} suffix="%" />, l: "Retention" }, { val: <Counter end={5} />, l: "Stars" }].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: FD, color: C.white }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: C.gray, marginTop: 1 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-logo-wrap" style={{ flexShrink: 0, display: "flex" }}>
              <img src={LOGO_SRC} alt="" style={{ width: 240, height: "auto", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.4))" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="sec" style={{ background: C.navyDeep }}>
        <div className="sec-inner">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Label color={C.gold}>How It Works</Label>
            <h2 className="ttl">One visit to get started.</h2>
            <p className="sub sub-c">Your $185 first visit is real service. Then choose your monthly plan.</p>
          </div>

          <div className="step-grid" style={{ position: "relative", marginBottom: 40 }}>
            <div className="step-line-d" style={{ position: "absolute", top: 38, left: "12%", right: "12%", height: 2, background: `linear-gradient(90deg, ${C.cyan}33, ${C.gold}22)` }} />
            {[
              { n: "01", icon: "📞", t: "Book", d: "Schedule online or call. 3–5 days.", tag: null },
              { n: "02", icon: "🔧", t: "Service & Assess", d: "Full cleaning, inspection, photos.", tag: "$185" },
              { n: "03", icon: "📋", t: "Get Your Plan", d: "We recommend the right tier.", tag: null },
              { n: "04", icon: "✨", t: "Monthly Care", d: "Recurring visits. Crystal clear.", tag: "Monthly" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 4px" }}>
                <div style={{ width: 68, height: 68, borderRadius: "50%", margin: "0 auto 12px", background: `linear-gradient(135deg, ${C.navyLight}, ${C.navyMid})`, border: `2px solid ${i === 1 ? C.gold : C.cyan}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, position: "relative" }}>
                  {s.icon}
                  {s.tag && <span style={{ position: "absolute", top: -5, right: -12, padding: "2px 8px", borderRadius: 10, background: i === 1 ? C.gold : C.cyan, color: C.navyDeep, fontSize: 8, fontWeight: 800 }}>{s.tag}</span>}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.cyan, letterSpacing: "0.1em", marginBottom: 4 }}>{s.n}</div>
                <h3 style={{ fontSize: 13, fontWeight: 700, fontFamily: FD, color: C.white, marginBottom: 4 }}>{s.t}</h3>
                <p style={{ fontSize: 11, color: C.gray, lineHeight: 1.45 }}>{s.d}</p>
              </div>
            ))}
          </div>

          {/* First visit breakdown */}
          <div style={{ padding: "20px", borderRadius: 14, background: `linear-gradient(135deg, ${C.navyLight}88, ${C.navyMid}88)`, border: `1px solid ${C.gold}22` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, fontFamily: FD, color: C.white }}>Your $185 First Visit Includes</h3>
              <span style={{ fontSize: 24, fontWeight: 900, fontFamily: FD, color: C.gold }}>$185</span>
            </div>
            <div className="fv-grid" style={{ display: "grid", gap: 12 }}>
              {firstVisitItems.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.white }}>{item.t}</div>
                    <div style={{ fontSize: 11, color: C.gray, lineHeight: 1.4 }}>{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — Carousel on mobile, grid on desktop ═══ */}
      <section id="services" className="sec">
        <div className="sec-inner">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Label>What We Do</Label>
            <h2 className="ttl">Complete fountain care.</h2>
            <p className="sub sub-c">Swipe to explore our services →</p>
          </div>

          {/* Mobile: Carousel */}
          <div className="mobile-only">
            <Carousel peek>
              {services.map((s, i) => (
                <div key={i} style={{ padding: "24px 20px", borderRadius: 14, background: `rgba(30,36,64,0.7)`, border: `1px solid ${C.cyan}12`, height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: FD, color: C.white, marginBottom: 8 }}>{s.t}</h3>
                  <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.55 }}>{s.d}</p>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Desktop: Grid */}
          <div className="desktop-only" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {services.map((s, i) => (
              <div key={i} style={{ padding: "28px 24px", borderRadius: 14, background: `rgba(30,36,64,0.6)`, border: `1px solid ${C.cyan}10`, transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.cyan}28`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.cyan}10`; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: FD, color: C.white, marginBottom: 8 }}>{s.t}</h3>
                <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.55 }}>{s.d}</p>
              </div>
            ))}
          </div>

          {/* Res vs Commercial */}
          <div style={{ marginTop: 28 }}>
            <div className="mobile-only">
              <Carousel>
                {[
                  { icon: "🏠", type: "Residential", d: "Garden fountains, wall features, birdbaths, koi ponds.", ex: "Tiered stone, pedestal, wall-mounted, solar, urn" },
                  { icon: "🏢", type: "Commercial", d: "Hotel lobbies, offices, shopping centers, campuses.", ex: "Architectural, multi-jet, reflecting pools, feature walls" },
                ].map((t, i) => (
                  <div key={i} style={{ padding: "22px 20px", borderRadius: 14, background: `linear-gradient(135deg, ${C.navyLight}88, ${C.navyMid}88)`, border: `1px solid ${C.cyan}12` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 24 }}>{t.icon}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: FD, color: C.white }}>{t.type}</h3>
                    </div>
                    <p style={{ fontSize: 13, color: C.offWhite, lineHeight: 1.5, marginBottom: 6 }}>{t.d}</p>
                    <p style={{ fontSize: 11, color: C.gray }}>Types: {t.ex}</p>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="desktop-only" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { icon: "🏠", type: "Residential", d: "Garden fountains, wall features, birdbaths, koi ponds.", ex: "Tiered stone, pedestal, wall-mounted, solar, urn" },
                { icon: "🏢", type: "Commercial", d: "Hotel lobbies, offices, shopping centers, campuses.", ex: "Architectural, multi-jet, reflecting pools, feature walls" },
              ].map((t, i) => (
                <div key={i} style={{ padding: "24px", borderRadius: 14, background: `linear-gradient(135deg, ${C.navyLight}88, ${C.navyMid}88)`, border: `1px solid ${C.cyan}12` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{t.icon}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: FD, color: C.white }}>{t.type}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: C.offWhite, lineHeight: 1.5, marginBottom: 6 }}>{t.d}</p>
                  <p style={{ fontSize: 11, color: C.gray }}>Types: {t.ex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING — Carousel on mobile ═══ */}
      <section id="pricing" className="sec" style={{ background: C.navyDeep }}>
        <div className="sec-inner">
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Label>Monthly Plans</Label>
            <h2 className="ttl">Pick the plan that fits.</h2>
            <p className="sub sub-c">After your $185 first visit, choose your monthly tier.</p>
          </div>

          <div style={{ textAlign: "center", padding: "12px 16px", borderRadius: 10, background: `${C.gold}10`, border: `1px solid ${C.gold}22`, marginBottom: 28, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
            <span style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>⚡ Every customer starts with a $185 First Visit</span>
          </div>

          {/* Mobile: Carousel */}
          <div className="mobile-only">
            <Carousel peek>
              {tiers.map((tier) => {
                const tc = tierC[tier.id]; const pop = tier.popular;
                return (
                  <div key={tier.id} style={{ borderRadius: 16, padding: pop ? "2px" : 0, background: pop ? `linear-gradient(135deg, ${C.cyan}, ${C.gold})` : "transparent", height: "100%" }}>
                    <div style={{ background: C.navyDeep, borderRadius: pop ? 14 : 16, border: pop ? "none" : `1px solid ${tc}22`, padding: "28px 20px", height: "100%", display: "flex", flexDirection: "column" }}>
                      {pop && <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "3px 10px", borderRadius: 16, background: `${C.cyan}18`, fontSize: 9, fontWeight: 700, color: C.cyan, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Most Popular</div>}
                      <div style={{ fontSize: 30, marginBottom: 6 }}>{tier.icon}</div>
                      <h3 style={{ fontSize: 19, fontWeight: 800, fontFamily: FD, color: tc, marginBottom: 3 }}>{tier.name}</h3>
                      <div style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>{tier.freq}</div>
                      <div style={{ marginBottom: 20 }}>
                        <span style={{ fontSize: 40, fontWeight: 900, fontFamily: FD, color: C.white }}>${tier.price}</span>
                        <span style={{ fontSize: 13, color: C.grayDark }}>/mo</span>
                      </div>
                      <div style={{ flex: 1, marginBottom: 20 }}>
                        {tier.features.map((f, fi) => (
                          <div key={fi} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 7 }}>
                            <span style={{ color: tc, fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
                            <span style={{ fontSize: 12, color: f.startsWith("Everything") ? C.offWhite : C.gray, lineHeight: 1.4, fontWeight: f.startsWith("Everything") ? 600 : 400 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <a href="#book" style={{ display: "block", textAlign: "center", padding: "12px 0", borderRadius: 10, background: pop ? C.cyan : "transparent", color: pop ? C.navyDeep : tc, border: pop ? "none" : `1px solid ${tc}33`, fontSize: 13, fontWeight: 700, fontFamily: F }}>{tier.cta}</a>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>

          {/* Desktop: Grid */}
          <div className="desktop-only" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "stretch" }}>
            {tiers.map((tier) => {
              const tc = tierC[tier.id]; const pop = tier.popular;
              return (
                <div key={tier.id} style={{ borderRadius: 16, padding: pop ? "3px" : 0, background: pop ? `linear-gradient(135deg, ${C.cyan}, ${C.gold})` : "transparent", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ background: C.navyDeep, borderRadius: pop ? 14 : 16, border: pop ? "none" : `1px solid ${tc}22`, padding: "32px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
                    {pop && <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "3px 12px", borderRadius: 18, background: `${C.cyan}18`, fontSize: 10, fontWeight: 700, color: C.cyan, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Most Popular</div>}
                    <div style={{ fontSize: 32, marginBottom: 6 }}>{tier.icon}</div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: FD, color: tc, marginBottom: 3 }}>{tier.name}</h3>
                    <div style={{ fontSize: 12, color: C.gray, marginBottom: 18 }}>{tier.freq}</div>
                    <div style={{ marginBottom: 22 }}>
                      <span style={{ fontSize: 44, fontWeight: 900, fontFamily: FD, color: C.white }}>${tier.price}</span>
                      <span style={{ fontSize: 14, color: C.grayDark }}>/mo</span>
                    </div>
                    <div style={{ flex: 1, marginBottom: 22 }}>
                      {tier.features.map((f, fi) => (
                        <div key={fi} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                          <span style={{ color: tc, fontSize: 12, marginTop: 2, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: 12, color: f.startsWith("Everything") ? C.offWhite : C.gray, lineHeight: 1.4, fontWeight: f.startsWith("Everything") ? 600 : 400 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a href="#book" style={{ display: "block", textAlign: "center", padding: "12px 0", borderRadius: 10, background: pop ? C.cyan : "transparent", color: pop ? C.navyDeep : tc, border: pop ? "none" : `1px solid ${tc}33`, fontSize: 13, fontWeight: 700, fontFamily: F }}>{tier.cta}</a>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 28, textAlign: "center", padding: "14px 16px", borderRadius: 12, background: `${C.green}08`, border: `1px solid ${C.green}22` }}>
            <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>✅ 30-Day Guarantee — Not happy? Full refund, no questions.</span>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — Carousel ═══ */}
      <section className="sec">
        <div className="sec-inner">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Label color={C.gold}>Clients</Label>
            <h2 className="ttl">Trusted across SoCal.</h2>
          </div>

          <div className="mobile-only">
            <Carousel peek>
              {testimonials.map((t, i) => (
                <div key={i} style={{ padding: "22px 18px", borderRadius: 14, background: `rgba(30,36,64,0.5)`, border: `1px solid ${C.cyan}10`, height: "100%" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 13, color: C.gold }}>★</span>)}</div>
                  <p style={{ fontSize: 13, color: C.offWhite, lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ borderTop: `1px solid ${C.cyan}12`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.white }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: C.gray }}>{t.title ? `${t.title} · ` : ""}{t.loc}</div>
                    </div>
                    <span style={{ padding: "2px 8px", borderRadius: 14, fontSize: 10, fontWeight: 600, color: t.tier === "Premium" ? C.gold : C.cyan, background: t.tier === "Premium" ? `${C.gold}15` : `${C.cyan}15` }}>{t.tier}</span>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="desktop-only" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: "24px 22px", borderRadius: 14, background: `rgba(30,36,64,0.5)`, border: `1px solid ${C.cyan}10` }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 14, color: C.gold }}>★</span>)}</div>
                <p style={{ fontSize: 13, color: C.offWhite, lineHeight: 1.6, marginBottom: 18, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ borderTop: `1px solid ${C.cyan}12`, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.white }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: C.gray }}>{t.title ? `${t.title} · ` : ""}{t.loc}</div>
                  </div>
                  <span style={{ padding: "2px 8px", borderRadius: 14, fontSize: 10, fontWeight: 600, color: t.tier === "Premium" ? C.gold : C.cyan, background: t.tier === "Premium" ? `${C.gold}15` : `${C.cyan}15` }}>{t.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ — Accordion (already compact) ═══ */}
      <section id="faq" className="sec" style={{ background: C.navyDeep }}>
        <div className="sec-inner">
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <Label>FAQ</Label>
              <h2 className="ttl">Questions? Answers.</h2>
            </div>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.cyan}12` }}>
                <button onClick={() => setActiveQ(activeQ === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", background: "none", border: "none", cursor: "pointer", fontFamily: F, textAlign: "left" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: activeQ === i ? C.cyan : C.white, paddingRight: 12 }}>{f.q}</span>
                  <span style={{ color: C.cyan, fontSize: 18, fontWeight: 300, transition: "transform 0.3s", transform: activeQ === i ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
                </button>
                <div style={{ maxHeight: activeQ === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <p style={{ fontSize: 12, color: C.gray, lineHeight: 1.6, paddingBottom: 16 }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section id="book" style={{ padding: "72px 16px", textAlign: "center", position: "relative", background: `radial-gradient(ellipse at center, ${C.cyan}06 0%, transparent 60%), ${C.navyDeep}`, overflow: "hidden" }}>
        {[1,2,3].map(r => <div key={r} style={{ position: "absolute", top: "50%", left: "50%", width: 140 + r * 120, height: 140 + r * 120, borderRadius: "50%", border: `1px solid ${C.cyan}${r === 1 ? "10" : "06"}`, transform: "translate(-50%, -50%)" }} />)}
        <div style={{ position: "relative", zIndex: 2 }}>
          <img src={LOGO_SRC} alt="" style={{ width: 90, height: "auto", margin: "0 auto 18px", display: "block", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }} />
          <h2 style={{ fontSize: "clamp(22px, 5vw, 40px)", fontWeight: 900, fontFamily: FD, lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: 12 }}>
            <span style={{ color: C.white }}>Ready for a fountain that </span><span style={{ color: C.cyan }}>just works</span><span style={{ color: C.white }}>?</span>
          </h2>
          <p style={{ fontSize: "clamp(13px, 2.5vw, 16px)", color: C.offWhite, maxWidth: 400, margin: "0 auto 8px", lineHeight: 1.6 }}>Book your $185 first visit. Real service on day one.</p>
          <p style={{ fontSize: 11, color: C.gray, marginBottom: 24 }}>Scheduled within 3–5 business days.</p>
          <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              style={{ padding: "13px 16px", borderRadius: 10, border: `1px solid ${C.cyan}33`, background: `${C.navy}cc`, color: C.white, fontSize: 14, fontFamily: F, outline: "none" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
              style={{ padding: "13px 16px", borderRadius: 10, border: `1px solid ${C.cyan}33`, background: `${C.navy}cc`, color: C.white, fontSize: 14, fontFamily: F, outline: "none" }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number (optional)"
              value={formData.phone}
              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
              style={{ padding: "13px 16px", borderRadius: 10, border: `1px solid ${C.cyan}33`, background: `${C.navy}cc`, color: C.white, fontSize: 14, fontFamily: F, outline: "none" }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "14px 32px", borderRadius: 12, background: submitted ? C.green : C.cyan, color: C.navyDeep, fontSize: "clamp(13px, 3vw, 15px)", fontWeight: 800, fontFamily: F, boxShadow: `0 4px 24px ${C.cyan}33`, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.2s" }}
            >
              {loading ? "Submitting…" : submitted ? "✓ Submitted! Check your email" : "Book First Visit — $185"}
            </button>
            <a href="tel:+19095550100" style={{ padding: "14px 24px", borderRadius: 12, background: "transparent", color: C.white, border: `1px solid ${C.white}22`, fontSize: "clamp(12px, 2.5vw, 15px)", fontWeight: 600, fontFamily: F, textDecoration: "none" }}>📞 Call Us</a>
          </form>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "36px 16px 24px", borderTop: `1px solid ${C.cyan}08`, background: C.navyDeep }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
          <div>
            <img src={LOGO_SRC} alt="" style={{ height: 32, marginBottom: 8 }} />
            <p style={{ fontSize: 11, color: C.gray, lineHeight: 1.5, maxWidth: 220 }}>Fountain maintenance on subscription. Southern California.</p>
          </div>
          <div className="footer-cols" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <div>
                <h4 style={{ fontSize: 10, fontWeight: 700, color: C.grayDark, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Plans</h4>
                {["First Visit $185", "Basic $89/mo", "Standard $169/mo", "Premium $299/mo"].map(p => <a key={p} href="#pricing" style={{ display: "block", fontSize: 11, color: C.gray, marginBottom: 5 }}>{p}</a>)}
              </div>
              <div>
                <h4 style={{ fontSize: 10, fontWeight: 700, color: C.grayDark, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Contact</h4>
                <p style={{ fontSize: 11, color: C.gray, lineHeight: 1.7 }}>📍 San Bernardino, CA<br />📞 (909) 555-0100<br />✉️ hello@thefountaindoctor.com</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1120, margin: "20px auto 0", paddingTop: 14, borderTop: `1px solid ${C.cyan}08`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontSize: 10, color: C.grayDark }}>© 2026 The Fountain Doctor</span>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#" style={{ fontSize: 10, color: C.grayDark }}>Privacy</a>
            <a href="#" style={{ fontSize: 10, color: C.grayDark }}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
