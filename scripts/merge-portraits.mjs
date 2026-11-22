import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const photos = JSON.parse(readFileSync(join(root, "images", "new-portraits-map.json"), "utf8"));
photos["crazy-horse"] = {
  url: "images/figures/crazy-horse.jpg",
  credit: "Wikipedia / Wikimedia Commons",
  caption: "Pictographic portrait associated with Crazy Horse — no photograph of him exists",
};

const extraLines = Object.keys(photos)
  .sort()
  .map((slug) => {
    const p = photos[slug];
    return `    ${JSON.stringify(slug)}: ${JSON.stringify(p)}`;
  })
  .join(",\n");

const imgPath = join(root, "data-images.js");
let src = readFileSync(imgPath, "utf8");
const marker = '    "winston-churchill":';
const i = src.indexOf(marker);
if (i < 0) throw new Error("marker not found");
const end = src.indexOf("\n", i);
src = src.slice(0, end) + ",\n" + extraLines + src.slice(end);
writeFileSync(imgPath, src);
console.log("merged", Object.keys(photos).length, "portraits into data-images.js");
