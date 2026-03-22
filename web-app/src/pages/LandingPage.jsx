import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import styles from "../styles/LandingPage.module.css";

/* ── Testimonials data ── */
const testimonials = [
  {
    initials: "SR",
    name: "Sneha Rao",
    role: "Talent Lead · Razorpay",
    color: "#4F6BFF",
    bg: "rgba(79,107,255,0.18)",
    text: "We cut our screening time from 3 days to under 2 hours for a batch of 200 resumes. The scoring accuracy is genuinely impressive.",
  },
  {
    initials: "AK",
    name: "Ankit Kulkarni",
    role: "HR Manager · Zepto",
    color: "#00C9A7",
    bg: "rgba(0,201,167,0.15)",
    text: "The AI-generated interview questions saved my panel at least 40 minutes of prep per candidate. They're genuinely tailored to each resume.",
  },
  {
    initials: "NV",
    name: "Neha Verma",
    role: "Recruiter · CRED",
    color: "#FF6B6B",
    bg: "rgba(255,107,107,0.12)",
    text: "We parsed 500 resumes for a backend role in 8 minutes. The ranked list had our eventual hire at #2 — the AI judgment is solid.",
  },
  {
    initials: "RP",
    name: "Rohan Pillai",
    role: "Head of Hiring · Groww",
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.12)",
    text: "JD matching is a killer feature. I updated the role description mid-search and the rankings reshuffled in real time. No other tool does this.",
  },
  {
    initials: "DM",
    name: "Divya Malhotra",
    role: "TA Partner · Meesho",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
    text: "Integration with our ATS took 20 minutes via webhook. Now ranked candidates flow straight into our pipeline — zero manual entry.",
  },
  {
    initials: "PS",
    name: "Pranav Shah",
    role: "VP People · Infosys",
    color: "#60A5FA",
    bg: "rgba(59,130,246,0.14)",
    text: "We went from a 12-day hiring cycle to 4 days. The bias reduction in scoring has also noticeably improved our team diversity.",
  },
];

/* ── Features ── */
const features = [
  {
    emoji: "📋",
    cls: "a",
    title: "AI Resume Parser",
    desc: "Upload hundreds of PDFs at once. Our AI extracts skills, experience, education, and projects — structured and ready to compare in seconds.",
  },
  {
    emoji: "🏅",
    cls: "b",
    title: "Smart Candidate Scoring",
    desc: "Each resume is scored against your job description — weighting technical skills, years of experience, domain match, and keyword density.",
  },
  {
    emoji: "📊",
    cls: "c",
    title: "Ranked Shortlists",
    desc: "View a ranked leaderboard of candidates with scores, match percentages, and skill gaps — instantly filterable by role, score, or date.",
  },
  {
    emoji: "🤖",
    cls: "d",
    title: "AI Interview Questions",
    desc: "Auto-generate tailored technical and behavioral interview questions for each shortlisted candidate based on their resume and the job role.",
  },
  {
    emoji: "⚡",
    cls: "e",
    title: "JD Matching Engine",
    desc: "Paste any job description and watch the engine re-rank candidates in real time — weights adjust dynamically as you edit the requirements.",
  },
  {
    emoji: "🔗",
    cls: "f",
    title: "ATS & Export Ready",
    desc: "Export ranked shortlists as CSV or PDF. Integrate with your existing ATS via webhook or our REST API with full candidate data payloads.",
  },
];

/* ── Pricing ── */
const plans = [
  {
    name: "Starter",
    desc: "For small teams & freelancers",
    monthly: "0",
    annual: "0",
    period: "Free forever · 20 resumes/mo",
    features: [
      { ok: true, text: "20 resume parses / month" },
      { ok: true, text: "Basic scoring & ranking" },
      { ok: true, text: "5 AI question sets / month" },
      { ok: true, text: "CSV export" },
      { ok: false, text: "JD live re-ranking" },
      { ok: false, text: "ATS integration" },
    ],
    btn: "Get Started Free",
    variant: "outline",
    featured: false,
  },
  {
    name: "Pro",
    desc: "For growing hiring teams",
    monthly: "1,499",
    annual: "974",
    period: "per month · unlimited seats",
    periodAnnual: "per month billed annually",
    features: [
      { ok: true, text: "500 resume parses / month" },
      { ok: true, text: "Advanced AI scoring + skill gap" },
      { ok: true, text: "Unlimited AI question sets" },
      { ok: true, text: "JD live re-ranking engine" },
      { ok: true, text: "PDF & CSV export" },
      { ok: false, text: "ATS webhook integration" },
    ],
    btn: "Start 14-Day Trial",
    variant: "fill",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    desc: "For large orgs & agencies",
    monthly: "4,999",
    annual: "3,249",
    period: "per month · unlimited resumes",
    periodAnnual: "per month billed annually",
    features: [
      { ok: true, text: "Unlimited resume parses" },
      { ok: true, text: "Custom scoring weights" },
      { ok: true, text: "ATS webhook & REST API" },
      { ok: true, text: "White-label reports" },
      { ok: true, text: "SSO & role-based access" },
      { ok: true, text: "Dedicated account manager" },
    ],
    btn: "Contact Sales",
    variant: "outline",
    featured: false,
  },
];

