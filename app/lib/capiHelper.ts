import crypto from "crypto"

export function hashData(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export function getEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export interface CAPIPayload {
  eventName: string
  eventId: string
  eventSourceUrl: string
  clientIp?: string
  clientUserAgent?: string
  fbp?: string
  fbc?: string
  contentName?: string
  phone?: string
  value?: number
  currency?: string
}

export async function sendCAPIEvent(payload: CAPIPayload): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
  const accessToken = process.env.FB_CAPI_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    console.warn("[CAPI] Missing Pixel ID or Access Token")
    return
  }

  const userData: Record<string, string> = {}
  if (payload.clientIp) userData.client_ip_address = payload.clientIp
  if (payload.clientUserAgent) userData.client_user_agent = payload.clientUserAgent
  if (payload.fbp) userData.fbp = payload.fbp
  if (payload.fbc) userData.fbc = payload.fbc
  if (payload.phone) userData.ph = hashData(payload.phone)

  const body = {
    data: [
      {
        event_name: payload.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        event_source_url: payload.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: {
          ...(payload.contentName ? { content_name: payload.contentName } : {}),
          ...(payload.value !== undefined ? { value: payload.value } : {}),
          ...(payload.currency ? { currency: payload.currency } : {}),
        },
      },
    ],
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
    const json = await res.json()
    if (!res.ok) {
      console.error("[CAPI] Error:", json)
    } else {
      console.log("[CAPI] Success:", payload.eventName, json)
    }
  } catch (err) {
    console.error("[CAPI] Fetch failed:", err)
  }
}