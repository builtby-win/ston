# ston

## Media

- Never commit raw `.gif`, `.png`, `.jpg` or unoptimized `.mp4` under `public/blog` or `public/images`.
- After adding or changing media, run `pnpm media`. It converts GIFs/MP4s to AV1 + H.264 fallback video, PNG/JPG to AVIF, deletes the originals, and rewrites references in `src/`.
- `pnpm build` runs `node scripts/media.mjs --check` first and fails if anything is unoptimized, so Cloudflare Workers Builds rejects unoptimized media.
- Needs `ffmpeg` with `libsvtav1`, `libx264` and `libaom-av1` locally.
