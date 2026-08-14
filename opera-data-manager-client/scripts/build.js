import { cp, mkdir, rm } from "node:fs/promises";
import { build } from "esbuild";

const DIST_DIR = "dist";

async function clean() {
    await rm(DIST_DIR, {
        recursive: true,
        force: true
    });
}

async function createDirectories() {
    await mkdir(`${DIST_DIR}/background`, { recursive: true });
    await mkdir(`${DIST_DIR}/content`, { recursive: true });
    await mkdir(`${DIST_DIR}/popup`, { recursive: true });
}

async function buildJavaScript() {

    await build({
        entryPoints: ["src/background/service-worker.js"],
        bundle: true,
        outfile: `${DIST_DIR}/background/service-worker.js`,
        format: "esm"
    });

    await build({
        entryPoints: ["src/content/opera-content.js"],
        bundle: true,
        outfile: `${DIST_DIR}/content/opera-content.js`,
        format: "iife"
    });

    await build({
        entryPoints: ["src/content/opera-main.js"],
        bundle: true,
        outfile: `${DIST_DIR}/content/opera-main.js`,
        format: "iife"
    });

    await build({
        entryPoints: ["src/popup/popup.js"],
        bundle: true,
        outfile: `${DIST_DIR}/popup/popup.js`,
        format: "esm"
    });
}

async function copyStaticFiles() {

    await cp(
        "manifest.json",
        `${DIST_DIR}/manifest.json`
    );

    await cp(
        "src/popup/popup.html",
        `${DIST_DIR}/popup/popup.html`
    );

    await cp(
        "src/popup/popup.css",
        `${DIST_DIR}/popup/popup.css`
    );
}

async function main() {

    console.log("Cleaning dist...");
    await clean();

    console.log("Creating directories...");
    await createDirectories();

    console.log("Building JavaScript...");
    await buildJavaScript();

    console.log("Copying static files...");
    await copyStaticFiles();

    console.log("Build completed successfully.");
}

main().catch(error => {
    console.error("Build failed:", error);
    process.exit(1);
});
