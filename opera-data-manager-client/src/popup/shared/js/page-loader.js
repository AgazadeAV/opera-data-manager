import { ERROR_MESSAGES } from "../../../utils/constants.js";

const HEADER_PAGE = "shared/components/header.html";
const IMPORT_TYPE_PAGE = "pages/import-type/import-type.html";
const METHOD_PAGE = "pages/transaction-code/method/method.html";
const MANUAL_PAGE = "pages/transaction-code/manual/manual.html";
const FILE_PAGE = "pages/transaction-code/file/file.html";

async function loadPage(elementId, path) {
    const element = document.getElementById(elementId);
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(ERROR_MESSAGES.PAGE_LOAD_FAILED(path));
    }

    element.innerHTML = await response.text();
}

export async function loadPages() {
    await Promise.all([
        loadPage("header", HEADER_PAGE),
        loadPage("import-type-page", IMPORT_TYPE_PAGE),
        loadPage("method-page", METHOD_PAGE),
        loadPage("manual-page", MANUAL_PAGE),
        loadPage("file-page", FILE_PAGE)
    ]);
}
