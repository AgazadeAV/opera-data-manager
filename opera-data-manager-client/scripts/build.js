import { BUILD_FORMAT, BUILD_MESSAGES, ERROR_MESSAGES_WITH_VALUES, PATHS } from "../src/utils/constants.js"
import { cp, mkdir, rm } from "node:fs/promises";
import { build } from "esbuild";

async function clean() {
    await rm(PATHS.DIST_DIR, {
        recursive: true,
        force: true
    });
}

async function createDirectories() {
    await mkdir(`${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.BACKGROUND_DIR}`, { recursive: true });
    await mkdir(`${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.CONTENT_DIR}`, { recursive: true });
    await mkdir(`${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.POPUP_DIR}`, { recursive: true });
}

async function buildJavaScript() {

    await build({
        entryPoints: [`${PATHS.SRC_DIR}${PATHS.SLASH}${PATHS.SERVICE_WORKER_JS}`],
        bundle: true,
        outfile: `${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.SERVICE_WORKER_JS}`,
        format: BUILD_FORMAT.ESM
    });

   await build({
        entryPoints: [`${PATHS.SRC_DIR}${PATHS.SLASH}${PATHS.OPERA_CONTENT_JS}`],
        bundle: true,
        outfile: `${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.OPERA_CONTENT_JS}`,
        format: BUILD_FORMAT.IIFE
    });

    await build({
        entryPoints: [`${PATHS.SRC_DIR}${PATHS.SLASH}${PATHS.OPERA_MAIN_JS}`],
        bundle: true,
        outfile: `${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.OPERA_MAIN_JS}`,
        format: BUILD_FORMAT.IIFE
    });

    await build({
        entryPoints: [`${PATHS.SRC_DIR}${PATHS.SLASH}${PATHS.POPUP_JS}`],
        bundle: true,
        outfile: `${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.POPUP_JS}`,
        format: BUILD_FORMAT.ESM
    });
}

async function copyStaticFiles() {

    await cp(
        PATHS.MANIFEST_JSON,
        `${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.MANIFEST_JSON}`
    );

    await cp(
        `${PATHS.SRC_DIR}${PATHS.SLASH}${PATHS.POPUP_HTML}`,
        `${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.POPUP_HTML}`
    );

    await cp(
        `${PATHS.SRC_DIR}${PATHS.SLASH}${PATHS.POPUP_CSS}`,
        `${PATHS.DIST_DIR}${PATHS.SLASH}${PATHS.POPUP_CSS}`
    );
}

async function main() {

    console.log(BUILD_MESSAGES.CLEANING_DIST);
    await clean();

    console.log(BUILD_MESSAGES.CREATING_DIRECTORIES);
    await createDirectories();

    console.log(BUILD_MESSAGES.BUILDING_JAVASCRIPT);
    await buildJavaScript();

    console.log(BUILD_MESSAGES.COPYING_STATIC_FILES);
    await copyStaticFiles();

    console.log(BUILD_MESSAGES.BUILD_COMPLETED_SUCCESSFULY);
}

main().catch(error => {
    console.error(ERROR_MESSAGES_WITH_VALUES.BUILD_ERROR(error));
    process.exit(1);
});
