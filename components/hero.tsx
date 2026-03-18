"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Slide {
  badge: string;
  title: string;
  highlight: string;
  desc: string;
  img: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stat: string;
  statLabel: string;
}

const slides: Slide[] = [
  {
    badge: "💰 For Business Owners",
    title: "Make Money",
    highlight: "During Blackout",
    desc: "Keep your business running and earning even when others are in total darkness.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/phonecharger.png",
    ctaPrimary: "Start Earning Now",
    ctaSecondary: "See How It Works",
    stat: "12hrs+",
    statLabel: "Battery Life",
  },
  {
    badge: "💻 For Freelancers",
    title: "Work Without",
    highlight: "Interruption",
    desc: "Stay productive with steady power for your laptop, fan, and all your devices.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/freelancer.png",
    ctaPrimary: "Stay Online Always",
    ctaSecondary: "View Specs",
    stat: "5-in-1",
    statLabel: "Output Ports",
  },
  {
    badge: "🛒 For Shop Owners",
    title: "Protect Your",
    highlight: "Goods & Profits",
    desc: "Keep your fridge and display lights on. No more spoiled stock, no more losses.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/plugfridge.png",
    ctaPrimary: "Protect My Goods",
    ctaSecondary: "Learn More",
    stat: "Solar",
    statLabel: "Rechargeable",
  },
];

