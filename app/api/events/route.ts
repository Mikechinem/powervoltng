import { NextRequest, NextResponse } from "next/server"
import { sendCAPIEvent, getEventId, CAPIPayload } from "@lib/capiHelper"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { eventName, eventSourceUrl, contentName, phone, fbp, fbc, eventId, value, currency } = body

    if (!eventName || !eventSourceUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined

    const clientUserAgent = req.headers.get("user-agent") || undefined

    const payload: CAPIPayload = {
      eventName,
      eventId: eventId || getEventId(),
      eventSourceUrl,
      clientIp,
      clientUserAgent,
      fbp,
      fbc,
      contentName,
      phone,
      value,
      currency,
    }

    await sendCAPIEvent(payload)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[/api/events] Error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}