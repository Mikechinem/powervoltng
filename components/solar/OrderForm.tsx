"use client"

import { useState } from "react"
import { NIGERIAN_STATES, POD_STATES, PRICE_OPTIONS } from "@components/solar/data"

interface OrderFormProps {
  whatsappNumber: string
  onOrderPlaced: () => void
  slotsLeft: number
}

export default function OrderForm({ whatsappNumber, onOrderPlaced, slotsLeft }: OrderFormProps) {
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
          background: linear-gradient(135deg, #0f1923 0%, #0a1628 100%);
          border: 1px solid rgba(234,88,12,0.2);
          border-radius: 24px;
          padding: 28px 20px;
          position: relative;
          overflow: hidden;
        }
        .order-form-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ea580c, #5208d4, #ea580c);
          background-size: 200% 100%;
          animation: shimmer-bar 3s linear infinite;
        }
        @keyframes shimmer-bar {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        .form-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          display: block;
          margin-bottom: 6px;
        }
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 13px 16px;
          color: #fff;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.25); }
        .form-input:focus {
          border-color: #ea580c;
          background: rgba(234,88,12,0.06);
        }
        .form-input option { background: #0f1923; color: #fff; }
        .qty-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          margin-bottom: 10px;
        }
        .qty-btn:last-child { margin-bottom: 0; }
        .qty-btn.active {
          border-color: #ea580c;
          background: rgba(234,88,12,0.08);
        }
        .qty-btn:not(.active):hover {
          border-color: rgba(234,88,12,0.4);
          background: rgba(255,255,255,0.06);
        }
        .radio-circle {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .radio-circle.active { border-color: #ea580c; }
        .radio-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ea580c;
        }
        .pod-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 10px;
        }
        .pod-badge.pod {
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.3);
          color: #86efac;
        }
        .pod-badge.prepay {
          background: rgba(234,88,12,0.1);
          border: 1px solid rgba(234,88,12,0.25);
          color: #fdba74;
        }
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #ea580c, #c2410c);
          color: #fff;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          padding: 16px 24px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 8px 32px rgba(234,88,12,0.45);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          letter-spacing: 0.02em;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(234,88,12,0.55);
        }
        .submit-btn:active:not(:disabled) { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .submit-btn.sold-out {
          background: rgba(255,255,255,0.08);
          box-shadow: none;
        }
        .success-box {
          text-align: center;
          padding: 24px 0 8px;
        }
        .success-icon { font-size: 44px; margin-bottom: 12px; }
        .success-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
        }
        .success-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
        }
        .whatsapp-icon {
          width: 20px; height: 20px;
          fill: #fff;
          flex-shrink: 0;
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ea580c", display: "block", marginBottom: 8 }}>
          🛒 Secure Your Slot
        </span>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>
          Complete Your Order
        </h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
          Fill in your details below. We'll confirm via WhatsApp before dispatch.
        </p>
      </div>

      {/* Live scarcity notice */}
      <div style={{
        background: "rgba(234,88,12,0.1)",
        border: "1px solid rgba(234,88,12,0.25)",
        borderRadius: 12,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 16 }}>⚠️</span>
        <span style={{ fontSize: 12, color: "#fdba74", fontWeight: 600, lineHeight: 1.4 }}>
          {slotsLeft > 0
            ? <><strong style={{ color: "#ea580c" }}>{slotsLeft} slot{slotsLeft === 1 ? "" : "s"}</strong> left today. We process max 5 orders per day.</>
            : <>Today's slots are <strong style={{ color: "#ea580c" }}>full</strong>. Submit below to join tomorrow's first batch.</>
          }
        </span>
      </div>

      {/* Success state */}
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
          {/* Quantity selector */}
          <div style={{ marginBottom: 24 }}>
            <label className="form-label">Choose Your Package</label>
            {PRICE_OPTIONS.map((opt) => (
              <button
                key={opt.qty}
                type="button"
                onClick={() => setQty(opt.qty)}
                className={`qty-btn ${qty === opt.qty ? "active" : ""}`}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                  <div className={`radio-circle ${qty === opt.qty ? "active" : ""}`}>
                    {qty === opt.qty && <div className="radio-dot" />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{opt.label}</span>
                      {opt.badge && (
                        <span style={{
                          background: opt.badge === "Best Value" ? "#5208d4" : "rgba(234,88,12,0.8)",
                          color: "#fff",
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: 20,
                          textTransform: "uppercase" as const,
                          letterSpacing: "0.08em",
                        }}>{opt.badge}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{opt.bonus}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" as const, flexShrink: 0, marginLeft: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#ea580c" }}>{opt.display}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>{opt.slashed}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 14, marginBottom: 20 }}>
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

          {/* Guarantees */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            padding: "12px 14px",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column" as const,
            gap: 8,
          }}>
            {[
              "✅ Pay on Delivery in Lagos & Abuja — pay only when it arrives",
              "🚚 Free nationwide delivery to all 36 states",
              "📦 Delivery within 2–5 business days",
              "🔄 7-day replacement guarantee if faulty",
            ].map(g => (
              <div key={g} style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{g}</div>
            ))}
          </div>

          {error && (
            <p style={{ color: "#fca5a5", fontSize: 13, marginBottom: 12, textAlign: "center" as const }}>{error}</p>
          )}

          <button
            className={`submit-btn ${slotsLeft === 0 ? "sold-out" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>⏳ Opening WhatsApp…</>
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

          <p style={{ textAlign: "center" as const, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 12, lineHeight: 1.6 }}>
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