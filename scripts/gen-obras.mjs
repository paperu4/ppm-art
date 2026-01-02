import { readdirSync, writeFileSync } from "node:fs";

const dir = new URL("../public/obras/", import.meta.url);
const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

files.sort((a,b) => a.localeCompare(b, "es", { numeric: true, sensitivity: "base" }));

const obras = files.map(f => ({
  src: `/obras/${f}`,
  alt: f.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")
}));

const out = `// Generado automáticamente. No edites a mano.\nexport const obras = ${JSON.stringify(obras, null, 2)};\n`;
writeFileSync(new URL("../src/obras.auto.js", import.meta.url), out, "utf8");

console.log(`OK: ${files.length} obras → src/obras.auto.js`);
