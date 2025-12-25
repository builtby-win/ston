import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './api/src/db/schema.ts',
  out: './api/drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
})
