"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import OrderForm from "@components/solar/OrderForm"
import {
  WHAT_IT_POWERS,
  FAQS,
  TESTIMONIALS,
} from "@components/solar/data"

const HERO_SLIDES = [
  {
    badge: "⚡ No Fuel. No Noise. No NEPA.",
    title: "Power Your Life",
    highlight: "24/7",
    desc: "Keep your business running, your food fresh, and your family comfortable — even when NEPA takes light.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/rs2.jpeg?updatedAt=1773828616435",
    cta: "Get Yours Now",
  },
  {
    badge: "☀️ Charge With Sunlight or NEPA",
    title: "Solar + Electric",
    highlight: "Dual Charging",
    desc: "Charge it with the included 30W solar panel during the day or plug into NEPA/generator at night. Always ready.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/solarnbg.jpeg?updatedAt=1773828616173",
    cta: "Order Today",
  },
  {
    badge: "🛡️ 6 Safety Protections Built-In",
    title: "Safe for Every",
    highlight: "Device You Own",
    desc: "Pure sine wave power protects your laptop, TV, and phone from damage. Run 6 devices at the same time.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/rs11.jpeg?updatedAt=1773828616175",
    cta: "See Full Specs",
  },
]

const CHARGE_METHODS = [
  {
    icon: "☀️",
    title: "Solar Panel",
    desc: "Set out the included 30W panel in sunlight. Fully charges in 6–8 hrs on a sunny day.",
    time: "6–8 hrs",
    color: "#ea580c",
  },
  {
    icon: "🔌",
    title: "NEPA / Grid",
    desc: "Plug into any wall socket using the AC adapter. Fast and reliable indoor charging.",
    time: "4–5 hrs",
    color: "#5208d4",
  },
  {
    icon: "⚙️",
    title: "Generator",
    desc: "Works with any generator output. Perfect for charging overnight with your gen.",
    time: "4–5 hrs",
    color: "#0891b2",
  },
]

const SPECS = [
  { label: "Battery Capacity", value: "144Wh" },
  { label: "AC Output", value: "110V/220V 150W" },
  { label: "Output Ports", value: "6 (2 AC + 2 USB + 2 DC)" },
  { label: "Solar Input", value: "5–20V (30W panel included)" },
  { label: "Transfer Time", value: "< 20ms" },
  { label: "Battery Type", value: "Lithium Iron Phosphate" },
  { label: "Weight", value: "4.2 kg" },
  { label: "Dimensions", value: "22 × 13 × 17 cm" },
  { label: "Working Temp", value: "-10°C to 40°C" },
  { label: "Safety Features", value: "6 protection layers" },
]

interface LandingPageProps {
  whatsappNumber: string
}

