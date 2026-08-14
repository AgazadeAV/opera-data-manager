import {
    DOM_EVENTS,
    DOM_IDS,
    DOM_SELECTORS,
    IMPORT_TYPES
} from "../../../utils/constants.js";

const importTypePage =
    document.getElementById(DOM_IDS.IMPORT_TYPE_PAGE);

const methodPage =
    document.getElementById(DOM_IDS.METHOD_PAGE);

const manualPage =
    document.getElementById(DOM_IDS.MANUAL_PAGE);

const filePage =
    document.getElementById(DOM_IDS.FILE_PAGE);

const status =
    document.getElementById(DOM_IDS.STATUS);

function showPage(page) {

    importTypePage.hidden = true;
    methodPage.hidden = true;
    manualPage.hidden = true;
    filePage.hidden = true;

    page.hidden = false;

    status.hidden = true;
}

export function initializeNavigation() {

    document
        .querySelectorAll(DOM_SELECTORS.IMPORT_TYPE)
        .forEach(button => {

            button.addEventListener(
                DOM_EVENTS.CLICK,
                () => {

                    const importType =
                        button.dataset.importType;

                    if (
                        importType ===
                        IMPORT_TYPES.TRANSACTION_CODE
                    ) {
                        showPage(methodPage);
                    }
                }
            );
        });

    document
        .getElementById(DOM_IDS.MANUAL_OPTION)
        .addEventListener(
            DOM_EVENTS.CLICK,
            () => showPage(manualPage)
        );

    document
        .getElementById(DOM_IDS.FILE_OPTION)
        .addEventListener(
            DOM_EVENTS.CLICK,
            () => showPage(filePage)
        );

    document
        .getElementById(DOM_IDS.BACK_TO_IMPORT_TYPES)
        .addEventListener(
            DOM_EVENTS.CLICK,
            () => showPage(importTypePage)
        );

    document
        .getElementById(DOM_IDS.BACK_TO_METHODS)
        .addEventListener(
            DOM_EVENTS.CLICK,
            () => showPage(methodPage)
        );

    document
        .getElementById(DOM_IDS.BACK_FROM_FILE)
        .addEventListener(
            DOM_EVENTS.CLICK,
            () => showPage(methodPage)
        );
}