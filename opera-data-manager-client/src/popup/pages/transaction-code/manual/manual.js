import {
    DOM_EVENTS,
    DOM_IDS,
    ERROR_MESSAGES,
    ERROR_MESSAGES_WITH_VALUES,
    MESSAGE_TYPES,
    UI_STATUS_TYPES,
    UI_TEXT
} from "../../../../utils/constants.js";

import { showStatus } from "../../../shared/js/status.js";

export function initializeManualTransactionCode() {

    const form = document.getElementById(DOM_IDS.TRANSACTION_CODE_FORM);
    const createButton = document.getElementById(DOM_IDS.CREATE_BUTTON);

    form.addEventListener(DOM_EVENTS.SUBMIT, async event => {

        event.preventDefault();

        const data = {
            code: document.getElementById(DOM_IDS.CODE).value.trim(),

            description:
                document.getElementById(DOM_IDS.DESCRIPTION).value.trim(),

            subgroup:
                document.getElementById(DOM_IDS.SUBGROUP).value.trim(),

            transactionType:
                document
                    .getElementById(DOM_IDS.TRANSACTION_TYPE)
                    .value
                    .trim(),

            revenueGroup:
                document.getElementById(DOM_IDS.REVENUE_GROUP).checked,

            manualPosting:
                document.getElementById(DOM_IDS.MANUAL_POSTING).checked
        };

        if (!data.code || !data.description || !data.subgroup) {

            showStatus(
                ERROR_MESSAGES.REQUIRED_FIELDS_ERROR,
                UI_STATUS_TYPES.ERROR
            );

            return;
        }

        setLoading(createButton, true);

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

            showStatus(
                UI_TEXT.TRANSACTION_CODE_CREATED,
                UI_STATUS_TYPES.SUCCESS
            );

            form.reset();

        } catch (error) {

            console.error(
                ERROR_MESSAGES_WITH_VALUES.CREATE_TRANSACTION_CODE_FAILED(error)
            );

            showStatus(
                error.message,
                UI_STATUS_TYPES.ERROR
            );

        } finally {

            setLoading(createButton, false);
        }
    });
}

function setLoading(button, loading) {

    button.disabled = loading;

    button.textContent = loading
        ? UI_TEXT.CREATING_TRANSACTION_CODE
        : UI_TEXT.CREATE_TRANSACTION_CODE;
}