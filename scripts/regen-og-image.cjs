// One-off: regenerate public/og-image.png from public/og-image.svg
// using sharp. Outputs 1200x630 PNG. Run with: node scripts/regen-og-image.cjs
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svg = fs.readFileSync(path.join("public", "og-image.svg"));
const out = path.join("public", "og-image.png");

sharp(svg, { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(out)
  .then((info) => {
    console.log(`Wrote ${out} (${info.width}x${info.height}, ${info.size} bytes)`);
  })
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  });
