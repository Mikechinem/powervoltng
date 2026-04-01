"use client"

interface ProductVideoProps {
  src: string
  title?: string
  subtitle?: string
}

export default function ProductVideo({
  src,
  title = "See It In Action",
  subtitle = "Watch how the PowerVolt 150W Solar Power Station handles real Nigerian power situations.",
}: ProductVideoProps) {
  return (
    <div className="product-video-section">
      <style>{`
        .product-video-section {
          background: linear-gradient(180deg, #080e1a 0%, #0c0d22 100%);
          padding: 48px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .product-video-label {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: #ea580c; margin-bottom: 10px; display: block;
        }
        .product-video-title {
          font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(24px, 7vw, 32px); font-weight: 700;
          line-height: 1.18; letter-spacing: -0.5px;
          color: #fff; margin-bottom: 10px;
        }
        .product-video-sub {
          font-size: 14px; font-weight: 400;
          color: rgba(255,255,255,0.62); line-height: 1.75;
          margin-bottom: 22px;
        }
        .product-video-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.09);
          background: #0d1520;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .product-video-wrap video {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 16px;
        }
        .product-video-note {
          display: flex; align-items: center; gap: 8px;
          margin-top: 14px;
          font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.38);
        }
        .product-video-note span { font-size: 14px; }
      `}</style>

      <p className="product-video-label">🎬 how the solar powerstation works</p>
      <h2 className="product-video-title">{title}</h2>
      <p className="product-video-sub">{subtitle}</p>

      <div className="product-video-wrap">
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
        />
      </div>

      <div className="product-video-note">
        <span>📱</span>
        Tap the video to play
      </div>
    </div>
  )
}