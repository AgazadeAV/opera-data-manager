import {
    DOM_EVENTS,
    DOM_IDS,
    ERROR_MESSAGES_WITH_VALUES,
    UI_STATUS_TYPES,
    UI_TEXT,
    UI_TEXT_WITH_VALUES
} from "../../../../utils/constants.js";

import { showStatus } from "../../../shared/js/status.js";

export function initializeFileImport() {

    const fileInput = document.getElementById(DOM_IDS.FILE_INPUT);
    const importFileButton =
        document.getElementById(DOM_IDS.IMPORT_FILE_BUTTON);

    fileInput.addEventListener(
        DOM_EVENTS.CHANGE,
        () => {

            const file = fileInput.files?.[0];

            importFileButton.disabled = !file;
        }
    );

    importFileButton.addEventListener(
        DOM_EVENTS.CLICK,
        async () => {

            const file = fileInput.files?.[0];

            if (!file) {
                return;
            }

            importFileButton.disabled = true;

            importFileButton.textContent =
                UI_TEXT.UPLOADING_TRANSACTION_CODES;

            showStatus(
                UI_TEXT_WITH_VALUES.FILE_SELECTED_PREFIX(file.name),
                UI_STATUS_TYPES.LOADING
            );

            try {

                console.log(
                    UI_TEXT_WITH_VALUES.FILE_SELECTED_PREFIX(file.name)
                );

                showStatus(
                    UI_TEXT.FILE_SELECTED,
                    UI_STATUS_TYPES.SUCCESS
                );

            } catch (error) {

                console.error(
                    ERROR_MESSAGES_WITH_VALUES.FILE_IMPORT_FAILED(error)
                );

                showStatus(
                    error.message,
                    UI_STATUS_TYPES.ERROR
                );

            } finally {

                importFileButton.disabled = false;

                importFileButton.textContent =
                    UI_TEXT.IMPORT_TRANSACTION_CODES;
            }
        }
    );
}