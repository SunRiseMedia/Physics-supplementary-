import { useState, useEffect } from "react";

const quizData = [
  { q: "1. Which of the following are considered vector quantities?", opts: ["Displacement", "Speed", "Velocity", "Acceleration"], ans: [0, 2, 3] },
  { q: "2. Which of the following statements accurately describe Newton's Laws of Motion?", opts: ["An object in motion will continue moving with a constant velocity unless acted upon by an external force.", "The acceleration of an object is inversely proportional to the net force acting on it.", "For every action, there is an equal and opposite reaction.", "The formula for the second law is F = ma."], ans: [0, 2, 3] },
  { q: "3. The kinetic energy of an object depends directly on which of the following variables?", opts: ["Its mass", "Its height from the ground", "The square of its velocity", "The acceleration due to gravity"], ans: [0, 2] },
  { q: "4. Which of the following are considered state functions of an ideal gas?", opts: ["Pressure", "Volume", "Temperature", "Work"], ans: [0, 1, 2] },
  { q: "5. Which characteristics apply to sound waves?", opts: ["They are mechanical waves.", "They propagate easily through a complete vacuum.", "They require a physical medium like air, water, or solids.", "They consist of alternating areas of compression and rarefaction."], ans: [0, 2, 3] },
  { q: "6. In a parallel electrical circuit, which of the following statements are TRUE?", opts: ["The voltage across each component is the same.", "The total current divides and flows through each branch independently.", "The current is exactly the same through all components.", "The total current is equal to the sum of the currents through each branch."], ans: [0, 1, 3] },
  { q: "7. The capacitance of a parallel-plate capacitor is influenced by which physical characteristics?", opts: ["The area of the plates", "The distance between the plates", "The dielectric material between the plates", "The temperature of the plates"], ans: [0, 1, 2] },
  { q: "8. A magnetic field can be created by which of the following?", opts: ["A moving electric charge", "An electric current flowing through a wire", "A completely stationary electric charge", "The inherent magnetic moments of magnets"], ans: [0, 1, 3] },
  { q: "9. According to Faraday's law of electromagnetic induction, the magnitude of the induced EMF depends directly on:", opts: ["The rate of change of magnetic flux", "The static resistance of the wire", "The presence of a stationary magnetic field", "Changing magnetic flux over time"], ans: [0, 3] },
  { q: "10. Which statements accurately describe convex (converging) lenses?", opts: ["They are thicker at the center and thinner at the edges.", "They cause parallel incoming light rays to diverge.", "They converge parallel incoming light rays into a focal point.", "They are primarily used in corrective eyeglasses for nearsightedness."], ans: [0, 2] },
  { q: "11. Constructive interference between two waves occurs when:", opts: ["The waves are completely out of phase.", "Their peaks and troughs align (in phase).", "They combine to produce a wave with a larger amplitude.", "The amplitudes of the waves subtract from each other."], ans: [1, 2] },
  { q: "12. Isotopes of a given element must have different numbers of:", opts: ["Protons", "Neutrons", "Electrons", "Leptons"], ans: [1] },
  { q: "13. Which of the following describe the plasma state of matter?", opts: ["It is highly ionized.", "It is electrically conductive.", "It occurs at extremely low temperatures close to absolute zero.", "It is often found in stars and lightning."], ans: [0, 1, 3] },
  { q: "14. Torque, considered the rotational counterpart to linear force, depends on:", opts: ["The applied force", "The perpendicular distance from the axis of rotation", "The angular velocity", "The moment of inertia"], ans: [0, 1, 3] },
  { q: "15. Gravitational potential energy near the Earth's surface depends on:", opts: ["The mass of the object", "The acceleration due to gravity", "The vertical height of the object from a reference point", "The velocity of the object"], ans: [0, 1, 2] },
  { q: "16. According to the foundational laws of thermodynamics:", opts: ["Energy cannot be created or destroyed in an isolated system.", "Entropy in an isolated system tends to increase over time.", "Absolute zero is easily attainable in laboratory conditions.", "Natural processes tend to move towards a state of greater disorder."], ans: [0, 1, 3] },
  { q: "17. Electric charges exhibit which of the following properties?", opts: ["Like charges repel each other.", "Opposite charges attract each other.", "Electric charge is conserved in a closed system.", "Charge can be continuously created without limit."], ans: [0, 1, 2] },
  { q: "18. Electric field lines have which of the following characteristics?", opts: ["They point radially outward from a positive charge.", "They point radially inward toward a negative charge.", "They indicate the direction of force on a positive test charge.", "Their strength increases as you move further from the charge."], ans: [0, 1, 2] },
  { q: "19. Alternating current (AC) is characterized by:", opts: ["Current that periodically changes direction and magnitude.", "A standard frequency of 50 Hz or 60 Hz in many countries.", "The ability to be easily transformed to different voltage levels.", "Current that flows continuously in only one direction."], ans: [0, 1, 2] },
  { q: "20. Electromagnetic waves:", opts: ["Require a physical material medium (like air or water) to propagate.", "Can travel easily through a vacuum.", "Can be reflected, refracted, and diffracted.", "Include visible light, radio waves, and X-rays."], ans: [1, 2, 3] },
  { q: "21. Diffraction of waves becomes highly significant when:", opts: ["A wave encounters an obstacle comparable in size to its wavelength.", "A wave passes through a narrow aperture comparable to its wavelength.", "The obstacle is vastly larger than the wavelength.", "The wave travels linearly in a perfect vacuum."], ans: [0, 1] },
  { q: "22. The period of a simple pendulum depends on:", opts: ["The mass of the pendulum bob", "The length of the pendulum", "The acceleration due to gravity", "The horizontal velocity of the bob"], ans: [1, 2] },
  { q: "23. In projectile motion (ignoring air resistance), the horizontal component of the motion:", opts: ["Remains completely constant.", "Is directly influenced by gravity.", "Follows a linear equation x = x0 + v0x * t.", "Accelerates downward at 9.8 m/s²."], ans: [0, 2] },
  { q: "24. In physics, work is done when:", opts: ["A force displaces an object in the direction of the force.", "Energy is successfully transferred.", "A force is applied, but the object remains perfectly stationary.", "The net work done changes the object's kinetic energy."], ans: [0, 1, 3] },
  { q: "25. Angular momentum is calculated as the product of:", opts: ["Moment of inertia", "Angular velocity", "Linear mass", "Tangential velocity"], ans: [0, 1] },
  { q: "26. Kirchhoff's circuit laws include:", opts: ["Kirchhoff's Current Law (KCL), which is based on the conservation of charge.", "Kirchhoff's Voltage Law (KVL), which is based on the conservation of energy.", "KCL, which states the algebraic sum of currents at any junction is zero.", "KVL, which states the sum of currents around any closed loop is zero."], ans: [0, 1, 2] },
  { q: "27. According to Ohm's Law and resistance formulas, the resistance of a conductor can be calculated using:", opts: ["R = V / I", "R = ρL / A", "R = P / V", "R = V * I"], ans: [0, 1] },
  { q: "28. When capacitors with different capacities are connected in series:", opts: ["All three of the capacitors have the same potential difference.", "The magnitude of the charge is the same on all of the capacitor plates.", "The capacitance depends on the voltage applied.", "The total equivalent capacitance decreases compared to the individual capacitors."], ans: [1, 3] },
  { q: "29. The behavior of an ideal gas assumes that:", opts: ["The gas particles are point-like.", "The particles interact strongly with each other via molecular forces.", "Collisions between particles are entirely elastic.", "The gas is extremely close to its condensation point."], ans: [0, 2] },
  { q: "30. Heat transfer can occur through which of the following mechanisms?", opts: ["Conduction (direct physical contact)", "Convection (movement of fluids)", "Radiation (electromagnetic waves)", "Electromagnetic Induction"], ans: [0, 1, 2] },
];

