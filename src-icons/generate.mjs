import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public')
mkdirSync(outDir, { recursive: true })

const any = join(__dirname, 'icon-any.svg')
const maskable = join(__dirname, 'icon-maskable.svg')

const jobs = [
  [any, 'pwa-64x64.png', 64],
  [any, 'pwa-192x192.png', 192],
  [any, 'pwa-512x512.png', 512],
  [any, 'apple-touch-icon.png', 180],
  [any, 'favicon-32x32.png', 32],
  [any, 'favicon-16x16.png', 16],
  [maskable, 'maskable-192x192.png', 192],
  [maskable, 'maskable-512x512.png', 512],
]

for (const [src, name, size] of jobs) {
  await sharp(src, { density: 384 }).resize(size, size).png().toFile(join(outDir, name))
  console.log('wrote', name)
}

const sizes32 = [16, 32, 48]
const buffers = await Promise.all(sizes32.map((s) => sharp(any, { density: 384 }).resize(s, s).png().toBuffer()))
function buildIco(pngBuffers, sizes) {
  const n = pngBuffers.length
  const headerSize = 6 + n * 16
  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(n, 4)
  let offset = headerSize
  const chunks = [header]
  pngBuffers.forEach((buf, i) => {
    const s = sizes[i]
    const entry = Buffer.alloc(16)
    entry.writeUInt8(s === 256 ? 0 : s, 0)
    entry.writeUInt8(s === 256 ? 0 : s, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(buf.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += buf.length
    header.set(entry, 6 + i * 16)
    chunks.push(buf)
  })
  return Buffer.concat(chunks)
}
const ico = buildIco(buffers, sizes32)
const fs = await import('node:fs/promises')
await fs.writeFile(join(outDir, 'favicon.ico'), ico)
console.log('wrote favicon.ico')
await fs.copyFile(any, join(outDir, 'favicon.svg'))
console.log('wrote favicon.svg')
