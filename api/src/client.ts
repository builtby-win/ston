import { hc } from 'hono/client'
import type { AppType } from './index'

// Create a type-safe client for the API
export function createApiClient(baseUrl = 'https://api.builtby.win') {
  return hc<AppType>(baseUrl, {
    fetch: (input, init) =>
      fetch(input, {
        ...init,
        credentials: 'include', // Include cookies for auth
      }),
  })
}

export type ApiClient = ReturnType<typeof createApiClient>

// Re-export types for convenience
export type { AppType } from './index'
