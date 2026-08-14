const PAGES = {
    HEADER: "shared/components/header.html",

    IMPORT_TYPE: "pages/import-type/import-type.html",
    METHOD: "pages/transaction-code/method/method.html",
    MANUAL: "pages/transaction-code/manual/manual.html",
    FILE: "pages/transaction-code/file/file.html"
};

async function loadPage(elementId, path) {
    const element = document.getElementById(elementId);

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load page: ${path}`);
    }

    element.innerHTML = await response.text();
}

export async function loadPages() {

    await Promise.all([
        loadPage("header", PAGES.HEADER),

        loadPage("import-type-page", PAGES.IMPORT_TYPE),
        loadPage("method-page", PAGES.METHOD),
        loadPage("manual-page", PAGES.MANUAL),
        loadPage("file-page", PAGES.FILE)
    ]);
}