import { MESSAGE_TYPES, UI_EVENTS, UI_STATUS_TYPES, UI_TEXT, DOM_IDS, DOM_SELECTORS, IMPORT_TYPES } from "../../utils/constants.js";

const importTypePage = document.getElementById("import-type-page");
const methodPage = document.getElementById("method-page");
const manualPage = document.getElementById("manual-page");
const filePage = document.getElementById("file-page");
const backToImportTypes = document.getElementById("back-to-import-types");
const backToMethods = document.getElementById("back-to-methods");
const backFromFile = document.getElementById("back-from-file");
const manualOption = document.getElementById("manual-option");
const fileOption = document.getElementById("file-option");
const form = document.getElementById("transaction-code-form");
const createButton = document.getElementById("create-button");
const fileInput = document.getElementById("transaction-code-file");
const importFileButton = document.getElementById("import-file-button");
const status = document.getElementById("status");

function showPage(page) {
    importTypePage.hidden = true;
    methodPage.hidden = true;
    manualPage.hidden = true;
    filePage.hidden = true;
    page.hidden = false;
    status.hidden = true;
}

function showStatus(message, type) {
    status.hidden = false;
    status.textContent = message;
    status.className = `status ${type}`;
}

document
    .querySelectorAll(DOM_SELECTORS.IMPORT_TYPE)
    .forEach(button => {
        button.addEventListener(UI_EVENTS.CLICK, () => {
            const importType = button.dataset.importType;
            if (importType === IMPORT_TYPES.TRANSACTION_CODE) showPage(methodPage);
        }
        );
    });

manualOption.addEventListener(UI_EVENTS.CLICK, () => { showPage(manualPage); });

fileOption.addEventListener(UI_EVENTS.CLICK, () => { showPage(methodPage); });

backToImportTypes.addEventListener(UI_EVENTS.CLICK, () => { showPage(methodPage); });

backToMethods.addEventListener(UI_EVENTS.CLICK, () => { showPage(methodPage); });

backFromFile.addEventListener(UI_EVENTS.CLICK, () => { showPage(methodPage); });

form.addEventListener(UI_EVENTS.SUBMIT, async event => {

    event.preventDefault();

    const data = {
        code: document.getElementById(DOM_IDS.CODE).value.trim(),
        description: document.getElementById(DOM_IDS.DESCRIPTION).value.trim(),
        subgroup: document.getElementById(DOM_IDS.SUBGROUP).value.trim(),
        transactionType: document.getElementById(DOM_IDS.TRANSACTION_TYPE).value.trim(),
        revenueGroup: document.getElementById(DOM_IDS.REVENUE_GROUP).checked,
        manualPosting: document.getElementById(DOM_IDS.MANUAL_POSTING).checked
    };

    if (!data.code || !data.description || !data.subgroup) {
        showStatus(UI_TEXT.REQUIRED_FIELDS_ERROR, UI_STATUS_TYPES.ERROR);
        return;
    }

    setLoading(true);

    try {
        const response = await chrome.runtime.sendMessage({
            type: MESSAGE_TYPES.CREATE_TRANSACTION_CODE,
            data
        });

        if (!response?.success) {
            throw new Error(response?.error || UI_TEXT.CREATE_TRANSACTION_CODE_FAILED);
        }

        showStatus(UI_TEXT.TRANSACTION_CODE_CREATED, UI_STATUS_TYPES.SUCCESS);

        form.reset();
    } catch (error) {
        console.error(UI_TEXT.CREATE_TRANSACTION_CODE_FAILED, error);
        showStatus(error.message, UI_STATUS_TYPES.ERROR);
    } finally {
        setLoading(false);
    }
});

fileInput.addEventListener(UI_EVENTS.CHANGE, () => {
    const file = fileInput.files?.[0];
    importFileButton.disabled = !file;
});

importFileButton.addEventListener(UI_EVENTS.CHANGE, async () => {

    const file = fileInput.files?.[0];

    if (!file) return;

    importFileButton.disabled = true;
    importFileButton.textContent = UI_TEXT.UPLOADING_TRANSACTION_CODES;

    showStatus(`${UI_TEXT.FILE_SELECTED_PREFIX} ${file.name}`, UI_STATUS_TYPES.LOADING);

    try {
        console.log(UI_TEXT.FILE_SELECTED_PREFIX, file);
        showStatus(UI_TEXT.FILE_SELECTED, UI_STATUS_TYPES.SUCCESS);
    } catch (error) {
        console.error(UI_TEXT.FILE_IMPORT_FAILED, error);
        showStatus(error.message, UI_STATUS_TYPES.ERROR);
    } finally {
        importFileButton.disabled = false;
        importFileButton.textContent = UI_TEXT.IMPORT_TRANSACTION_CODES;
    }
});

function setLoading(loading) {
    createButton.disabled = loading;
    createButton.textContent = loading ? UI_TEXT.CREATING_TRANSACTION_CODE : UI_TEXT.CREATE_TRANSACTION_CODE;
}