import LandingPage from "@components/solar/LandingPage"
import FacebookPixel from "@components/solar/FacebookPixel"

export const metadata = {
  title: "150W Solar Power Station — Never Be In Darkness Again | PowerVolt NG",
  description: "Power your home, shop, or office 24/7. Solar + AC charging. 6 output ports. Pay on delivery in Lagos & Abuja. Free nationwide delivery.",
}

export default function Page2() {
  return (
    <>
      <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID!} />
      <LandingPage whatsappNumber="08129372857" variant="B" />
    </>
  )
}