export default function LandingPage({ whatsappNumber }: LandingPageProps) {
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroAnim, setHeroAnim] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [slotsTaken, setSlotsTaken] = useState(3)
  const orderRef = useRef<HTMLDivElement>(null)

  const TOTAL_SLOTS = 5
  const STORAGE_KEY = "pvng_slots"

  // Daily reset logic
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10) // "2025-01-15"
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const { date, taken } = JSON.parse(stored)
        if (date === today) {
          // Same day — restore saved count
          setSlotsTaken(Math.min(taken, TOTAL_SLOTS))
        } else {
          // New day — reset to 3 (looks like 2 already taken overnight)
          const reset = { date: today, taken: 3 }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reset))
          setSlotsTaken(3)
        }
      } else {
        // First visit ever — initialise
        const init = { date: today, taken: 3 }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(init))
        setSlotsTaken(3)
      }
    } catch {
      // localStorage blocked (incognito etc) — just use default
      setSlotsTaken(3)
    }
  }, [])

  const incrementSlot = () => {
    setSlotsTaken((prev) => {
      const next = Math.min(prev + 1, TOTAL_SLOTS)
      try {
        const today = new Date().toISOString().slice(0, 10)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, taken: next }))
      } catch {}
      return next
    })
  }

  const slotsLeft = TOTAL_SLOTS - slotsTaken

  // Hero auto-slide
  useEffect(() => {
    const t = setInterval(() => {
      setHeroAnim(true)
      setTimeout(() => {
        setHeroIndex((p) => (p + 1) % HERO_SLIDES.length)
        setHeroAnim(false)
      }, 400)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  // Sticky CTA visibility
  useEffect(() => {
    const handler = () => setStickyVisible(window.scrollY > 500)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const slide = HERO_SLIDES[heroIndex]

  const scrollToOrder = () => {
    orderRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="landing-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .landing-root {
          font-family: 'Outfit', sans-serif;
          background: #060a12;
          color: #fff;
          overflow-x: hidden;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── HERO ── */
        .hero-section {
          position: relative;
          min-height: 100dvh;
          overflow: hidden;
          background: #060a12;
        }
        .hero-img {
          position: absolute;
          inset: 0;
          transition: opacity 0.5s ease;
        }
        .hero-img.fading { opacity: 0; }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(170deg, rgba(6,10,18,0.75) 0%, rgba(6,10,18,0.4) 45%, rgba(6,10,18,0.9) 100%);
          z-index: 1;
        }
        .hero-purple-orb {
          position: absolute;
          top: -80px; right: -80px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(82,8,212,0.35) 0%, transparent 70%);
          z-index: 1;
          pointer-events: none;
        }
        .hero-topbar {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px 0;
        }
        .hero-logo {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: #fff;
        }
        .hero-logo span { color: #ea580c; }
        .trust-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 5px 10px;
          font-size: 10px;
          color: rgba(255,255,255,0.75);
        }
        .trust-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0.35} }

        .hero-content {
          position: relative;
          z-index: 10;
          padding: 30px 20px 0;
        }
        .hero-slide-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(234,88,12,0.15);
          border: 1px solid rgba(234,88,12,0.3);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 600;
          color: #fdba74;
          margin-bottom: 16px;
          transition: opacity 0.4s;
        }
        .hero-slide-badge.fading { opacity: 0; }
        .hero-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(34px, 10vw, 46px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -1.5px;
          color: #fff;
          transition: opacity 0.4s, transform 0.4s;
        }
        .hero-h1.fading { opacity: 0; transform: translateY(10px); }
        .hero-highlight {
          font-family: 'Syne', sans-serif;
          font-size: clamp(34px, 10vw, 46px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -1.5px;
          background: linear-gradient(90deg, #ea580c, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          transition: opacity 0.4s, transform 0.4s;
        }
        .hero-highlight.fading { opacity: 0; transform: translateY(10px); }
        .hero-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.65;
          margin-bottom: 24px;
          max-width: 340px;
          transition: opacity 0.4s;
        }
        .hero-desc.fading { opacity: 0; }
        .hero-cta-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #ea580c, #c2410c);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          padding: 15px 24px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 8px 28px rgba(234,88,12,0.45);
          transition: transform 0.15s, box-shadow 0.15s;
          letter-spacing: 0.02em;
        }
        .btn-primary:active { transform: scale(0.97); }
        .btn-ghost {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8);
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 14px 24px;
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-ghost:active { background: rgba(255,255,255,0.1); }

        .hero-stats-strip {
          display: flex;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
        }
        .stat-item {
          flex: 1;
          padding: 12px 10px;
          text-align: center;
        }
        .stat-item + .stat-item { border-left: 1px solid rgba(255,255,255,0.07); }
        .stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #ea580c;
          line-height: 1;
          margin-bottom: 3px;
        }
        .stat-lbl {
          font-size: 9px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .hero-dots {
          position: absolute;
          bottom: 24px;
          left: 20px;
          z-index: 10;
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .hero-dot {
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.25);
          transition: all 0.4s;
          cursor: pointer;
        }
        .hero-dot.active { width: 24px; background: #ea580c; }
        .hero-dot:not(.active) { width: 8px; }

        /* ── PAIN BAR ── */
        .pain-bar {
          background: linear-gradient(135deg, #1a0a00, #0f0620);
          border-top: 1px solid rgba(234,88,12,0.2);
          border-bottom: 1px solid rgba(82,8,212,0.2);
          padding: 20px;
        }
        .pain-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pain-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          line-height: 1.5;
        }
        .pain-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }

        /* ── SECTION WRAPPER ── */
        .section {
          padding: 48px 20px;
        }
        .section-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #ea580c;
          margin-bottom: 8px;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 7vw, 32px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.8px;
          margin-bottom: 6px;
        }
        .section-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin-bottom: 28px;
        }

        /* ── WHAT IT POWERS ── */
        .powers-section {
          background: linear-gradient(180deg, #060a12 0%, #0d0820 100%);
        }
        .powers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .power-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: border-color 0.2s;
        }
        .power-card:hover { border-color: rgba(234,88,12,0.3); }
        .power-icon { font-size: 22px; margin-bottom: 4px; }
        .power-item { font-size: 13px; font-weight: 600; color: #fff; }
        .power-watts { font-size: 10px; color: rgba(255,255,255,0.35); }
        .power-hours {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 800;
          color: #ea580c;
          margin-top: 2px;
        }

        /* ── PRODUCT IMAGES ── */
        .product-images-section {
          background: #060a12;
          padding: 0 20px 48px;
        }
        .product-images-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .product-image-card {
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 1;
          position: relative;
          background: #111;
        }
        .product-image-card.wide {
          grid-column: span 2;
          aspect-ratio: 16/9;
        }

        /* ── HOW TO CHARGE ── */
        .charge-section {
          background: linear-gradient(180deg, #0d0820 0%, #060a12 100%);
        }
        .charge-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .charge-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 16px;
        }
        .charge-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .charge-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .charge-desc { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.55; }
        .charge-time {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 800;
          color: #ea580c;
          margin-top: 6px;
        }
        .charge-image-wrap {
          margin-top: 24px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 4/3;
          background: #111;
        }

        /* ── SPECS ── */
        .specs-section {
          background: #060a12;
        }
        .specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .spec-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 14px 12px;
        }
        .spec-label { font-size: 10px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
        .spec-value { font-size: 13px; font-weight: 700; color: #fff; line-height: 1.3; }

        /* ── TESTIMONIALS ── */
        .testimonials-section {
          background: linear-gradient(180deg, #060a12 0%, #0d0820 100%);
        }
        .testimonial-cards {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .testimonial-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 18px;
        }
        .testimonial-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .testimonial-name { font-size: 13px; font-weight: 700; color: #fff; }
        .testimonial-location { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .testimonial-tag {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 3px 8px;
          border-radius: 20px;
          background: rgba(82,8,212,0.2);
          border: 1px solid rgba(82,8,212,0.3);
          color: #a78bfa;
        }
        .testimonial-stars { color: #f59e0b; font-size: 13px; margin-bottom: 8px; }
        .testimonial-text { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.65; }

        /* ── SCARCITY BANNER ── */
        .scarcity-banner {
          background: linear-gradient(135deg, rgba(234,88,12,0.15), rgba(82,8,212,0.15));
          border: 1px solid rgba(234,88,12,0.3);
          border-radius: 18px;
          padding: 20px;
          margin: 0 20px;
          text-align: center;
        }
        .scarcity-fire { font-size: 28px; margin-bottom: 8px; }
        .scarcity-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 6px;
        }
        .scarcity-sub { font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 14px; line-height: 1.55; }
        .units-left {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(234,88,12,0.2);
          border: 1px solid rgba(234,88,12,0.4);
          border-radius: 10px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          color: #fdba74;
          margin-bottom: 16px;
        }
        .unit-dot { width: 8px; height: 8px; border-radius: 50%; background: #ea580c; animation: blink 1s infinite; }

        /* ── SLOTS PROGRESS ── */
        .slots-wrap { margin: 16px 0; }
        .slots-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .slots-label-left { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); }
        .slots-label-right { font-size: 12px; font-weight: 800; color: #ea580c; }
        .slots-track { display: flex; gap: 5px; }
        .slot-block { flex: 1; height: 8px; border-radius: 4px; transition: background 0.3s; }
        .slot-block.taken { background: #ea580c; }
        .slot-block.available { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.08); }
        .slots-sub { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 6px; text-align: center; }

        /* ── ORDER SECTION ── */
        .order-section {
          padding: 48px 20px;
          background: #060a12;
        }

        /* ── FAQ ── */
        .faq-section {
          background: linear-gradient(180deg, #0d0820 0%, #060a12 100%);
        }
        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .faq-q {
          width: 100%;
          background: none;
          border: none;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          padding: 16px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          line-height: 1.4;
        }
        .faq-chevron {
          font-size: 18px;
          color: #ea580c;
          flex-shrink: 0;
          transition: transform 0.25s;
        }
        .faq-chevron.open { transform: rotate(45deg); }
        .faq-a {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          padding-bottom: 16px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .faq-a.open { max-height: 300px; }

        /* ── FOOTER ── */
        .footer {
          background: #030608;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 28px 20px;
          text-align: center;
        }
        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
        }
        .footer-logo span { color: #ea580c; }
        .footer-text { font-size: 12px; color: rgba(255,255,255,0.3); line-height: 1.7; }

        /* ── STICKY CTA ── */
        .sticky-cta {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 100;
          background: linear-gradient(to top, rgba(6,10,18,1) 0%, rgba(6,10,18,0.95) 100%);
          border-top: 1px solid rgba(234,88,12,0.2);
          padding: 12px 20px 16px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          max-width: 480px;
          margin: 0 auto;
        }
        .sticky-cta.visible { transform: translateY(0); }
        .sticky-cta-btn {
          width: 100%;
          background: linear-gradient(135deg, #ea580c, #c2410c);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 15px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(234,88,12,0.45);
          letter-spacing: 0.02em;
        }
        .sticky-price {
          text-align: center;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-top: 6px;
        }
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0 20px;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className={`hero-img ${heroAnim ? "fading" : ""}`}>
          <Image src={slide.img} alt={slide.title} fill priority className="object-cover object-center" sizes="480px" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-purple-orb" />

        <div className="hero-topbar">
          <div className="hero-logo">Power<span>Volt</span> NG</div>
          <div className="trust-pill">
            <div className="trust-dot" />
            2,400+ Sold
          </div>
        </div>

        <div className="hero-content">
          <div className={`hero-slide-badge ${heroAnim ? "fading" : ""}`}>{slide.badge}</div>
          <div className={`hero-h1 ${heroAnim ? "fading" : ""}`}>{slide.title}</div>
          <div className={`hero-highlight ${heroAnim ? "fading" : ""}`}>{slide.highlight}</div>
          <p className={`hero-desc ${heroAnim ? "fading" : ""}`}>{slide.desc}</p>

          <div className="hero-cta-row">
            <button className="btn-primary" onClick={scrollToOrder}>
              {slide.cta} →
            </button>
            <button className="btn-ghost" onClick={scrollToOrder}>
              See Price & Details
            </button>
          </div>

          <div className="hero-stats-strip">
            <div className="stat-item">
              <div className="stat-val">144Wh</div>
              <div className="stat-lbl">Battery</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">6 Ports</div>
              <div className="stat-lbl">Outputs</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">Solar</div>
              <div className="stat-lbl">Charged</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">POD</div>
              <div className="stat-lbl">Lagos/ABJ</div>
            </div>
          </div>
        </div>

        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <div key={i} className={`hero-dot ${i === heroIndex ? "active" : ""}`} onClick={() => { setHeroAnim(true); setTimeout(() => { setHeroIndex(i); setHeroAnim(false); }, 400) }} />
          ))}
        </div>
      </section>

      {/* ── PAIN BAR ── */}
      <div className="pain-bar">
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#ea580c", marginBottom: 14 }}>
          Sound familiar?
        </p>
        <div className="pain-items">
          {[
            ["😤", "NEPA takes light and your fridge full of food starts warming up"],
            ["💸", "You spend ₦3,000–₦6,000 on fuel every week just to run a gen"],
            ["😰", "Your client calls during blackout and you can't take the Zoom meeting"],
            ["🥵", "No fan. No sleep. Sweating through another hot Abuja/Lagos night"],
          ].map(([icon, text]) => (
            <div key={text} className="pain-item">
              <span className="pain-icon">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(234,88,12,0.1)", borderRadius: 12, border: "1px solid rgba(234,88,12,0.2)" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#fdba74", lineHeight: 1.5 }}>
            The 150W Solar Power Station solves all of this — for less than 3 months of fuel costs.
          </p>
        </div>
      </div>

      {/* ── WHAT IT POWERS ── */}
      <section className="section powers-section">
        <p className="section-label">⚡ Power Everything</p>
        <h2 className="section-title">What You Can Run On It</h2>
        <p className="section-sub">One charge. Multiple devices. See exactly how long each one runs.</p>
        <div className="powers-grid">
          {WHAT_IT_POWERS.map((p) => (
            <div key={p.item} className="power-card">
              <div className="power-icon">{p.icon}</div>
              <div className="power-item">{p.item}</div>
              <div className="power-watts">{p.watts}</div>
              <div className="power-hours">{p.hours}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCT IMAGES ── */}
      <div className="product-images-section">
        <div className="product-images-grid">
          <div className="product-image-card wide">
            <Image src="https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/rs3.jpeg?updatedAt=1773828616272" alt="Solar Power Station" fill className="object-cover" sizes="440px" />
          </div>
          <div className="product-image-card">
            <Image src="https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/rs9.jpeg?updatedAt=1773828616270" alt="Power Station ports" fill className="object-cover" sizes="210px" />
          </div>
          <div className="product-image-card">
            <Image src="https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/rs10.jpeg?updatedAt=1773828616227" alt="Power Station display" fill className="object-cover" sizes="210px" />
          </div>
        </div>
      </div>

      {/* ── HOW TO CHARGE ── */}
      <section className="section charge-section">
        <p className="section-label">🔋 Charging Guide</p>
        <h2 className="section-title">3 Ways to Charge It</h2>
        <p className="section-sub">No light? No problem. Solar keeps it alive even without NEPA or a generator.</p>
        <div className="charge-cards">
          {CHARGE_METHODS.map((m) => (
            <div key={m.title} className="charge-card">
              <div className="charge-icon-wrap" style={{ background: m.color + "22" }}>
                <span>{m.icon}</span>
              </div>
              <div>
                <div className="charge-title">{m.title}</div>
                <div className="charge-desc">{m.desc}</div>
                <div className="charge-time">⏱ {m.time} to full charge</div>
              </div>
            </div>
          ))}
        </div>
        <div className="charge-image-wrap">
          <Image
            src="https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/how%20to%20charge%20itsolar.jpeg"
            alt="How to charge the solar power station"
            fill
            className="object-cover"
            sizes="440px"
          />
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="section specs-section">
        <p className="section-label">🔩 Technical Specs</p>
        <h2 className="section-title">Built to Last</h2>
        <p className="section-sub">Military-grade lithium iron phosphate battery. 6 safety protections. Pure sine wave output.</p>
        <div className="specs-grid">
          {SPECS.map((s) => (
            <div key={s.label} className="spec-card">
              <div className="spec-label">{s.label}</div>
              <div className="spec-value">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <p className="section-label">⭐ Real Customers</p>
        <h2 className="section-title">What Nigerians Are Saying</h2>
        <p className="section-sub">Over 2,400 units delivered. These are a few stories.</p>
        <div className="testimonial-cards">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="testimonial-top">
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-location">📍 {t.location}</div>
                </div>
                <div className="testimonial-tag">{t.tag}</div>
              </div>
              <div className="testimonial-stars">{"★".repeat(t.stars)}</div>
              <div className="testimonial-text">"{t.text}"</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCARCITY BANNER ── */}
      <div className="scarcity-banner">
        <div className="scarcity-fire">🔥</div>
        <div className="scarcity-title">We Only Process 5 Orders Per Day</div>
        <div className="scarcity-sub">
          Due to high demand, our dispatch team handles a maximum of 5 deliveries daily — so every order gets personal attention and proper packing. Today's slots are filling fast.
        </div>

        {/* Live slot progress bar */}
        <div className="slots-wrap">
          <div className="slots-label">
            <span className="slots-label-left">Today's delivery slots</span>
            <span className="slots-label-right">{slotsTaken} of {TOTAL_SLOTS} taken</span>
          </div>
          <div className="slots-track">
            {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
              <div key={i} className={`slot-block ${i < slotsTaken ? "taken" : "available"}`} />
            ))}
          </div>
          <div className="slots-sub">Slots reset every morning at 8am</div>
        </div>

        <div className="units-left">
          <div className="unit-dot" />
          {slotsLeft > 0
            ? `Only ${slotsLeft} slot${slotsLeft === 1 ? "" : "s"} remaining for today`
            : "Today's slots are full — join the waitlist below"}
        </div>
        <button className="btn-primary" style={{ width: "100%" }} onClick={scrollToOrder}>
          Secure My Slot Now →
        </button>
      </div>

      {/* ── ORDER FORM ── */}
      <div ref={orderRef} className="order-section">
        <p className="section-label">📦 Secure Your Slot</p>
        <h2 className="section-title" style={{ marginBottom: 4 }}>
          {slotsLeft > 0 ? `Only ${slotsLeft} Slot${slotsLeft === 1 ? "" : "s"} Left Today` : "Join Tomorrow's Waitlist"}
        </h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 24, lineHeight: 1.6 }}>
          We limit to 5 orders per day so every customer gets personal attention. Lagos & Abuja: pay on delivery. Other states: pay before dispatch. 2,400+ Nigerians already powered up.
        </p>
        <OrderForm whatsappNumber={whatsappNumber} onOrderPlaced={incrementSlot} slotsLeft={slotsLeft} />
      </div>

      {/* ── FAQ ── */}
      <section className="section faq-section">
        <p className="section-label">❓ Questions</p>
        <h2 className="section-title">Frequently Asked</h2>
        <p className="section-sub" style={{ marginBottom: 8 }}>Everything you need to know before ordering.</p>
        <div>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className={`faq-chevron ${openFaq === i ? "open" : ""}`}>+</span>
              </button>
              <div className={`faq-a ${openFaq === i ? "open" : ""}`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">Power<span>Volt</span> NG</div>
        <div className="footer-text">
          150W Portable Solar Power Station<br />
          Delivering across all 36 states in Nigeria<br />
          Pay on Delivery available in Lagos & Abuja<br /><br />
          © {new Date().getFullYear()} PowerVolt NG. All rights reserved.
        </div>
      </footer>

      {/* ── STICKY CTA ── */}
      <div className={`sticky-cta ${stickyVisible ? "visible" : ""}`}>
        <button className="sticky-cta-btn" onClick={scrollToOrder}>
          ⚡ Secure My Slot — {slotsLeft > 0 ? `${slotsLeft} Left Today` : "Join Waitlist"}
        </button>
        <div className="sticky-price">From ₦145,000 · Free delivery · POD in Lagos & Abuja</div>
      </div>
    </main>
  )
}