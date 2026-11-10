// Cloudflare Worker entrypoint for ston with Workers Static Assets.
// Replaces the Cloudflare Pages deploy target: the Astro static build in
// dist/ is served through the ASSETS binding, so Worker-only behavior
// (HTML rewriting, headers, redirects) can be added here later without
// migrating platforms again.

interface Env {
  ASSETS: {
    fetch: (request: Request | string, init?: RequestInit) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};