const MAX_SCORE = quizData.reduce((acc, q) => acc + q.ans.length * 3, 0);

export default function PhysicsMockTest() {
  const [selections, setSelections] = useState(() =>
    quizData.map(() => new Set())
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [animateScore, setAnimateScore] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  const toggle = (qIdx, optIdx) => {
    if (submitted) return;
    setSelections((prev) => {
      const next = prev.map((s) => new Set(s));
      next[qIdx].has(optIdx) ? next[qIdx].delete(optIdx) : next[qIdx].add(optIdx);
      return next;
    });
  };

  const handleSubmit = () => {
    let total = 0;
    quizData.forEach((item, i) => {
      item.opts.forEach((_, j) => {
        const checked = selections[i].has(j);
        const correct = item.ans.includes(j);
        if (checked && correct) total += 3;
        else if (checked && !correct) total -= 1;
      });
    });
    setScore(total);
    setSubmitted(true);
    setTimeout(() => {
      setAnimateScore(true);
      let start = 0;
      const end = total;
      const step = end > 0 ? Math.ceil(end / 40) : Math.floor(end / 40);
      const timer = setInterval(() => {
        start += step;
        if ((end >= 0 && start >= end) || (end < 0 && start <= end)) {
          setDisplayScore(end);
          clearInterval(timer);
        } else {
          setDisplayScore(start);
        }
      }, 18);
    }, 300);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const answeredCount = selections.filter((s) => s.size > 0).length;
  const progress = (answeredCount / quizData.length) * 100;

  const getGrade = (s) => {
    const pct = (s / MAX_SCORE) * 100;
    if (pct >= 85) return { label: "Outstanding", color: "#4ade80", emoji: "⚡" };
    if (pct >= 70) return { label: "Excellent", color: "#60a5fa", emoji: "🔭" };
    if (pct >= 55) return { label: "Good", color: "#a78bfa", emoji: "🧲" };
    if (pct >= 40) return { label: "Average", color: "#fbbf24", emoji: "⚗️" };
    return { label: "Needs Work", color: "#f87171", emoji: "📐" };
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f1117; }
        ::-webkit-scrollbar-thumb { background: #2a2d3a; border-radius: 3px; }

        .opt-label {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 11px 14px; border-radius: 8px;
          cursor: pointer; transition: all 0.18s ease;
          border: 1.5px solid transparent;
          background: rgba(255,255,255,0.03);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: #c8ccd8; line-height: 1.5;
          user-select: none;
        }
        .opt-label:hover:not(.disabled) { background: rgba(96,165,250,0.07); border-color: rgba(96,165,250,0.25); color: #e2e6f0; }
        .opt-label.selected { background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.4); color: #e2e6f0; }
        .opt-label.correct { background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.45); color: #d1fae5; }
        .opt-label.wrong { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.4); color: #fee2e2; }
        .opt-label.missed { background: rgba(251,191,36,0.07); border-color: rgba(251,191,36,0.35); color: #fef3c7; }
        .opt-label.disabled { cursor: default; }

        .checkbox-box {
          width: 18px; height: 18px; min-width: 18px; border-radius: 4px;
          border: 1.5px solid #3a3d4d; background: transparent;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          margin-top: 1px;
        }
        .opt-label.selected .checkbox-box,
        .opt-label.correct .checkbox-box { background: #60a5fa; border-color: #60a5fa; }
        .opt-label.correct .checkbox-box { background: #4ade80; border-color: #4ade80; }
        .opt-label.wrong .checkbox-box { background: #f87171; border-color: #f87171; }
        .opt-label.missed .checkbox-box { border-color: #fbbf24; }

        .submit-btn {
          width: 100%; padding: 16px;
          font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white; border: none; border-radius: 10px;
          cursor: pointer; transition: all 0.2s; margin-top: 28px;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(99,102,241,0.5); }
        .submit-btn:active { transform: translateY(0); }

        .q-block { animation: slideUp 0.4s ease both; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .score-reveal { animation: popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both; }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        .tag { animation: fadeIn 0.3s ease both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .progress-fill { transition: width 0.4s cubic-bezier(0.4,0,0.2,1); }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoRow}>
            <span style={styles.logoIcon}>⚛</span>
            <div>
              <div style={styles.logoTitle}>Physics Mock Test</div>
              <div style={styles.logoSub}>Supplementary Assessment · 30 Questions</div>
            </div>
          </div>
          <div style={styles.scoringBadge}>
            <span style={{ color: "#4ade80" }}>+3</span> correct &nbsp;·&nbsp; <span style={{ color: "#f87171" }}>−1</span> incorrect
          </div>
        </div>
        {/* Progress bar */}
        <div style={styles.progressWrap}>
          <div style={styles.progressTrack}>
            <div className="progress-fill" style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <span style={styles.progressLabel}>{answeredCount}/{quizData.length} attempted</span>
        </div>
      </div>

      {/* Score Banner */}
      {submitted && score !== null && (
        <div className="score-reveal" style={styles.scoreBanner}>
          <div style={styles.scoreBannerInner}>
            <div style={{ fontSize: 36 }}>{getGrade(score).emoji}</div>
            <div>
              <div style={{ ...styles.scoreValue, color: getGrade(score).color }}>
                {displayScore} <span style={styles.scoreMax}>/ {MAX_SCORE}</span>
              </div>
              <div style={{ ...styles.gradeLabel, color: getGrade(score).color }}>{getGrade(score).label}</div>
            </div>
          </div>
          <div style={styles.scoreMeta}>
            {(() => {
              let correct = 0, wrong = 0, missed = 0;
              quizData.forEach((item, i) => {
                item.opts.forEach((_, j) => {
                  const checked = selections[i].has(j);
                  const isAns = item.ans.includes(j);
                  if (checked && isAns) correct++;
                  else if (checked && !isAns) wrong++;
                  else if (!checked && isAns) missed++;
                });
              });
              return <>
                <span style={{ color: "#4ade80" }}>✓ {correct} correct</span>
                <span style={{ color: "#f87171" }}>✗ {wrong} wrong</span>
                <span style={{ color: "#fbbf24" }}>○ {missed} missed</span>
              </>;
            })()}
          </div>
        </div>
      )}

      {/* Questions */}
      <div style={styles.questions}>
        {quizData.map((item, qi) => (
          <div key={qi} className="q-block" style={{ ...styles.qBlock, animationDelay: `${qi * 0.03}s` }}>
            <div style={styles.qHeader}>
              <span style={styles.qNumber}>{qi + 1}</span>
              <span style={styles.qText}>{item.q.replace(/^\d+\.\s*/, "")}</span>
            </div>
            <div style={styles.opts}>
              {item.opts.map((opt, oi) => {
                const sel = selections[qi].has(oi);
                const isAns = item.ans.includes(oi);
                let cls = "opt-label";
                if (submitted) {
                  cls += " disabled";
                  if (sel && isAns) cls += " correct";
                  else if (sel && !isAns) cls += " wrong";
                  else if (!sel && isAns) cls += " missed";
                } else if (sel) {
                  cls += " selected";
                }
                return (
                  <label key={oi} className={cls} onClick={() => toggle(qi, oi)}>
                    <div className="checkbox-box">
                      {(sel || (submitted && isAns && !sel)) && (
                        <svg width="10" height="10" viewBox="0 0 10 10">
                          {sel && isAns && submitted
                            ? <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            : sel && !isAns && submitted
                            ? <><line x1="2" y1="2" x2="8" y2="8" stroke="white" strokeWidth="1.8" strokeLinecap="round" /><line x1="8" y1="2" x2="2" y2="8" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></>
                            : !sel && isAns && submitted
                            ? <circle cx="5" cy="5" r="2.5" fill="#fbbf24" />
                            : <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          }
                        </svg>
                      )}
                    </div>
                    <span style={{ flex: 1 }}>
                      <span style={styles.optLetter}>{String.fromCharCode(65 + oi)})</span> {opt}
                    </span>
                    {submitted && isAns && (
                      <span className="tag" style={{ ...styles.tag, background: sel ? "rgba(74,222,128,0.15)" : "rgba(251,191,36,0.12)", color: sel ? "#4ade80" : "#fbbf24", border: `1px solid ${sel ? "rgba(74,222,128,0.3)" : "rgba(251,191,36,0.25)"}` }}>
                        {sel ? "✓ Correct" : "Missed"}
                      </span>
                    )}
                    {submitted && sel && !isAns && (
                      <span className="tag" style={{ ...styles.tag, background: "rgba(248,113,113,0.12)", color: "#f87171", border: "1px solid rgba(248,113,113,0.25)" }}>
                        ✗ Wrong
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted && (
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Test →
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0b0d14",
    backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.12), transparent), radial-gradient(ellipse 50% 30% at 80% 100%, rgba(99,102,241,0.08), transparent)",
    fontFamily: "'DM Sans', sans-serif",
    color: "#c8ccd8",
  },
  header: {
    position: "sticky", top: 0, zIndex: 100,
    background: "rgba(11,13,20,0.92)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "0 20px",
  },
  headerInner: {
    maxWidth: 760, margin: "0 auto",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 0",
    gap: 16, flexWrap: "wrap",
  },
  logoRow: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { fontSize: 28, lineHeight: 1 },
  logoTitle: { fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: "#e2e6f0", letterSpacing: "0.5px" },
  logoSub: { fontSize: 11, color: "#5a5f75", marginTop: 2, letterSpacing: "0.3px" },
  scoringBadge: {
    fontFamily: "'Space Mono', monospace", fontSize: 11,
    color: "#5a5f75", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6,
    padding: "5px 10px", letterSpacing: "0.3px",
  },
  progressWrap: {
    maxWidth: 760, margin: "0 auto",
    display: "flex", alignItems: "center", gap: 12,
    paddingBottom: 12,
  },
  progressTrack: {
    flex: 1, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden",
  },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #3b82f6, #6366f1)", borderRadius: 2 },
  progressLabel: { fontSize: 11, color: "#4a4f62", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap" },

  scoreBanner: {
    maxWidth: 760, margin: "24px auto 0", padding: "0 20px",
  },
  scoreBannerInner: {
    display: "flex", alignItems: "center", gap: 20,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14, padding: "22px 28px",
  },
  scoreValue: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 40, fontWeight: 700, lineHeight: 1,
  },
  scoreMax: { fontSize: 20, color: "#3a3d4d", fontWeight: 400 },
  gradeLabel: { fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", marginTop: 6, fontWeight: 600 },
  scoreMeta: {
    display: "flex", gap: 20, padding: "12px 28px",
    fontFamily: "'Space Mono', monospace", fontSize: 12, flexWrap: "wrap",
  },

  questions: { maxWidth: 760, margin: "0 auto", padding: "24px 20px 60px" },
  qBlock: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12, padding: "20px 20px 16px",
    marginBottom: 14,
  },
  qHeader: { display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 },
  qNumber: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11, fontWeight: 700, color: "#3b82f6",
    background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
    borderRadius: 5, padding: "3px 8px", whiteSpace: "nowrap", marginTop: 1,
  },
  qText: { fontSize: 15, color: "#dde1ee", fontWeight: 500, lineHeight: 1.55 },
  opts: { display: "flex", flexDirection: "column", gap: 7 },
  optLetter: { fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4a4f62", marginRight: 4 },
  tag: {
    fontSize: 10, fontWeight: 700, letterSpacing: "0.5px",
    padding: "3px 7px", borderRadius: 5, whiteSpace: "nowrap",
    textTransform: "uppercase", alignSelf: "flex-start", marginTop: 2,
  },
};
