"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    // Target date: August 1, 2026 00:00:00 (Local time)
    const targetDate = new Date("2026-08-01T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // Simulate premium waitlist subscription interaction
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const waitlist = JSON.parse(localStorage.getItem("tusko_waitlist") || "[]");
      if (!waitlist.includes(email)) {
        waitlist.push(email);
        localStorage.setItem("tusko_waitlist", JSON.stringify(waitlist));
      }

      setStatus("success");
      setMessage("Successfully joined the TUSKO waitlist.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const formatNum = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2.5rem 1.5rem",
      position: "relative",
      zIndex: 1
    }}>
      {/* Dynamic Background Elements */}
      <div className="bg-decorations">
        <div className="bg-glow" />
        <div className="bg-grid" />
        <div className="bg-noise" />
      </div>

      {/* Top Header Logo */}
      <header className="fade-in-up delay-1" style={{ width: "100%", maxWidth: "1200px", display: "flex", justifyContent: "center" }}>
        <h1 style={{
          fontSize: "1.5rem",
          fontWeight: "800",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          borderBottom: "1px solid var(--border-muted)",
          paddingBottom: "8px",
          paddingLeft: "0.2em"
        }}>
          Tusko
        </h1>
      </header>

      {/* Center Main Section */}
      <section style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "800px",
        margin: "3rem 0"
      }}>
        {/* Launch Status Badge */}
        <div className="status-badge fade-in-up delay-2">
          <span className="status-dot" />
          Launching Soon
        </div>

        {/* Hero Title */}
        <h2 className="fade-in-up delay-2" style={{
          fontSize: "clamp(2rem, 5vw, 4rem)",
          lineHeight: "1.1",
          marginBottom: "1rem",
          fontWeight: "700"
        }}>
          Something bold is coming.
        </h2>

        {/* Subtitle description */}
        <p className="fade-in-up delay-2" style={{
          color: "var(--text-secondary)",
          fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
          maxWidth: "500px",
          lineHeight: "1.6",
          marginBottom: "1.5rem"
        }}>
          We are polishing the final details. Sign up for early access and stay tuned for the official countdown.
        </p>

        {/* Countdown Grid (displays placeholders on SSR, updates immediately on client mount) */}
        <div className="countdown-grid fade-in-up delay-3">
          <div className="countdown-card">
            <span className="countdown-num">
              {mounted ? formatNum(timeLeft.days) : "00"}
            </span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-card">
            <span className="countdown-num">
              {mounted ? formatNum(timeLeft.hours) : "00"}
            </span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-card">
            <span className="countdown-num">
              {mounted ? formatNum(timeLeft.minutes) : "00"}
            </span>
            <span className="countdown-label">Min</span>
          </div>
          <div className="countdown-card">
            <span className="countdown-num">
              {mounted ? formatNum(timeLeft.seconds) : "00"}
            </span>
            <span className="countdown-label">Sec</span>
          </div>
        </div>

        {/* Waitlist subscription form */}
        <form onSubmit={handleSubscribe} className="waitlist-form fade-in-up delay-4">
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email address"
              className="waitlist-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              className="waitlist-btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribed..." : "Notify Me"}
            </button>
          </div>
          {message && (
            <div className={`form-msg ${status === "success" ? "success" : "error"}`}>
              {status === "success" && "✓ "} {message}
            </div>
          )}
        </form>
      </section>

      {/* Footer Contact Section */}
      <footer className="fade-in-up delay-4" style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="contacts-section">
          <h3 className="contacts-section-title">Get in Touch</h3>
          <div className="contacts-grid">
            
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/94783008333"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card whatsapp"
            >
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label">WhatsApp</span>
                <span className="contact-value">078 300 8333</span>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:tusko.official@gmail.com"
              className="contact-card"
            >
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label">Email Us</span>
                <span className="contact-value" style={{ fontSize: "0.75rem", fontFamily: "var(--font-sans)", textTransform: "lowercase" }}>tusko.official@gmail.com</span>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+94783008333"
              className="contact-card call"
            >
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label">Call Us</span>
                <span className="contact-value">078 300 8333</span>
              </div>
            </a>
            
          </div>
        </div>

        {/* Copyright */}
        <p style={{
          color: "var(--text-muted)",
          fontSize: "0.7rem",
          letterSpacing: "0.05em",
          marginTop: "4.5rem",
          textTransform: "uppercase"
        }}>
          © {new Date().getFullYear()} TUSKO. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}
