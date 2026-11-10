#!/usr/bin/env node
// Media optimizer for public/. Smallest formats that every current browser plays:
//   gif / mp4  -> X.av1.mp4 (AV1) + X.mp4 (H.264 fallback); gif removed
//   png / jpg  -> X.avif;                                  original removed
// References in src/ are rewritten to match. Idempotent.
//
//   node scripts/media.mjs          optimize + rewrite references
//   node scripts/media.mjs --check  exit 1 if anything is unoptimized (used by `pnpm build`)
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'

const check = process.argv.includes('--check')
const IMAGE_DIRS = ['public/blog', 'public/images'] // root-level public images (resume preview) are left alone
const VIDEO_DIRS = ['public/blog']
const SRC_EXT = new Set(['.md', '.mdx', '.astro', '.tsx', '.ts'])
const MAX_WIDTH = 1280
const AV1_TYPE = 'video/mp4; codecs="av01.0.08M.08"'

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  )
const filesIn = (dirs) => dirs.filter(existsSync).flatMap(walk)
const strip = (file) => file.slice(0, -extname(file).length)
const url = (file) => file.replace(/^public/, '')

const TAG = 'media-optimized'
// ffmpeg is absent on Cloudflare's build image, so detect the tag from the file bytes (stored verbatim in the mp4 metadata atom).
const isTagged = (file) => readFileSync(file).includes(TAG)
const videos = filesIn(VIDEO_DIRS).filter((f) => {
  const ext = extname(f).toLowerCase()
  if (ext === '.gif') return true
  return ext === '.mp4' && !f.endsWith('.av1.mp4') && !f.endsWith('.tmp.mp4') && !isTagged(f)
})
const images = filesIn(IMAGE_DIRS).filter((f) => /\.(png|jpe?g)$/i.test(f))

if (check) {
  const bad = [...videos, ...images]
  if (bad.length) {
    console.error(`unoptimized media (run \`pnpm media\`):\n  ${bad.join('\n  ')}`)
    process.exit(1)
  }
  process.exit(0)
}

const ffmpeg = (...args) =>
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
const probe = (file) => {
  const [w, h] = execFileSync(
    'ffprobe',
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file],
    { encoding: 'utf8' },
  )
    .trim()
    .split(',')
    .map(Number)
  return { w, h }
}
// Downscale to the displayed width, force even dimensions, yuv420p (Safari/iOS cannot play yuv444).
const videoFilter = `scale='min(${MAX_WIDTH},iw)':-2,format=yuv420p`

const replacements = new Map() // old url -> new url (images)
const videoRefs = [] // { file, base, w, h }

for (const file of videos) {
  const base = strip(file)
  const isGif = extname(file).toLowerCase() === '.gif'
  const { w, h } = probe(file)
  const outW = Math.min(MAX_WIDTH, w)
  const outH = Math.round((h * outW) / w / 2) * 2
  const meta = ['-metadata', `comment=${TAG}`, '-movflags', '+faststart']
  const av1 = `${base}.av1.tmp.mp4`
  const h264 = `${base}.h264.tmp.mp4`
  const copy = `${base}.copy.tmp.mp4`
  ffmpeg('-i', file, '-an', '-vf', videoFilter, '-c:v', 'libsvtav1', '-crf', '50', '-preset', '6', '-svtav1-params', 'scm=1', ...meta, av1)
  ffmpeg('-i', file, '-an', '-vf', videoFilter, '-c:v', 'libx264', '-crf', '32', '-preset', 'veryslow', ...meta, h264)
  // An mp4 that is already H.264 may beat a re-encode: keep it as-is (retagged, no re-encode).
  const fallbacks = [h264]
  if (!isGif) {
    ffmpeg('-i', file, '-an', '-c', 'copy', ...meta, copy)
    fallbacks.push(copy)
  }
  const fallback = fallbacks.reduce((a, b) => (statSync(b).size < statSync(a).size ? b : a))
  renameSync(fallback, `${base}.mp4`)
  // Ship AV1 only when it actually beats the fallback; the browser would pick it first.
  const hasAv1 = statSync(av1).size < statSync(`${base}.mp4`).size
  if (hasAv1) renameSync(av1, `${base}.av1.mp4`)
  else rmSync(`${base}.av1.mp4`, { force: true })
  for (const tmp of [av1, h264, copy]) rmSync(tmp, { force: true })
  if (isGif) rmSync(file)
  videoRefs.push({ base: url(base), w: outW, h: outH, wasGif: isGif, hasAv1 })
  console.log(`video ${file}: ${base}.mp4 ${statSync(`${base}.mp4`).size}B${hasAv1 ? `, av1 ${statSync(`${base}.av1.mp4`).size}B` : ' (av1 not smaller, skipped)'}`)
}

for (const file of images) {
  const out = `${strip(file)}.avif`
  ffmpeg('-i', file, '-vf', `scale='min(${MAX_WIDTH * 2},iw)':-2`, '-c:v', 'libaom-av1', '-crf', '30', '-cpu-used', '3', '-still-picture', '1', '-f', 'avif', out)
  rmSync(file)
  replacements.set(url(file), url(out))
  console.log(`image ${file} -> ${out} (${statSync(out).size}B)`)
}

const sourceTags = (base, hasAv1) =>
  `${hasAv1 ? `<source src="${base}.av1.mp4" type='${AV1_TYPE}'>` : ''}<source src="${base}.mp4" type="video/mp4">`

for (const file of walk('src').filter((f) => SRC_EXT.has(extname(f)))) {
  let text = readFileSync(file, 'utf8')
  const before = text
  for (const [from, to] of replacements) text = text.replaceAll(from, to)
  for (const { base, w, h, wasGif, hasAv1 } of videoRefs) {
    if (wasGif) {
      // ![alt](/blog/x.gif) -> <video> with AV1 + H.264 sources
      text = text.replace(
        new RegExp(`!\\[([^\\]]*)\\]\\(${base}\\.gif\\)`, 'g'),
        (_, alt) =>
          `<video autoplay loop muted playsinline width="${w}" height="${h}" aria-label="${alt}">${sourceTags(base, hasAv1)}</video>`,
      )
    } else {
      // <video src="/blog/x.mp4" ...attrs></video> -> <video ...attrs>sources</video>
      text = text.replace(
        new RegExp(`<video src="${base}\\.mp4"([^>]*)></video>`, 'g'),
        (_, attrs) => `<video${attrs}>${sourceTags(base, hasAv1)}</video>`,
      )
    }
  }
  if (text !== before) {
    writeFileSync(file, text)
    console.log(`rewrote ${file}`)
  }
}
console.log(videos.length + images.length === 0 ? 'nothing to optimize' : 'done')
