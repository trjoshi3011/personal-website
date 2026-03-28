/**
 * Builds square `app/icon.png` and multi-size `app/favicon.ico` from `public/favicon-source.png`
 * using letterboxing (contain) so tall artwork is not squished.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/favicon-source.png");
const iconOut = path.join(root, "app/icon.png");
const icoOut = path.join(root, "app/favicon.ico");

// Match `app/globals.css` page background so letterboxing isn’t a harsh white edge.
const LETTERBOX = { r: 247, g: 242, b: 233, alpha: 1 };

async function main() {
  if (!fs.existsSync(input)) {
    console.error("Missing", input);
    process.exit(1);
  }

  const ICON_PX = 512;
  const iconBuf = await sharp(input)
    .resize(ICON_PX, ICON_PX, {
      fit: "contain",
      background: LETTERBOX,
    })
    .png()
    .toBuffer();

  await fs.promises.writeFile(iconOut, iconBuf);

  const icoSizes = [16, 32, 48];
  const buffers = await Promise.all(
    icoSizes.map((s) =>
      sharp(input)
        .resize(s, s, {
          fit: "contain",
          background: LETTERBOX,
        })
        .png()
        .toBuffer(),
    ),
  );

  const ico = await toIco(buffers);
  await fs.promises.writeFile(icoOut, ico);

  console.log("Wrote", path.relative(root, iconOut), path.relative(root, icoOut));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
