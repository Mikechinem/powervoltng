"use client"

import { useState } from "react"
import { NIGERIAN_STATES, POD_STATES, PRICE_OPTIONS } from "@components/solar/data"

interface OrderFormProps {
  whatsappNumber: string
  onOrderPlaced: () => void
  slotsLeft: number
  variant?: "A" | "B"
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : undefined
}

function getEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function OrderForm({ whatsappNumber, onOrderPlaced, slotsLeft, variant }: OrderFormProps) {
  const [qty, setQty] = useState<"1" | "2" | "3">("1")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const selectedOption = PRICE_OPTIONS.find((o) => o.qty === qty)!
  const isPOD = POD_STATES.includes(state)

  function buildWhatsAppMessage() {
    const paymentMethod = isPOD ? "Pay on Delivery" : "Pay Before Delivery"
    const msg = `🛒 *NEW ORDER — Solar Power Station*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📍 *Address:* ${address}
🗺️ *State:* ${state}
📦 *Quantity:* ${qty} unit(s) — ${selectedOption.label}
💰 *Total:* ${selectedOption.display}
🎁 *Bonus:* ${selectedOption.bonus}
💳 *Payment:* ${paymentMethod}

---
_Order placed via PowerVolt NG landing page_`
    return encodeURIComponent(msg)
  }

  async function firePurchaseEvents() {
    const eventId = getEventId()
    const eventSourceUrl = window.location.href
    const contentName = variant === "B" ? "PowerVolt_Purchase_B" : "PowerVolt_Purchase_A"
    const value = selectedOption.price

    // 1. Browser pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq(
        "track",
        "Purchase",
        { value, currency: "NGN", content_name: contentName },
        { eventID: eventId }
      )
    }

    // 2. CAPI (server-side)
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "Purchase",
          eventId,
          eventSourceUrl,
          contentName,
          value,
          currency: "NGN",
          phone: phone.trim(),
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc"),
        }),
      })
    } catch (err) {
      console.error("[Purchase CAPI] Failed:", err)
    }
  }

  async function handleSubmit() {
    if (!name.trim() || !phone.trim() || !address.trim() || !state) {
      setError("Please fill in all delivery details to complete your order.")
      return
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid Nigerian phone number.")
      return
    }
    setError("")
    setLoading(true)

    await firePurchaseEvents()

    await new Promise((r) => setTimeout(r, 800))
    const cleaned = whatsappNumber.replace(/\D/g, "")
    const intl = cleaned.startsWith("0") ? "234" + cleaned.slice(1) : cleaned
    const url = `https://wa.me/${intl}?text=${buildWhatsAppMessage()}`
    window.open(url, "_blank")
    onOrderPlaced()
    setSuccess(true)
    setLoading(false)
  }

  return (
    <div id="order" className="order-form-root">
      <style>{`
        .order-form-root {
          background: linear-gradient(135deg, #0d1a28 0%, #0a1220 100%);
          border: 1px solid rgba(234,88,12,0.22);
          border-radius: 24px;
          padding: 28px 20px;
          position: relative;
          overflow: hidden;
        }
        .order-form-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #ea580c, #5208d4, #ea580c);
          background-size: 200% 100%;
          animation: shimmer-bar 3s linear infinite;
        }
        @keyframes shimmer-bar {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        .form-label {
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); display: block; margin-bottom: 7px;
        }
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 14px 16px;
          color: #fff; font-size: 15px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none; transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.28); }
        .form-input:focus {
          border-color: #ea580c;
          background: rgba(234,88,12,0.06);
        }
        .form-input option { background: #0d1a28; color: #fff; }
        .qty-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 16px; border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.11);
          background: rgba(255,255,255,0.05);
          cursor: pointer; transition: all 0.2s; text-align: left; margin-bottom: 10px;
        }
        .qty-btn:last-child { margin-bottom: 0; }
        .qty-btn.active { border-color: #ea580c; background: rgba(234,88,12,0.09); }
        .qty-btn:not(.active):hover { border-color: rgba(234,88,12,0.4); background: rgba(255,255,255,0.07); }
        .radio-circle {
          width: 19px; height: 19px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.28);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: border-color 0.2s;
        }
        .radio-circle.active { border-color: #ea580c; }
        .radio-dot { width: 9px; height: 9px; border-radius: 50%; background: #ea580c; }
        .pod-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 600; margin-top: 10px;
        }
        .pod-badge.pod {
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.28); color: #86efac;
        }
        .pod-badge.prepay {
          background: rgba(234,88,12,0.1); border: 1px solid rgba(234,88,12,0.25); color: #fdba74;
        }
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #ea580c, #c2410c); color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 700;
          padding: 17px 24px; border: none; border-radius: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 8px 32px rgba(234,88,12,0.45);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px); box-shadow: 0 12px 40px rgba(234,88,12,0.55);
        }
        .submit-btn:active:not(:disabled) { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .submit-btn.sold-out { background: rgba(255,255,255,0.08); box-shadow: none; }
        .success-box { text-align: center; padding: 28px 0 8px; }
        .success-icon { font-size: 46px; margin-bottom: 14px; }
        .success-title {
          font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
          font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 10px;
        }
        .success-sub {
          font-size: 15px; font-weight: 400;
          color: rgba(255,255,255,0.65); line-height: 1.75;
        }
        .guarantee-item {
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.72); line-height: 1.6;
        }
        .whatsapp-icon { width: 20px; height: 20px; fill: #fff; flex-shrink: 0; }
        .fine-print {
          text-align: center; font-size: 12px; font-weight: 400;
          color: rgba(255,255,255,0.35); margin-top: 14px; line-height: 1.7;
        }
      `}</style>

      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#ea580c", display: "block", marginBottom: 8 }}>
          🛒 Secure Your Slot
        </span>
        <h3 style={{ fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>
          Complete Your Order
        </h3>
        <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
          Fill in your details below. We'll confirm via WhatsApp before dispatch.
        </p>
      </div>

      <div style={{
        background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.25)",
        borderRadius: 12, padding: "11px 14px",
        display: "flex", alignItems: "center", gap: 9, marginBottom: 22,
      }}>
        <span style={{ fontSize: 17 }}>⚠️</span>
        <span style={{ fontSize: 13, color: "#fdba74", fontWeight: 600, lineHeight: 1.5 }}>
          {slotsLeft > 0
            ? <><strong style={{ color: "#ea580c" }}>{slotsLeft} slot{slotsLeft === 1 ? "" : "s"}</strong> left today. We process max 5 orders per day.</>
            : <>Today's slots are <strong style={{ color: "#ea580c" }}>full</strong>. Submit below to join tomorrow's first batch.</>
          }
        </span>
      </div>

      {success ? (
        <div className="success-box">
          <div className="success-icon">🎉</div>
          <div className="success-title">Order Sent Successfully!</div>
          <div className="success-sub">
            Your order details have been sent to our WhatsApp team.<br />
            We'll confirm your delivery within 30 minutes.<br /><br />
            <strong style={{ color: "#fdba74" }}>Check your WhatsApp now</strong> to complete the process.
          </div>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 24 }}>
            <label className="form-label">Choose Your Package</label>
            {PRICE_OPTIONS.map((opt) => (
              <button
                key={opt.qty} type="button"
                onClick={() => setQty(opt.qty)}
                className={`qty-btn ${qty === opt.qty ? "active" : ""}`}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 11, flex: 1, minWidth: 0 }}>
                  <div className={`radio-circle ${qty === opt.qty ? "active" : ""}`}>
                    {qty === opt.qty && <div className="radio-dot" />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" as const }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{opt.label}</span>
                      {opt.badge && (
                        <span style={{
                          background: opt.badge === "Best Value" ? "#5208d4" : "rgba(234,88,12,0.85)",
                          color: "#fff", fontSize: 10, fontWeight: 700,
                          padding: "2px 8px", borderRadius: 20,
                          textTransform: "uppercase" as const, letterSpacing: "0.07em",
                        }}>{opt.badge}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{opt.bonus}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" as const, flexShrink: 0, marginLeft: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#ea580c" }}>{opt.display}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", textDecoration: "line-through" }}>{opt.slashed}</div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16, marginBottom: 22 }}>
            <div>
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="form-label">WhatsApp / Phone Number</label>
              <input className="form-input" type="tel" placeholder="e.g. 08012345678" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Delivery State</label>
              <select className="form-input" value={state} onChange={e => setState(e.target.value)}>
                <option value="">Select your state</option>
                {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {state && (
                <div className={`pod-badge ${isPOD ? "pod" : "prepay"}`}>
                  {isPOD
                    ? <><span>✅</span> Pay on Delivery in {state}</>
                    : <><span>💳</span> Payment before delivery for {state}</>
                  }
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Delivery Address</label>
              <input className="form-input" type="text" placeholder="Street, area, city" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.04)", borderRadius: 14,
            padding: "14px 16px", marginBottom: 22,
            display: "flex", flexDirection: "column" as const, gap: 10,
          }}>
            {[
              "✅ Pay on Delivery in Lagos & Abuja — pay only when it arrives",
              "🚚 Free nationwide delivery to all 36 states",
              "📦 Delivery within 2–5 business days",
              "🔄 7-day replacement guarantee if faulty",
            ].map(g => (
              <div key={g} className="guarantee-item">{g}</div>
            ))}
          </div>

          {error && (
            <p style={{ color: "#fca5a5", fontSize: 14, marginBottom: 14, textAlign: "center" as const }}>{error}</p>
          )}

          <button
            className={`submit-btn ${slotsLeft === 0 ? "sold-out" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>⏳ Processing…</>
            ) : slotsLeft === 0 ? (
              <>📋 Join Tomorrow's Waitlist</>
            ) : (
              <>
                <svg className="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order Now via WhatsApp
              </>
            )}
          </button>

          <p className="fine-print">
            {isPOD && state
              ? "You will NOT be charged until your package is delivered and confirmed."
              : "Your order details will be sent to our team instantly via WhatsApp."}
            <br />No hidden charges. No tricks.
          </p>
        </>
      )}
    </div>
  )
}