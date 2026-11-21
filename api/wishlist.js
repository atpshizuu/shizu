import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
const sql = url ? neon(url) : null

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  if (b.company) return res.json({ ok: true }) // honeypot
  if (typeof b.elapsed === 'number' && b.elapsed < 2000) return res.status(429).json({ error: 'That was very fast. Please try again.' })
  const name = String(b.name || '').trim().slice(0, 80)
  const email = String(b.email || '').trim().toLowerCase()
  const reason = String(b.reason || '').trim().slice(0, 500)
  if (!name) return res.status(400).json({ error: 'Please enter your name.' })
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (!sql) return res.status(503).json({ error: 'The wishlist is unavailable right now. Nothing was saved.' })
  try {
    await sql`CREATE TABLE IF NOT EXISTS wishlist(id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, reason TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`
    const r = await sql`INSERT INTO wishlist(name,email,reason) VALUES(${name},${email},${reason || null}) ON CONFLICT (email) DO NOTHING RETURNING id`
    if (!r.length) return res.status(409).json({ error: 'This email is already on the list.' })
    return res.status(201).json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
