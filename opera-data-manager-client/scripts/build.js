import { ERROR_MESSAGES } from "../src/utils/constants.js";
import { build } from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";

const DIST_DIR_PATH = "dist/";
const SRC_DIR_PATH = "src/";
const BACKGROUND_DIR_PATH = "background/";
const CONTENT_DIR_PATH = "content/";
const POPUP_DIR_PATH = "popup/";
const MANIFEST_JSON_PATH = "manifest.json";
const SERVICE_WORKER_JS_PATH = "background/service-worker.js"
const OPERA_ADF_HANDLER_JS_PATH = "content/opera-adf-handler.js";
const OPERA_CONTENT_JS_PATH = "content/opera-content.js";
const POPUP_JS_PATH = "popup/popup.js";

async function clean() {
    await rm(DIST_DIR_PATH, {
        recursive: true,
        force: true
    });
}

async function createDirectories() {
    await mkdir(`${DIST_DIR_PATH}${BACKGROUND_DIR_PATH}`, { recursive: true });
    await mkdir(`${DIST_DIR_PATH}${CONTENT_DIR_PATH}`, { recursive: true });
    await mkdir(`${DIST_DIR_PATH}${POPUP_DIR_PATH}`, { recursive: true });
}

async function buildJavaScript() {

    await build({
        entryPoints: [`${SRC_DIR_PATH}${SERVICE_WORKER_JS_PATH}`],
        bundle: true,
        outfile: `${DIST_DIR_PATH}${SERVICE_WORKER_JS_PATH}`,
        format: "esm"
    });

    await build({
        entryPoints: [`${SRC_DIR_PATH}${OPERA_CONTENT_JS_PATH}`],
        bundle: true,
        outfile: `${DIST_DIR_PATH}${OPERA_CONTENT_JS_PATH}`,
        format: "iife"
    });

    await build({
        entryPoints: [`${SRC_DIR_PATH}${OPERA_ADF_HANDLER_JS_PATH}`],
        bundle: true,
        outfile: `${DIST_DIR_PATH}${OPERA_ADF_HANDLER_JS_PATH}`,
        format: "iife"
    });

    await build({
        entryPoints: [`${SRC_DIR_PATH}${POPUP_JS_PATH}`],
        bundle: true,
        outfile: `${DIST_DIR_PATH}${POPUP_JS_PATH}`,
        format: "esm"
    });
}

async function copyStaticFiles() {

    await cp(MANIFEST_JSON_PATH, `${DIST_DIR_PATH}${MANIFEST_JSON_PATH}`);

    await cp(`${SRC_DIR_PATH}${POPUP_DIR_PATH}`, `${DIST_DIR_PATH}${POPUP_DIR_PATH}`, {
        recursive: true, filter(source) { return !source.endsWith(".js"); }
    });
}

async function main() {
    console.log("Cleaning dist...");
    await clean();

    console.log("Creating directories...");
    await createDirectories();

    console.log("Copying static files...");
    await copyStaticFiles();


    console.log("Building JavaScript...");
    await buildJavaScript();

    console.log("Build completed successfully.");
}

main().catch(error => {
    console.error(ERROR_MESSAGES.BUILD_ERROR(error));
    process.exit(1);
});