export default function Hero() {
  const [index, setIndex] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => {
    if (i === index || animating) return;
    setPrevIndex(index);
    setAnimating(true);
    setTimeout(() => {
      setIndex(i);
      setAnimating(false);
    }, 400);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPrevIndex((prev) => prev);
      setIndex((prev) => {
        const next = (prev + 1) % slides.length;
        setPrevIndex(prev);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 400);
        return next;
      });
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slide = slides[index];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        .hero-root * { box-sizing: border-box; }

        .hero-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          width: 100%;
          min-height: 100dvh;
          overflow: hidden;
          background: #0a0614;
        }

        /* Background image layer */
        .hero-bg {
          position: absolute;
          inset: 0;
          transition: opacity 0.6s ease;
        }
        .hero-bg.fade-out { opacity: 0; }
        .hero-bg.fade-in { opacity: 1; }

        /* Layered overlays */
        .hero-overlay-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(10,6,20,0.85) 0%,
            rgba(10,6,20,0.55) 50%,
            rgba(10,6,20,0.80) 100%
          );
          z-index: 1;
        }
        .hero-overlay-accent {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 60% 50% at 80% 20%,
            rgba(82,8,212,0.35) 0%,
            transparent 70%
          );
          z-index: 2;
        }
        .hero-overlay-orange {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: linear-gradient(to top, rgba(234,88,12,0.18) 0%, transparent 100%);
          z-index: 2;
        }

        /* Noise texture overlay */
        .hero-noise {
          position: absolute;
          inset: 0;
          z-index: 3;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        /* Top bar */
        .hero-topbar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px 0;
        }
        .hero-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: #fff;
          letter-spacing: -0.3px;
        }
        .hero-logo span { color: #ea580c; }
        .hero-trust-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 5px 10px;
          font-size: 10px;
          color: rgba(255,255,255,0.75);
          backdrop-filter: blur(8px);
        }
        .trust-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Main content */
        .hero-content {
          position: relative;
          z-index: 10;
          padding: 28px 20px 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Slide badge */
        .slide-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(234,88,12,0.15);
          border: 1px solid rgba(234,88,12,0.35);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 500;
          color: #fdba74;
          margin-bottom: 16px;
          width: fit-content;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .slide-badge.animating { opacity: 0; transform: translateY(-8px); }

        /* Headline */
        .hero-headline {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 10vw, 44px);
          line-height: 1.05;
          color: #fff;
          letter-spacing: -1.5px;
          margin-bottom: 4px;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .hero-headline.animating { opacity: 0; transform: translateY(12px); }

        .hero-headline-highlight {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 10vw, 44px);
          line-height: 1.05;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
          background: linear-gradient(90deg, #ea580c, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .hero-headline-highlight.animating { opacity: 0; transform: translateY(12px); }

        /* Description */
        .hero-desc {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
          margin-bottom: 24px;
          max-width: 340px;
          transition: opacity 0.4s ease;
        }
        .hero-desc.animating { opacity: 0; }

        /* CTA Buttons */
        .hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #ea580c, #c2410c);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(234,88,12,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          letter-spacing: 0.1px;
        }
        .btn-primary:active {
          transform: scale(0.97);
          box-shadow: 0 4px 12px rgba(234,88,12,0.3);
        }
        .btn-primary svg { flex-shrink: 0; }

        .btn-secondary {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 14px 24px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: background 0.2s ease, border-color 0.2s ease;
          letter-spacing: 0.1px;
        }
        .btn-secondary:active { background: rgba(255,255,255,0.1); }

        /* Stats row */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          margin-bottom: 28px;
          transition: opacity 0.4s ease;
        }
        .hero-stats.animating { opacity: 0; }
        .stat-item {
          flex: 1;
          padding: 12px 14px;
          text-align: center;
        }
        .stat-item + .stat-item {
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #ea580c;
          line-height: 1;
          margin-bottom: 3px;
        }
        .stat-label {
          font-size: 9px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        /* Tagline */
        .hero-tagline {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .tagline-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(to right, rgba(255,255,255,0.12), transparent);
        }
        .tagline-text {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          white-space: nowrap;
        }

        /* Bottom indicators */
        .hero-bottom {
          position: absolute;
          bottom: 24px;
          left: 20px;
          right: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hero-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-dot {
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.25);
          transition: all 0.4s ease;
          cursor: pointer;
        }
        .hero-dot.active {
          width: 24px;
          background: #ea580c;
        }
        .hero-dot:not(.active) { width: 8px; }

        .hero-slide-count {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.5px;
        }
        .hero-slide-count span { color: rgba(255,255,255,0.7); }

        /* Purple accent orb */
        .accent-orb {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(82,8,212,0.4) 0%, transparent 70%);
          z-index: 1;
          pointer-events: none;
        }

        /* Orange corner accent */
        .corner-accent {
          position: absolute;
          bottom: 80px;
          right: -30px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234,88,12,0.25) 0%, transparent 70%);
          z-index: 1;
          pointer-events: none;
        }
      `}</style>

      <section className="hero-root">
        {/* Background image */}
        <div className={`hero-bg ${animating ? "fade-out" : "fade-in"}`}>
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Overlays */}
        <div className="hero-overlay-base" />
        <div className="hero-overlay-accent" />
        <div className="hero-overlay-orange" />
        <div className="hero-noise" />

        {/* Decorative orbs */}
        <div className="accent-orb" />
        <div className="corner-accent" />

        {/* Top bar */}
        <div className="hero-topbar">
          <div className="hero-logo">
            Power<span>Volt</span> NG
          </div>
          <div className="hero-trust-badge">
            <div className="trust-dot" />
            2,400+ Sold
          </div>
        </div>

        {/* Main content */}
        <div className="hero-content">
          <div className={`slide-badge ${animating ? "animating" : ""}`}>
            {slide.badge}
          </div>

          <div className={`hero-headline ${animating ? "animating" : ""}`}>
            {slide.title}
          </div>
          <div className={`hero-headline-highlight ${animating ? "animating" : ""}`}>
            {slide.highlight}
          </div>

          <p className={`hero-desc ${animating ? "animating" : ""}`}>
            {slide.desc}
          </p>

          <div className="hero-ctas">
            <button className="btn-primary">
              {slide.ctaPrimary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn-secondary">{slide.ctaSecondary}</button>
          </div>

          {/* Stats */}
          <div className={`hero-stats ${animating ? "animating" : ""}`}>
            <div className="stat-item">
              <div className="stat-value">{slide.stat}</div>
              <div className="stat-label">{slide.statLabel}</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">Solar</div>
              <div className="stat-label">Powered</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0db</div>
              <div className="stat-label">Silent</div>
            </div>
          </div>

          {/* Tagline */}
          <div className="hero-tagline">
            <div className="tagline-line" />
            <span className="tagline-text">No Fuel · No Noise · No Stress</span>
            <div className="tagline-line" style={{ background: "linear-gradient(to left, rgba(255,255,255,0.12), transparent)" }} />
          </div>
        </div>

        {/* Bottom indicators */}
        <div className="hero-bottom">
          <div className="hero-dots">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`hero-dot ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="hero-slide-count">
            <span>{String(index + 1).padStart(2, "0")}</span> / {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </section>
    </>
  );
}