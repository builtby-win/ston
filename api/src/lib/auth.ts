import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import type { Database } from '../db'
import * as schema from '../db/schema'

export function createAuth(db: Database, env: { BETTER_AUTH_SECRET: string }) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: 'https://api.builtby.win',
    trustedOrigins: [
      'https://builtby.win',
      'https://*.builtby.win',
      'http://localhost:4321',
      'http://localhost:4322',
    ],
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5, // 5 minutes
      },
    },
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: '.builtby.win',
      },
    },
    emailAndPassword: {
      enabled: true,
    },
  })
}

export type Auth = ReturnType<typeof createAuth>
