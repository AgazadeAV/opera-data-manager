import { DOM_EVENTS, DOM_IDS, DOM_SELECTORS, ERROR_MESSAGES, ERROR_MESSAGES_WITH_VALUES, IMPORT_TYPES, INFO_MESSAGES_WITH_VALUES, MESSAGE_TYPES, UI_STATUS_TYPES, UI_TEXT, UI_TEXT_WITH_VALUES } from "../utils/constants.js";

const backFromFile = document.getElementById(DOM_IDS.BACK_FROM_FILE);
const backToImportTypes = document.getElementById(DOM_IDS.BACK_TO_IMPORT_TYPES);
const backToMethods = document.getElementById(DOM_IDS.BACK_TO_METHODS);
const createButton = document.getElementById(DOM_IDS.CREATE_BUTTON);
const fileInput = document.getElementById(DOM_IDS.FILE_INPUT);
const fileOption = document.getElementById(DOM_IDS.FILE_OPTION);
const filePage = document.getElementById(DOM_IDS.FILE_PAGE);
const form = document.getElementById(DOM_IDS.TRANSACTION_CODE_FORM);
const importFileButton = document.getElementById(DOM_IDS.IMPORT_FILE_BUTTON);
const importTypePage = document.getElementById(DOM_IDS.IMPORT_TYPE_PAGE);
const manualOption = document.getElementById(DOM_IDS.MANUAL_OPTION);
const manualPage = document.getElementById(DOM_IDS.MANUAL_PAGE);
const methodPage = document.getElementById(DOM_IDS.METHOD_PAGE);
const status = document.getElementById(DOM_IDS.STATUS);

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
    status.className = INFO_MESSAGES_WITH_VALUES.CLASS_NAME(type);
}

document.querySelectorAll(DOM_SELECTORS.IMPORT_TYPE)
    .forEach(button => {
        button.addEventListener(DOM_EVENTS.CLICK, () => {
            const importType = button.dataset.importType;
            if (importType === IMPORT_TYPES.TRANSACTION_CODE) {
                showPage(methodPage);
            }
        });
    });

manualOption.addEventListener(DOM_EVENTS.CLICK, () => { showPage(manualPage); });

fileOption.addEventListener(DOM_EVENTS.CLICK, () => { showPage(filePage); });

backToImportTypes.addEventListener(DOM_EVENTS.CLICK, () => { showPage(importTypePage); });

backToMethods.addEventListener(DOM_EVENTS.CLICK, () => { showPage(methodPage); });

backFromFile.addEventListener(DOM_EVENTS.CLICK, () => { showPage(methodPage); });

form.addEventListener(DOM_EVENTS.SUBMIT, async event => {

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
        showStatus(ERROR_MESSAGES.REQUIRED_FIELDS_ERROR, UI_STATUS_TYPES.ERROR);
        return;
    }

    setLoading(true);

    try {
        const response = await chrome.runtime.sendMessage({
            type: MESSAGE_TYPES.CREATE_TRANSACTION_CODE,
            data
        });

        if (!response?.success) {
            throw new Error(
                response?.error ||
                ERROR_MESSAGES_WITH_VALUES.CREATE_TRANSACTION_CODE_FAILED
            );
        }

        showStatus(UI_TEXT.TRANSACTION_CODE_CREATED, UI_STATUS_TYPES.SUCCESS);

        form.reset();

    } catch (error) {

        console.error(ERROR_MESSAGES_WITH_VALUES.CREATE_TRANSACTION_CODE_FAILED(error));
        showStatus(error.message, UI_STATUS_TYPES.ERROR);

    } finally {

        setLoading(false);
    }
});

fileInput.addEventListener(DOM_EVENTS.CHANGE, () => {
    const file = fileInput.files?.[0];
    importFileButton.disabled = !file;
});

importFileButton.addEventListener(DOM_EVENTS.CLICK, async () => {

    const file = fileInput.files?.[0];

    if (!file) {
        return;
    }

    importFileButton.disabled = true;
    importFileButton.textContent = UI_TEXT.UPLOADING_TRANSACTION_CODES;

    showStatus(UI_TEXT_WITH_VALUES.FILE_SELECTED_PREFIX(file.name), UI_STATUS_TYPES.LOADING);

    try {
        console.log(UI_TEXT_WITH_VALUES.FILE_SELECTED_PREFIX(file.name));
        showStatus(UI_TEXT.FILE_SELECTED, UI_STATUS_TYPES.SUCCESS);

    } catch (error) {

        console.error(ERROR_MESSAGES_WITH_VALUES.FILE_IMPORT_FAILED(error));
        showStatus(error.message, UI_STATUS_TYPES.ERROR);

    } finally {

        importFileButton.disabled = false;
        importFileButton.textContent = UI_TEXT.IMPORT_TRANSACTION_CODES;
    }
});

function setLoading(loading) {

    createButton.disabled = loading;

    createButton.textContent = loading ?
        UI_TEXT.CREATING_TRANSACTION_CODE :
        UI_TEXT.CREATE_TRANSACTION_CODE;
}
