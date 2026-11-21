import { useReveal } from './lib'
import { Chars } from './lib'

const WHY = [
  ['It tells you before it’s too late', 'Soil moisture, light, temperature and humidity are read around the clock. When something drifts, SHIZU’s face changes and your phone gets a nudge.'],
  ['It looks after itself', 'A built-in pump waters the plant when the soil is dry, and a grow light covers the gloomy days. You set the thresholds once.'],
  ['It’s good company on your desk', 'Touch it and it reacts. Use it for study timers, break reminders, alarms and the time, with a face that actually has some personality.'],
]
export function Why() {
  const h = useReveal()
  return (
    <section id="why" data-bg="#101B17">
      <header ref={h}><h2 className="big"><Chars text="A plant that talks back" /></h2></header>
      <div className="why">
        {WHY.map(([t, d], n) => <WhyRow key={t} n={n} t={t} d={d} />)}
      </div>
    </section>
  )
}
function WhyRow({ n, t, d }) {
  const r = useReveal()
  return <article ref={r}><h3 data-rv="left">{t}</h3><p data-rv="up">{d}</p></article>
}

const INC = [
  ['Self-watering', 'Pump, soil probe and thresholds you control.'],
  ['Grow light', 'An artificial sun for dark corners and short winter days.'],
  ['Four senses', 'Soil moisture, temperature, humidity and light.'],
  ['Expressive face', 'Animations, touch response, greetings and sound.'],
  ['Plant profiles', 'Pick your species and get care advice made for it.'],
  ['Journal & history', 'Growth, watering and milestones in one timeline.'],
]
export function Includes() {
  const h = useReveal()
  return (
    <section id="inside" data-bg="#0a100d">
      <header ref={h}><h2 className="big"><Chars text="All of it, built in" /></h2></header>
      <div className="inc">{INC.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
    </section>
  )
}

const FAQ = [
  ['When can I buy one?', 'SHIZU is still being built. The early access list gets first notice when pre-orders open, and we’re not promising a date until it’s real.'],
  ['How much will it cost?', 'The price isn’t announced yet. Joining the list costs nothing and doesn’t commit you to buying.'],
  ['Does it need Wi-Fi?', 'The pot, sensors, pump and face work on the device itself. Wi-Fi adds the app, alerts, history and smarter advice.'],
  ['Can it read my plant’s feelings?', 'No. Plant bioelectrical sensing is an experiment, treated as data only. SHIZU doesn’t detect emotions, pain or thoughts.'],
]
export function Faq() {
  const h = useReveal()
  return (
    <section id="faq" data-bg="#080A0B">
      <header ref={h}><h2 className="big"><Chars text="Good to know" /></h2></header>
      <div className="faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    </section>
  )
}
