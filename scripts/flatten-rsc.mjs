// Next's static export writes segment prefetch payloads as nested folders
// (e.g. about/__next.about/__PAGE__.txt) while the client requests flattened
// names (about/__next.about.__PAGE__.txt). Static hosts like GitHub Pages have
// no rewrites, so write a flattened copy of each payload next to its folder.
import { copyFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
let count = 0;

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if (!(await stat(full)).isDirectory()) continue;
    if (name.startsWith("__next.")) await flatten(full, dir, [name]);
    else await walk(full);
  }
}

async function flatten(dir, base, parts) {
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) await flatten(full, base, [...parts, name]);
    else {
      await copyFile(full, path.join(base, [...parts, name].join(".")));
      count++;
    }
  }
}

await walk(root);
console.log(`flatten-rsc: wrote ${count} flattened prefetch files in ${path.relative(process.cwd(), root) || "."}`);
