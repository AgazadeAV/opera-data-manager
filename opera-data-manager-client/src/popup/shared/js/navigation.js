const importTypePage = document.getElementById("import-type-page");

const methodPage = document.getElementById("method-page");

const manualPage = document.getElementById("manual-page");

const filePage = document.getElementById("file-page");

const status = document.getElementById("status");

function showPage(page) {
    importTypePage.hidden = true;
    methodPage.hidden = true;
    manualPage.hidden = true;
    filePage.hidden = true;
    page.hidden = false;
    status.hidden = true;
}

export function initializeNavigation() {

    document.querySelectorAll("[data-import-type]").forEach(button => {
        button.addEventListener(
            "click", () => {
                const importType = button.dataset.importType;
                if (importType === "transaction-code") showPage(methodPage);
            }
        );
    });

    document.getElementById("manual-option").addEventListener("click", () => showPage(manualPage));
    document.getElementById("file-option").addEventListener("click", () => showPage(filePage));
    document.getElementById("back-to-import-types").addEventListener("click", () => showPage(importTypePage));
    document.getElementById("back-to-methods").addEventListener("click", () => showPage(methodPage));
    document.getElementById("back-from-file").addEventListener("click", () => showPage(methodPage));
}
