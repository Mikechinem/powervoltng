"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import OrderForm from "@components/solar/OrderForm"
import { WHAT_IT_POWERS, FAQS, TESTIMONIALS } from "@components/solar/data"

const HERO_SLIDES = [
  {
    badge: "⚡ No Fuel. No Noise. No NEPA.",
    title: "Power Your Life",
    highlight: "24/7",
    desc: "Keep your business running, your food fresh, and your family comfortable — even when NEPA takes light.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/hero.x1/hero1.png",
    cta: "Get Yours Now",
  },
  {
    badge: "☀️ Charge With Sunlight or NEPA",
    title: "Solar + Electric",
    highlight: "Dual Charging",
    desc: "Charge it with the included 30W solar panel during the day or plug into NEPA/generator at night. Always ready.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/hero.x1/hero3.png",
    cta: "Order Today",
  },
  {
    badge: "🛡️ 6 Safety Protections Built-In",
    title: "Safe for Every",
    highlight: "Device You Own",
    desc: "Pure sine wave power protects your laptop, TV, and phone from damage. Run 6 devices at the same time.",
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/hero.x1/hero2.png",
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

const ICP_CARDS = [
  {
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/usecase_powerstation/shopowner_usecase.png",
    role: "Shop Owner",
    emoji: "🏪",
    pain: "Customers leave, POS goes off, fridge warms up every time NEPA takes light",
    benefit: "Keep your shop open, sales running, and fridge cold — zero fuel cost",
    color: "#ea580c",
  },
  {
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/usecase_powerstation/freelancer_usecase.png",
    role: "Freelancer / Remote Worker",
    emoji: "💻",
    pain: "Missed deadlines, dropped Zoom calls, and lost clients because of blackout",
    benefit: "Full work sessions — laptop, router, and phone all powered without interruption",
    color: "#5208d4",
  },
  {
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/usecase_powerstation/family_timeusecase.png",
    role: "Family & Household",
    emoji: "👨‍👩‍👧",
    pain: "Kids can't study at night, food spoils, no fan in the heat, unsafe darkness",
    benefit: "Lights, fan, TV, and charging for the whole family — normal life during outages",
    color: "#0891b2",
  },
  {
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/usecase_powerstation/healthcare_usecase.png",
    role: "Home Healthcare",
    emoji: "🏥",
    pain: "CPAP machines, nebulizers, and medical equipment going off during outages",
    benefit: "Pure sine wave output — safe for every sensitive medical device at home",
    color: "#059669",
  },
  {
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/usecase_powerstation/contentcreator_usecase.png",
    role: "Content Creator",
    emoji: "📸",
    pain: "Ring lights, cameras, and laptops dying mid-shoot or during a live session",
    benefit: "Mobile studio power anywhere — no wall socket needed, shoot anywhere",
    color: "#7c3aed",
  },
  {
    img: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/usecase_powerstation/outdoor_traveller_usecase.png",
    role: "Traveller / Camper",
    emoji: "🚗",
    pain: "Long road trips and outdoor events with no power access for devices",
    benefit: "Portable, lightweight, solar rechargeable — power on the go, anywhere in Nigeria",
    color: "#d97706",
  },
]

const PRODUCT_IMAGES = [
  { src: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/rs10.jpeg?updatedAt=1773828616227", alt: "Solar Power Station — full view" },
  { src: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/nwrs1.png", alt: "Power Station ports" },
  { src: "https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/chargewithsolar.png", alt: "Power Station charging" },
]

const TOTAL_SLOTS = 5
const STORAGE_KEY = "pvng_slots"

function getBusinessDayKey(): string {
  const now = new Date()
  if (now.getHours() < 8) {
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday.toISOString().slice(0, 10)
  }
  return now.toISOString().slice(0, 10)
}

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

  useEffect(() => {
    const dayKey = getBusinessDayKey()
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const { date, taken } = JSON.parse(stored)
        if (date === dayKey) {
          setSlotsTaken(Math.min(taken, TOTAL_SLOTS))
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: dayKey, taken: 3 }))
          setSlotsTaken(3)
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: dayKey, taken: 3 }))
        setSlotsTaken(3)
      }
    } catch {
      setSlotsTaken(3)
    }
  }, [])

  const incrementSlot = () => {
    setSlotsTaken((prev) => {
      const next = Math.min(prev + 1, TOTAL_SLOTS)
      try {
        const dayKey = getBusinessDayKey()
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: dayKey, taken: next }))
      } catch {}
      return next
    })
  }

  const slotsLeft = TOTAL_SLOTS - slotsTaken

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

  useEffect(() => {
    const handler = () => setStickyVisible(window.scrollY > 500)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const slide = HERO_SLIDES[heroIndex]
  const scrollToOrder = () => orderRef.current?.scrollIntoView({ behavior: "smooth" })

  return (
    <main className="landing-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .landing-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #080e1a;
          color: #fff;
          overflow-x: hidden;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── HERO ── */
        .hero-section {
          position: relative;
          background: #080e1a;
          overflow: hidden;
        }
        .hero-topbar {
          position: relative; z-index: 10;
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 20px 0;
        }
        .hero-logo {
          font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.3px;
        }
        .hero-logo span { color: #ea580c; }
        .trust-pill {
          display: flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.14);
          border-radius: 20px; padding: 6px 12px;
          font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.82);
        }
        .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }

        /* Hero content above image */
        .hero-content-top {
          position: relative; z-index: 10;
          padding: 28px 20px 20px;
        }
        .hero-slide-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(234,88,12,0.15); border: 1px solid rgba(234,88,12,0.3);
          border-radius: 20px; padding: 6px 14px;
          font-size: 12px; font-weight: 600; color: #fdba74;
          margin-bottom: 16px; transition: opacity 0.4s;
        }
        .hero-slide-badge.fading { opacity: 0; }
        .hero-h1 {
          font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(34px, 10vw, 46px);
          font-weight: 700; line-height: 1.08; letter-spacing: -1px; color: #fff;
          transition: opacity 0.4s, transform 0.4s;
        }
        .hero-h1.fading { opacity: 0; transform: translateY(10px); }
        .hero-highlight {
          font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(34px, 10vw, 46px);
          font-weight: 700; line-height: 1.08; letter-spacing: -1px;
          background: linear-gradient(90deg, #ea580c, #f97316);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 14px; transition: opacity 0.4s, transform 0.4s;
        }
        .hero-highlight.fading { opacity: 0; transform: translateY(10px); }
        .hero-desc {
          font-size: 15px; font-weight: 400;
          color: rgba(255,255,255,0.75); line-height: 1.75;
          margin-bottom: 22px; transition: opacity 0.4s;
        }
        .hero-desc.fading { opacity: 0; }

        /* Hero image — on page, not background */
        .hero-image-wrap {
          position: relative;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        .hero-image-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(to top, #080e1a, transparent);
          pointer-events: none;
        }
        .hero-image-fade {
          transition: opacity 0.5s ease;
        }
        .hero-image-fade.fading { opacity: 0; }

        /* Hero content below image */
        .hero-content-bottom {
          padding: 0 20px 28px;
          position: relative; z-index: 10;
          margin-top: -32px;
        }
        .hero-cta-row { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .btn-primary {
          background: linear-gradient(135deg, #ea580c, #c2410c); color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700;
          padding: 15px 24px; border: none; border-radius: 12px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 8px 28px rgba(234,88,12,0.45); transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-primary:active { transform: scale(0.97); }
        .btn-ghost {
          background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.85);
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 600;
          padding: 14px 24px; border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 12px; cursor: pointer; transition: background 0.2s;
        }
        .hero-stats-strip {
          display: flex; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 14px;
          overflow: hidden; backdrop-filter: blur(8px);
        }
        .stat-item { flex: 1; padding: 13px 10px; text-align: center; }
        .stat-item + .stat-item { border-left: 1px solid rgba(255,255,255,0.08); }
        .stat-val {
          font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
          font-size: 17px; font-weight: 700; color: #ea580c; line-height: 1; margin-bottom: 4px;
        }
        .stat-lbl { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.07em; }
        .hero-dots { display: flex; gap: 6px; align-items: center; justify-content: center; padding: 20px 0 4px; }
        .hero-dot { height: 3px; border-radius: 2px; background: rgba(255,255,255,0.25); transition: all 0.4s; cursor: pointer; }
        .hero-dot.active { width: 24px; background: #ea580c; }
        .hero-dot:not(.active) { width: 8px; }

        /* ── PAIN BAR ── */
        .pain-bar {
          background: linear-gradient(135deg, #150800, #0d0518);
          border-top: 1px solid rgba(234,88,12,0.2); border-bottom: 1px solid rgba(82,8,212,0.2);
          padding: 24px 20px;
        }
        .pain-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.13em; color: #ea580c; margin-bottom: 16px; }
        .pain-items { display: flex; flex-direction: column; gap: 12px; }
        .pain-item { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.82); line-height: 1.6; }
        .pain-icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; }
        .pain-callout { margin-top: 18px; padding: 14px 16px; background: rgba(234,88,12,0.1); border-radius: 12px; border: 1px solid rgba(234,88,12,0.22); font-size: 15px; font-weight: 600; color: #fdba74; line-height: 1.65; }

        /* ── SECTIONS ── */
        .section { padding: 52px 20px; }
        .section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #ea580c; margin-bottom: 10px; }
        .section-title {
          font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(26px, 7.5vw, 34px); font-weight: 700;
          line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 10px; color: #fff;
        }
        .section-sub { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.68); line-height: 1.75; margin-bottom: 28px; }

        /* ── ICP SECTION ── */
        .icp-section { background: linear-gradient(180deg, #080e1a 0%, #0c0820 100%); }
        .icp-grid { display: flex; flex-direction: column; gap: 16px; }
        .icp-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 20px; overflow: hidden; }
        .icp-image-wrap { width: 100%; background: #0d1520; }
        .icp-body { padding: 18px 18px 20px; }
        .icp-role-row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .icp-emoji { font-size: 20px; }
        .icp-role { font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif; font-size: 17px; font-weight: 700; }
        .icp-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 12px 0; }
        .icp-pain-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #f87171; margin-bottom: 5px; }
        .icp-pain { font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.65); line-height: 1.65; margin-bottom: 14px; }
        .icp-benefit-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #34d399; margin-bottom: 5px; }
        .icp-benefit { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.65; }

        /* ── WHAT IT POWERS ── */
        .powers-section { background: linear-gradient(180deg, #0c0820 0%, #080e1a 100%); }
        .powers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .power-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 14px; padding: 16px 14px; display: flex; flex-direction: column; gap: 4px; }
        .power-icon { font-size: 24px; margin-bottom: 6px; }
        .power-item { font-size: 14px; font-weight: 600; color: #fff; }
        .power-watts { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.45); margin-top: 1px; }
        .power-hours { font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: #ea580c; margin-top: 4px; }

        /* ── FREE SOCKET BONUS ── */
        .bonus-section {
          background: linear-gradient(135deg, #0f1a08, #080e1a);
          border-top: 1px solid rgba(134,197,94,0.15);
          border-bottom: 1px solid rgba(134,197,94,0.15);
          padding: 40px 20px;
        }
        .bonus-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(134,197,94,0.12); border: 1px solid rgba(134,197,94,0.3);
          border-radius: 20px; padding: 6px 14px;
          font-size: 11px; font-weight: 700; color: #86efac;
          text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px;
        }
        .bonus-title {
          font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(24px, 7vw, 30px); font-weight: 700;
          color: #fff; line-height: 1.2; margin-bottom: 10px;
        }
        .bonus-title span { color: #86efac; }
        .bonus-sub { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.68); line-height: 1.75; margin-bottom: 24px; }
        .bonus-image-wrap {
          background: #0d1a10;
          border: 1px solid rgba(134,197,94,0.15);
          border-radius: 18px;
          overflow: hidden;
        }
        .bonus-cta-row { display: flex; align-items: center; gap: 10px; margin-top: 20px; }
        .bonus-cta-text { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.55); line-height: 1.5; }
        .bonus-cta-text strong { color: #86efac; }

        /* ── HOW TO CHARGE ── */
        .charge-section { background: linear-gradient(180deg, #080e1a 0%, #0c0d22 100%); }
        .charge-cards { display: flex; flex-direction: column; gap: 12px; }
        .charge-card { display: flex; align-items: flex-start; gap: 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; padding: 18px; }
        .charge-icon-wrap { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .charge-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 5px; }
        .charge-desc { font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.68); line-height: 1.65; }
        .charge-time { font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: #ea580c; margin-top: 8px; }

        /* ── SPECS ── */
        .specs-section { background: #080e1a; }
        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .spec-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 12px; padding: 16px 14px; }
        .spec-label { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 5px; }
        .spec-value { font-size: 14px; font-weight: 700; color: #fff; line-height: 1.35; }

        /* ── TESTIMONIALS ── */
        .testimonials-section { background: linear-gradient(180deg, #080e1a 0%, #0c0d22 100%); }
        .testimonial-cards { display: flex; flex-direction: column; gap: 14px; }
        .testimonial-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 18px; padding: 20px; }
        .testimonial-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .testimonial-name { font-size: 14px; font-weight: 700; color: #fff; }
        .testimonial-location { font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.5); margin-top: 2px; }
        .testimonial-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 9px; border-radius: 20px; background: rgba(82,8,212,0.2); border: 1px solid rgba(82,8,212,0.3); color: #a78bfa; white-space: nowrap; }
        .testimonial-stars { color: #f59e0b; font-size: 14px; margin-bottom: 10px; }
        .testimonial-text { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.82); line-height: 1.75; }

        /* ── GUARANTEE ── */
        .guarantee-section {
          background: linear-gradient(135deg, #051a0f, #080e1a);
          border-top: 1px solid rgba(34,197,94,0.15);
          border-bottom: 1px solid rgba(34,197,94,0.15);
          padding: 40px 20px;
          text-align: center;
        }
        .guarantee-badge { width: 80px; height: 80px; border-radius: 50%; background: rgba(34,197,94,0.12); border: 2px solid rgba(34,197,94,0.35); display: flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto 20px; }
        .guarantee-title { font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .guarantee-sub { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.68); line-height: 1.75; margin-bottom: 24px; }
        .guarantee-items { display: flex; flex-direction: column; gap: 12px; text-align: left; }
        .guarantee-item-row { display: flex; align-items: flex-start; gap: 12px; }
        .guarantee-check { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
        .guarantee-item-text { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.78); line-height: 1.6; }

        /* ── SCARCITY BANNER ── */
        .scarcity-wrap { padding: 48px 20px 0; }
        .scarcity-banner { background: linear-gradient(135deg, rgba(234,88,12,0.14), rgba(82,8,212,0.14)); border: 1px solid rgba(234,88,12,0.3); border-radius: 18px; padding: 22px 20px; text-align: center; }
        .scarcity-fire { font-size: 30px; margin-bottom: 10px; }
        .scarcity-title { font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .scarcity-sub { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.68); margin-bottom: 16px; line-height: 1.7; }
        .units-left { display: inline-flex; align-items: center; gap: 8px; background: rgba(234,88,12,0.18); border: 1px solid rgba(234,88,12,0.38); border-radius: 10px; padding: 9px 16px; font-size: 14px; font-weight: 700; color: #fdba74; margin-bottom: 16px; }
        .unit-dot { width: 8px; height: 8px; border-radius: 50%; background: #ea580c; animation: blink 1s infinite; }
        .slots-wrap { margin: 16px 0; }
        .slots-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 9px; }
        .slots-label-left { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.75); }
        .slots-label-right { font-size: 13px; font-weight: 700; color: #ea580c; }
        .slots-track { display: flex; gap: 5px; }
        .slot-block { flex: 1; height: 8px; border-radius: 4px; transition: background 0.4s; }
        .slot-block.taken { background: #ea580c; }
        .slot-block.available { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.08); }
        .slots-sub { font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.45); margin-top: 7px; text-align: center; }

        /* ── ORDER SECTION ── */
        .order-section { padding: 52px 20px; background: #080e1a; }
        .order-intro-text { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.62); margin-bottom: 24px; line-height: 1.75; }

        /* ── FAQ ── */
        .faq-section { background: linear-gradient(180deg, #0c0d22 0%, #080e1a 100%); }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .faq-q { width: 100%; background: none; border: none; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 600; text-align: left; padding: 18px 0; display: flex; justify-content: space-between; align-items: center; gap: 12px; cursor: pointer; line-height: 1.5; }
        .faq-chevron { font-size: 20px; color: #ea580c; flex-shrink: 0; transition: transform 0.25s; }
        .faq-chevron.open { transform: rotate(45deg); }
        .faq-a { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.68); line-height: 1.8; padding-bottom: 18px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .faq-a.open { max-height: 320px; }

        /* ── FOOTER ── */
        .footer { background: #040709; border-top: 1px solid rgba(255,255,255,0.07); padding: 30px 20px; text-align: center; }
        .footer-logo { font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif; font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .footer-logo span { color: #ea580c; }
        .footer-text { font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.42); line-height: 1.8; }

        /* ── STICKY CTA ── */
        .sticky-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; background: linear-gradient(to top, rgba(8,14,26,1) 0%, rgba(8,14,26,0.96) 100%); border-top: 1px solid rgba(234,88,12,0.2); padding: 12px 20px 18px; transform: translateY(100%); transition: transform 0.3s ease; max-width: 480px; margin: 0 auto; }
        .sticky-cta.visible { transform: translateY(0); }
        .sticky-cta-btn { width: 100%; background: linear-gradient(135deg, #ea580c, #c2410c); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; padding: 15px; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 6px 24px rgba(234,88,12,0.45); }
        .sticky-price { text-align: center; font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.45); margin-top: 7px; }
        .divider { height: 1px; background: rgba(255,255,255,0.07); margin: 0 20px; }
        .img-card { background: #0d1520; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; width: 100%; }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-topbar">
          <div className="hero-logo">Power<span>Volt</span> NG</div>
          <div className="trust-pill"><div className="trust-dot" />2,400+ Sold</div>
        </div>

        {/* Text above image */}
        <div className="hero-content-top">
          <div className={`hero-slide-badge ${heroAnim ? "fading" : ""}`}>{slide.badge}</div>
          <div className={`hero-h1 ${heroAnim ? "fading" : ""}`}>{slide.title}</div>
          <div className={`hero-highlight ${heroAnim ? "fading" : ""}`}>{slide.highlight}</div>
          <p className={`hero-desc ${heroAnim ? "fading" : ""}`}>{slide.desc}</p>
        </div>

        {/* Image on page — not background */}
        <div className="hero-image-wrap">
          <Image
            src={slide.img}
            alt={slide.title}
            width={1200}
            height={800}
            className={`hero-image-fade ${heroAnim ? "fading" : ""}`}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            priority
            sizes="480px"
          />
        </div>

        {/* CTAs and stats below image */}
        <div className="hero-content-bottom">
          <div className="hero-cta-row">
            <button className="btn-primary" onClick={scrollToOrder}>{slide.cta} →</button>
            <button className="btn-ghost" onClick={scrollToOrder}>See Price & Details</button>
          </div>
          <div className="hero-stats-strip">
            <div className="stat-item"><div className="stat-val">144Wh</div><div className="stat-lbl">Battery</div></div>
            <div className="stat-item"><div className="stat-val">6 Ports</div><div className="stat-lbl">Outputs</div></div>
            <div className="stat-item"><div className="stat-val">Solar</div><div className="stat-lbl">Charged</div></div>
            <div className="stat-item"><div className="stat-val">POD</div><div className="stat-lbl">Lagos/ABJ</div></div>
          </div>
          <div className="hero-dots">
            {HERO_SLIDES.map((_, i) => (
              <div key={i} className={`hero-dot ${i === heroIndex ? "active" : ""}`}
                onClick={() => { setHeroAnim(true); setTimeout(() => { setHeroIndex(i); setHeroAnim(false) }, 400) }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN BAR ── */}
      <div className="pain-bar">
        <p className="pain-label">Sound familiar?</p>
        <div className="pain-items">
          {[
            ["😤", "NEPA takes light and your fridge full of food starts warming up"],
            ["💸", "You spend ₦3,000–₦6,000 on fuel every week just to run a gen"],
            ["😰", "Your client calls during blackout and you can't take the Zoom meeting"],
            ["🥵", "No fan. No sleep. Sweating through another hot Abuja/Lagos night"],
          ].map(([icon, text]) => (
            <div key={text} className="pain-item">
              <span className="pain-icon">{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
        <div className="pain-callout">
          The 150W Solar Power Station solves all of this — for less than 3 months of fuel costs.
        </div>
      </div>

      {/* ── WHO IT'S FOR (ICP CARDS) ── */}
      <section className="section icp-section">
        <p className="section-label">👥 Who It's For</p>
        <h2 className="section-title">This Is Built For You If…</h2>
        <p className="section-sub">See exactly how the PowerVolt solves your specific situation.</p>
        <div className="icp-grid">
          {ICP_CARDS.map((icp) => (
            <div key={icp.role} className="icp-card">
              <div className="icp-image-wrap">
                <Image src={icp.img} alt={icp.role} width={1200} height={900}
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
                  sizes="440px" />
              </div>
              <div className="icp-body">
                <div className="icp-role-row">
                  <span className="icp-emoji">{icp.emoji}</span>
                  <span className="icp-role" style={{ color: icp.color }}>{icp.role}</span>
                </div>
                <div className="icp-divider" />
                <div className="icp-pain-label">😩 The Problem</div>
                <div className="icp-pain">{icp.pain}</div>
                <div className="icp-benefit-label">✅ How PowerVolt Helps</div>
                <div className="icp-benefit">{icp.benefit}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
      <div style={{ background: "#080e1a", padding: "0 20px 52px", display: "flex", flexDirection: "column", gap: 14 }}>
        {PRODUCT_IMAGES.map((img) => (
          <div key={img.src} className="img-card">
            <Image src={img.src} alt={img.alt} width={1200} height={900}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
              sizes="440px" />
          </div>
        ))}
      </div>

      {/* ── FREE SOCKET BONUS ── */}
      <div className="bonus-section">
        <div className="bonus-badge">🎁 Limited Bonus</div>
        <h2 className="bonus-title">
          Free Extension Socket —<br /><span>This Batch Only</span>
        </h2>
        <p className="bonus-sub">
          We're including a free extension socket with every unit while stocks last. Once this batch is gone, the bonus goes with it.
        </p>
        <div className="bonus-image-wrap">
          <Image
            src="https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/free_socketreal.png"
            alt="Free extension socket bonus"
            width={1200}
            height={900}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            sizes="440px"
          />
        </div>
        <div className="bonus-cta-row">
          <button className="btn-primary" style={{ flex: 1 }} onClick={scrollToOrder}>
            Claim My Free Socket →
          </button>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 10, lineHeight: 1.6 }}>
          <strong style={{ color: "#86efac" }}>Available on all 3 packages.</strong> Every order — 1, 2, or 3 units — includes the free socket bonus automatically.
        </p>
      </div>

      {/* ── HOW TO CHARGE ── */}
      <section className="section charge-section">
        <p className="section-label">🔋 Charging Guide</p>
        <h2 className="section-title">3 Ways to Charge It</h2>
        <p className="section-sub">No light? No problem. Solar keeps it alive even without NEPA or a generator.</p>
        <div className="charge-cards">
          {CHARGE_METHODS.map((m) => (
            <div key={m.title} className="charge-card">
              <div className="charge-icon-wrap" style={{ background: m.color + "22" }}><span>{m.icon}</span></div>
              <div>
                <div className="charge-title">{m.title}</div>
                <div className="charge-desc">{m.desc}</div>
                <div className="charge-time">⏱ {m.time} to full charge</div>
              </div>
            </div>
          ))}
        </div>
        <div className="img-card" style={{ marginTop: 24 }}>
          <Image src="https://ik.imagekit.io/j1e78ujalr/rechargablesolarbank/rechargeable_specreal.png"
            alt="How to charge" width={1200} height={900}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            sizes="440px" />
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

      {/* ── 30-DAY GUARANTEE ── */}
      <div className="guarantee-section">
        <div className="guarantee-badge">🛡️</div>
        <div className="guarantee-title">30-Day Protection Guarantee</div>
        <p className="guarantee-sub">
          We stand behind every unit we ship. If your PowerVolt arrives faulty or damaged, we will make it right — no stress, no runaround.
        </p>
        <div className="guarantee-items">
          {[
            ["✅", "If your unit arrives faulty or damaged, contact us within 30 days"],
            ["🔄", "We'll arrange a free replacement or full refund — your choice"],
            ["📦", "Keep the product until the replacement arrives — no need to return first"],
            ["💬", "All claims handled directly on WhatsApp within 24 hours"],
            ["🚫", "This guarantee does not cover accidental damage or misuse"],
          ].map(([icon, text]) => (
            <div key={text} className="guarantee-item-row">
              <span className="guarantee-check">{icon}</span>
              <span className="guarantee-item-text">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SCARCITY BANNER ── */}
      <div className="scarcity-wrap">
        <div className="scarcity-banner">
          <div className="scarcity-fire">🔥</div>
          <div className="scarcity-title">We Only Process 5 Orders Per Day</div>
          <div className="scarcity-sub">
            Due to high demand, our dispatch team handles a maximum of 5 deliveries daily — so every order gets personal attention and proper packing. Today's slots are filling fast.
          </div>
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
      </div>

      {/* ── ORDER FORM ── */}
      <div ref={orderRef} className="order-section">
        <p className="section-label">📦 Secure Your Slot</p>
        <h2 className="section-title" style={{ marginBottom: 8 }}>
          {slotsLeft > 0 ? `Only ${slotsLeft} Slot${slotsLeft === 1 ? "" : "s"} Left Today` : "Join Tomorrow's Waitlist"}
        </h2>
        <p className="order-intro-text">
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
          Pay on Delivery available in Lagos & Abuja<br />
          30-Day Faulty/Damaged Guarantee<br /><br />
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