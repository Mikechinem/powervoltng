export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
]

export const POD_STATES = ["Lagos", "FCT - Abuja"]

export const PRICE_OPTIONS = [
  {
    qty: "1" as const,
    label: "1 Power Station",
    sublabel: "For personal & home use",
    badge: null,
    price: 145000,
    display: "₦145,000",
    slashed: "₦180,000",
    bonus: "+ FREE Extension Socket",
  },
  {
    qty: "2" as const,
    label: "2 Power Stations",
    sublabel: "For home + office",
    badge: "Save ₦3,000",
    price: 287000,
    display: "₦287,000",
    slashed: "₦360,000",
    bonus: "+ 2 FREE Extension Sockets",
  },
  {
    qty: "3" as const,
    label: "3 Power Stations",
    sublabel: "Best value — resell 1 or 2",
    badge: "Best Value",
    price: 424000,
    display: "₦424,000",
    slashed: "₦540,000",
    bonus: "+ 3 FREE Extension Sockets",
  },
]

export const WHAT_IT_POWERS = [
  { icon: "💡", item: "LED Bulb", watts: "8W", hours: "28.8 hrs" },
  { icon: "📱", item: "Phone / Tablet", watts: "15W", hours: "9.6 hrs" },
  { icon: "📺", item: "60W TV", watts: "60W", hours: "1.6 hrs" },
  { icon: "💻", item: "Laptop", watts: "50W", hours: "2 hrs" },
  { icon: "🌀", item: "AC Standing Fan", watts: "40W", hours: "2.5 hrs" },
  { icon: "🏕️", item: "Camp Light", watts: "10W", hours: "15 hrs" },
  { icon: "🔌", item: "Ceiling Fan", watts: "10W", hours: "15 hrs" },
  { icon: "❄️", item: "Small Fridge", watts: "120W", hours: "1 hr" },
  { icon: "🎥", item: "Projector", watts: "100W", hours: "1.2 hrs" },
  { icon: "🚁", item: "Drone Charger", watts: "60W", hours: "1.6 hrs" },
]

export const FAQS = [
  {
    q: "Can I use it during heavy rain or outside?",
    a: "Yes, the ABS+PE casing is weather-resistant. Keep the solar panel dry when not in use but the station itself handles Nigeria's conditions well.",
  },
  {
    q: "How long does it take to fully charge?",
    a: "Via AC (NEPA/generator): 4–5 hours. Via the 30W solar panel: 6–8 hours depending on sunlight. You can also charge both ways simultaneously for faster top-up.",
  },
  {
    q: "Will it run my fridge all night?",
    a: "A small 120W fridge runs for about 1 hour on a full charge. For overnight fridge backup, we recommend the 2 or 3-piece bundle to rotate charging cycles.",
  },
  {
    q: "Is payment on delivery available in my state?",
    a: "Pay on Delivery (POD) is available for Lagos and Abuja only. All other states require payment before delivery. Your order is 100% safe — we've delivered to 2,400+ customers.",
  },
  {
    q: "What if the product arrives damaged or faulty?",
    a: "We offer a 7-day replacement guarantee. If anything is wrong when it arrives, contact us immediately on WhatsApp and we'll arrange a swap at no extra cost.",
  },
  {
    q: "How many devices can I charge at once?",
    a: "Up to 6 devices simultaneously — 2 AC sockets, 2 USB ports, and 2 DC bulb jacks. Great for running a fan, charging phones, and powering bulbs all at the same time.",
  },
]

export const TESTIMONIALS = [
  {
    name: "Chiamaka O.",
    location: "Ikeja, Lagos",
    stars: 5,
    text: "NEPA took light for 3 days straight last month and I kept my shop open the whole time. My competitors had to close. I made over ₦80k those 3 days alone. This thing paid for itself in one week.",
    tag: "Business Owner",
  },
  {
    name: "Abdullahi M.",
    location: "Garki, Abuja",
    stars: 5,
    text: "I'm a freelancer — missing one Zoom call used to cost me clients. Now I just plug in and work. The laptop runs for 2 hours and my phone stays charged all day. Delivery was fast too, came in 3 days.",
    tag: "Freelancer",
  },
  {
    name: "Mrs. Adaeze K.",
    location: "Onitsha, Anambra",
    stars: 5,
    text: "I was skeptical at first because I had to pay before delivery. But it arrived exactly as described with the free socket. My children now study at night, my food doesn't spoil. I already ordered a second one.",
    tag: "Mother of 3",
  },
]