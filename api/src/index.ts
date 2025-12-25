import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createDb, type Database } from './db'
import { createAuth, type Auth } from './lib/auth'

type Bindings = {
  DB: D1Database
  BETTER_AUTH_SECRET: string
}

type Variables = {
  db: Database
  auth: Auth
}

export type Env = { Bindings: Bindings; Variables: Variables }

const app = new Hono<Env>()

// CORS for *.builtby.win subdomains
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return null
      if (origin.endsWith('.builtby.win') || origin === 'https://builtby.win') {
        return origin
      }
      // Allow localhost for development
      if (origin.includes('localhost')) {
        return origin
      }
      return null
    },
    credentials: true,
  })
)

// Initialize db and auth per request
app.use('*', async (c, next) => {
  const db = createDb(c.env.DB)
  const auth = createAuth(db, { BETTER_AUTH_SECRET: c.env.BETTER_AUTH_SECRET })
  c.set('db', db)
  c.set('auth', auth)
  await next()
})

// API routes with RPC
const routes = app
  .get('/', (c) => {
    return c.json({ message: 'builtby.win API' })
  })
  .get('/health', (c) => {
    return c.json({ status: 'ok' })
  })
  .get('/me', async (c) => {
    const auth = c.get('auth')
    const session = await auth.api.getSession({ headers: c.req.raw.headers })
    if (!session) {
      return c.json({ user: null }, 401)
    }
    return c.json({ user: session.user })
  })

// Auth routes (not part of RPC - handled by better-auth)
app.on(['GET', 'POST'], '/auth/*', (c) => {
  const auth = c.get('auth')
  return auth.handler(c.req.raw)
})

// Export type for RPC client
export type AppType = typeof routes

export default app