/* ── FAQ ── */
const faqs = [
  {
    q: "How does NextHireAI rank candidates for a job?",
    a: "After you create a job and paste the description, each resume is parsed and scored against required skills, role fit, and experience alignment. Candidates are then ranked by match score so recruiters can prioritize faster.",
  },
  {
    q: "What should I do before uploading resumes?",
    a: "Start by creating the job with a clear title and complete description. Better job details produce better parsing, skill-gap detection, and more reliable ranking outputs.",
  },
  {
    q: "What resume formats are supported right now?",
    a: "Your current flow is optimized for PDF resumes. Upload single or multiple files, and the system processes them one by one into the candidate pipeline.",
  },
  {
    q: "Can I review candidate strengths and missing skills?",
    a: "Yes. Each analyzed candidate includes matched skills, missing skills, readiness indicators, and summary reasoning so recruiters can decide quickly with context.",
  },
  {
    q: "Does the platform generate interview questions automatically?",
    a: "Yes. For analyzed candidates, the system can generate interview-focused insights and question guidance based on resume content and job expectations.",
  },
  {
    q: "Can recruiters update candidate stage inside the dashboard?",
    a: "Yes. You can move candidates across stages like Applied, Shortlisted, Interview, Offer, Hired, or Rejected and keep your hiring pipeline organized.",
  },
  {
    q: "Can I open old jobs and review candidates later?",
    a: "Yes. Jobs are listed in the Jobs view, and recruiters can reopen any role to inspect ranked candidates, stage status, and detailed reports.",
  },
  {
    q: "What happens if analysis fails for a resume?",
    a: "The UI shows a clear status message (for example backend not reachable or parsing issue). You can retry after fixing the input file or service availability.",
  },
  {
    q: "Can I export recruiter outputs for sharing?",
    a: "Yes. Your workflow supports downloadable outputs like reports and printable interview intelligence summaries for panel and hiring manager discussions.",
  },
  {
    q: "Is this suitable for small teams and high-volume hiring both?",
    a: "Yes. Small teams can move faster with automated shortlisting, while larger teams benefit from bulk processing, consistent scoring, and centralized candidate tracking.",
  },
];

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add(styles.visible);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── FAQ Item ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.faqItem}>
      <button
        className={`${styles.faqQ} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        {q}
        <span className={styles.faqArrow}>{open ? "−" : "+"}</span>
      </button>
      {open && <div className={styles.faqA}>{a}</div>}
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const num = parseInt(target.replace(/,/g, ""), 10);
          const step = Math.ceil(num / 60);
          const timer = setInterval(() => {
            start = Math.min(start + step, num);
            setVal(start);
            if (start >= num) clearInterval(timer);
          }, 20);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function LandingPage() {
  const [annual, setAnnual] = useState(false);
  const [email, setEmail] = useState("");
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  /* nav scroll shadow */
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* scroll reveal refs */
  const heroRef = useReveal();
  const featRef = useReveal();
  const howRef = useReveal();
  const priceRef = useReveal();
  const faqRef = useReveal();
  const ctaRef = useReveal();

  const handleCta = (e) => {
    e.preventDefault();
    if (email) {
      window.location.href = `/register?email=${encodeURIComponent(email)}`;
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className={styles.page}>
      {/* ══ NAV ══ */}
      <nav className={`${styles.nav} ${navScrolled ? styles.navScrolled : ""}`}>
        <div className={styles.navInner}>
          <div className={styles.logo}>
            <div className={styles.logoMark}>N</div>
            <span className={styles.logoText}>
              NextHire<span>AI</span>
            </span>
          </div>

          <ul className={`${styles.navLinks} ${mobileMenu ? styles.mobileOpen : ""}`}>
            {["features", "how", "pricing", "faq"].map((id) => (
              <li key={id}>
                <button onClick={() => scrollTo(id)}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.navR}>
            <Link to="/login" className={styles.btnGhost}>
              Log In
            </Link>
            <div className={styles.navDivider} />
            <Link to="/register" className={styles.btnPrimary}>
              Start Free Trial →
            </Link>
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGrid} />

        <div className={styles.heroL}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            AI-Powered Recruitment Platform
          </div>
          <h1 className={styles.heroH1}>
            Parse Resumes.
            <br />
            Rank Candidates.
            <br />
            <em>Hire Smarter.</em>
          </h1>
          <p className={styles.heroSub}>
            Upload bulk resumes and let AI score, rank, and shortlist the best
            candidates in seconds — then auto-generate tailored interview
            questions for each hire.
          </p>
          <div className={styles.heroBtns}>
            <Link to="/register" className={styles.btnXlAccent}>
              Start Screening Free
            </Link>
            <button className={styles.btnXlOutline} onClick={() => scrollTo("how")}>
              Watch How it Works →
            </button>
          </div>
          <div className={styles.heroTrust}>
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>
                <Counter target="120000" />+
              </span>
              <span className={styles.trustLbl}>Resumes Parsed</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>
                <Counter target="4800" />+
              </span>
              <span className={styles.trustLbl}>Hires Made</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>
                <Counter target="78" />%
              </span>
              <span className={styles.trustLbl}>Faster Shortlisting</span>
            </div>
          </div>

          <div className={styles.heroNote}>
            <div className={styles.heroNoteTitle}>Built for recruiter workflows</div>
            <div className={styles.heroNoteList}>
              <span className={styles.heroNoteItem}>JD-first candidate ranking</span>
              <span className={styles.heroNoteItem}>One-click interview guidance</span>
              <span className={styles.heroNoteItem}>Pipeline stage tracking</span>
            </div>
          </div>
        </div>

        <div className={styles.heroR}>
          {/* Upload mock */}
          <div className={`${styles.mockCard} ${styles.floatA}`}>
            <div className={styles.mockHdr}>
              <span className={styles.mockTitle}>📂 Bulk Resume Upload</span>
              <span className={`${styles.tag} ${styles.tagBlue}`}>Processing…</span>
            </div>
            {[
              {
                name: "Arjun_Sharma_Resume.pdf",
                status: "Extracting skills & experience",
                pct: 82,
                tagCls: "tagGreen",
              },
              {
                name: "Priya_Mehta_CV.pdf",
                status: "Analysing tech stack match",
                pct: 56,
                tagCls: "tagBlue",
              },
              {
                name: "Ravi_Kumar_Resume.pdf",
                status: "Done — scored ✓",
                pct: 95,
                tagCls: "tagGreen",
              },
            ].map((r, i) => (
              <div className={styles.parseRow} key={i}>
                <div className={styles.fileIcon}>📄</div>
                <div className={styles.parseInfo}>
                  <div className={styles.parseName}>{r.name}</div>
                  <div className={styles.parseStatus}>{r.status}</div>
                  <div className={styles.parseProgBg}>
                    <div
                      className={styles.parseProgFill}
                      style={{ width: `${r.pct}%`, animationDelay: `${i * -0.8}s` }}
                    />
                  </div>
                </div>
                <span className={`${styles.tag} ${styles[r.tagCls]}`}>{r.pct}%</span>
              </div>
            ))}
          </div>

          {/* Ranking mock */}
          <div className={`${styles.mockCard} ${styles.floatB} ${styles.mockOffset}`}>
            <div className={styles.mockHdr}>
              <span className={styles.mockTitle}>🏆 Candidate Rankings — SDE-2</span>
              <span className={`${styles.tag} ${styles.tagGreen}`}>12 Screened</span>
            </div>
            {[
              {
                rank: "#1",
                rankColor: "#FBBF24",
                rankBg: "rgba(251,191,36,0.15)",
                initials: "AS",
                color: "#A0AAFF",
                bg: "rgba(79,107,255,0.18)",
                name: "Arjun Sharma",
                sub: "5 yrs · React, Node, AWS",
                score: 95,
                barColor: "linear-gradient(90deg,#4F6BFF,#00C9A7)",
                scoreColor: "#00C9A7",
              },
              {
                rank: "#2",
                rankColor: "#7278A0",
                rankBg: "rgba(139,144,184,0.1)",
                initials: "PM",
                color: "#00C9A7",
                bg: "rgba(0,201,167,0.15)",
                name: "Priya Mehta",
                sub: "3 yrs · Vue, Python, GCP",
                score: 81,
                barColor: "#4F6BFF",
                scoreColor: "#6C84FF",
              },
              {
                rank: "#3",
                rankColor: "#7278A0",
                rankBg: "rgba(139,144,184,0.1)",
                initials: "RK",
                color: "#FF6B6B",
                bg: "rgba(255,107,107,0.12)",
                name: "Ravi Kumar",
                sub: "4 yrs · Angular, Java, Azure",
                score: 74,
                barColor: "#6C84FF",
                scoreColor: "#7278A0",
              },
            ].map((c, i) => (
              <div className={styles.candRow} key={i}>
                <div className={styles.rankBadge} style={{ color: c.rankColor, background: c.rankBg }}>
                  {c.rank}
                </div>
                <div className={styles.avatar} style={{ color: c.color, background: c.bg }}>
                  {c.initials}
                </div>
                <div className={styles.candInfo}>
                  <div className={styles.candName}>{c.name}</div>
                  <div className={styles.candSub}>{c.sub}</div>
                </div>
                <div className={styles.scoreWrap}>
                  <div className={styles.scoreBarBg}>
                    <div
                      className={styles.scoreBarFill}
                      style={{ width: `${c.score}%`, background: c.barColor }}
                    />
                  </div>
                  <div className={styles.scoreVal} style={{ color: c.scoreColor }}>
                    {c.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className={styles.features} id="features" ref={featRef}>
        <div className={styles.secHdr}>
          <div className={styles.secLabel}>Platform Features</div>
          <h2 className={styles.secTitle}>One platform, every hiring step</h2>
          <p className={styles.secSub}>
            From resume parsing to AI-generated interview questions — NextHireAI
            handles the heavy lifting so you focus on the best candidates.
          </p>
        </div>
        <div className={styles.featGrid}>
          {features.map((f, i) => (
            <div className={styles.featCard} key={i}>
              <div className={`${styles.featIcon} ${styles[`fi${f.cls}`]}`}>{f.emoji}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className={styles.how} id="how" ref={howRef}>
        <div className={styles.secHdr}>
          <div className={styles.secLabel}>How It Works</div>
          <h2 className={styles.secTitle}>From upload to shortlist in 4 steps</h2>
        </div>
        <div className={styles.stepsGrid}>
          {[
            {
              n: "01",
              title: "Post the Job",
              desc: "Create a role, paste your job description, and set the skills and weights that matter most for this hire.",
            },
            {
              n: "02",
              title: "Upload Resumes",
              desc: "Bulk upload PDFs or connect your email inbox. AI parses every resume and extracts structured data instantly.",
            },
            {
              n: "03",
              title: "Review Rankings",
              desc: "Get a scored, ranked leaderboard. Filter by score, skill, experience, or location — and flag top picks.",
            },
            {
              n: "04",
              title: "Interview with AI",
              desc: "One-click generates a tailored question bank per candidate. Share with your panel, or export for async review.",
            },
          ].map((s, i) => (
            <div className={styles.step} key={i}>
              <div className={styles.stepNum}>{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className={styles.testimonials}>
        <div className={styles.secHdr}>
          <div className={styles.secLabel}>What Recruiters Say</div>
          <h2 className={styles.secTitle}>Loved by hiring teams</h2>
        </div>
        <div className={styles.carousel}>
          <div className={styles.carouselTrack}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div className={styles.testCard} key={i}>
                <div className={styles.tcStars}>★★★★★</div>
                <p>"{t.text}"</p>
                <div className={styles.tcFoot}>
                  <div className={styles.tcAvatar} style={{ color: t.color, background: t.bg }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className={styles.tcName}>{t.name}</div>
                    <div className={styles.tcRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section className={styles.pricing} id="pricing" ref={priceRef}>
        <div className={styles.secHdr}>
          <div className={styles.secLabel}>Pricing</div>
          <h2 className={styles.secTitle}>Transparent recruiter pricing</h2>
          <p className={styles.secSub}>
            Pay for what you use. Scale up on active hiring drives, scale down in
            off-seasons.
          </p>
        </div>
        <div className={styles.pricingToggle}>
          <span className={`${styles.ptLabel} ${!annual ? styles.ptActive : ""}`}>Monthly</span>
          <button
            className={`${styles.toggleSw} ${annual ? styles.toggleOn : ""}`}
            onClick={() => setAnnual(!annual)}
            aria-label="Toggle billing"
          >
            <span className={styles.toggleKnob} />
          </button>
          <span className={`${styles.ptLabel} ${annual ? styles.ptActive : ""}`}>Annual</span>
          <span className={styles.saveTag}>Save 35%</span>
        </div>
        <div className={styles.priceGrid}>
          {plans.map((plan, i) => (
            <div className={`${styles.priceCard} ${plan.featured ? styles.priceFeatured : ""}`} key={i}>
              {plan.badge && <div className={styles.popBadge}>{plan.badge}</div>}
              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.planDesc}>{plan.desc}</div>
              <div className={styles.planPrice}>
                <sup>₹</sup>
                {annual ? plan.annual : plan.monthly}
              </div>
              <div className={styles.planPeriod}>
                {annual && plan.periodAnnual ? plan.periodAnnual : plan.period}
              </div>
              <ul className={styles.planFeats}>
                {plan.features.map((f, j) => (
                  <li key={j}>
                    <span className={`${styles.ck} ${!f.ok ? styles.ckNo : ""}`}>
                      {f.ok ? "✓" : "✗"}
                    </span>
                    <span style={{ opacity: f.ok ? 1 : 0.4 }}>{f.text}</span>
                  </li>
                ))}
              </ul>
              {plan.variant === "fill" ? (
                <Link to="/register" className={styles.planBtnFill}>
                  {plan.btn}
                </Link>
              ) : plan.name === "Enterprise" ? (
                <a href="mailto:sales@nexthire.ai" className={styles.planBtnOut}>
                  {plan.btn}
                </a>
              ) : (
                <Link to="/register" className={styles.planBtnOut}>
                  {plan.btn}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className={styles.faqSection} id="faq" ref={faqRef}>
        <div className={styles.secHdr}>
          <div className={styles.secLabel}>FAQ</div>
          <h2 className={styles.secTitle}>Frequently asked questions</h2>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className={styles.ctaSection} ref={ctaRef}>
        <div className={styles.ctaGlow} />
        <div className={styles.ctaCard}>
          <h2>
            Ready to hire
            <br />
            10× faster?
          </h2>
          <p>
            Join 4,800+ hiring teams already saving hours every week with AI-powered
            screening.
          </p>
          <form className={styles.ctaRow} onSubmit={handleCta}>
            <input
              className={styles.ctaInput}
              type="email"
              placeholder="your@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.ctaBtn}>
              Get Started →
            </button>
          </form>
          <p className={styles.ctaSmall}>
            Free plan · No credit card · 20 resumes/month included
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <div className={styles.logoMark}>N</div>
              <span className={styles.logoText}>
                NextHire<span>AI</span>
              </span>
            </div>
            <p>
              AI-powered resume parsing, candidate ranking, and interview question
              generation for modern hiring teams.
            </p>
            <div className={styles.footerSocial}>
              <a className={styles.socialBtn} href="#" aria-label="X">
                <FaXTwitter className={styles.socialIcon} />
              </a>
              <a className={styles.socialBtn} href="#" aria-label="LinkedIn">
                <FaLinkedin className={styles.socialIconLinkedin} />
              </a>
              <a className={styles.socialBtn} href="#" aria-label="YouTube">
                <FaYoutube className={styles.socialIconYoutube} />
              </a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h5>Product</h5>
            <ul>
              <li>
                <button onClick={() => scrollTo("features")}>Resume Parser</button>
              </li>
              <li>
                <button onClick={() => scrollTo("features")}>Candidate Scoring</button>
              </li>
              <li>
                <button onClick={() => scrollTo("features")}>AI Interview Qs</button>
              </li>
              <li>
                <button onClick={() => scrollTo("features")}>JD Matching</button>
              </li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h5>Company</h5>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h5>Resources</h5>
            <ul>
              <li>
                <button onClick={() => scrollTo("how")}>How It Works</button>
              </li>
              <li>
                <button onClick={() => scrollTo("pricing")}>Pricing</button>
              </li>
              <li>
                <button onClick={() => scrollTo("faq")}>FAQ</button>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 NextHireAI.</span>
          <div className={styles.footerBottomLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
