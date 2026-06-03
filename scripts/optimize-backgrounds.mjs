import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imagesDir = path.join(process.cwd(), "public", "images");

const backgrounds = [
  "фон-1-приглашение.png",
  "фон-2-история.png",
  "фон-3-программа.png",
  "фон-4-локация.png",
  "фон-5-дресскод.png",
  "фон-6-важная-информация.png",
  "фон-7-rsvp.png",
];

for (const fileName of backgrounds) {
  const inputPath = path.join(imagesDir, fileName);
  const baseName = fileName.replace(/\.png$/i, "");

  await sharp(inputPath)
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(imagesDir, `${baseName}.webp`));

  await sharp(inputPath)
    .avif({ quality: 62, effort: 6 })
    .toFile(path.join(imagesDir, `${baseName}.avif`));

  const [png, webp, avif] = await Promise.all([
    fs.stat(path.join(imagesDir, `${baseName}.png`)),
    fs.stat(path.join(imagesDir, `${baseName}.webp`)),
    fs.stat(path.join(imagesDir, `${baseName}.avif`)),
  ]);

  console.log(
    `${baseName}: png ${(png.size / 1024).toFixed(1)}KB | webp ${(webp.size / 1024).toFixed(1)}KB | avif ${(avif.size / 1024).toFixed(1)}KB`,
  );
}
