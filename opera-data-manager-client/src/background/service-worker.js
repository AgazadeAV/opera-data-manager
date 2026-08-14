import { CONFIG, MESSAGE_TYPES, CHROME_ERROR_MESSAGES } from "../../utils/constants.js";

chrome.runtime.onMessage.addListener(

    (message, sender, sendResponse) => {

        handleMessage(message)
            .then(result => {
                sendResponse({
                    success: true,
                    result
                });
            })
            .catch(error => {
                console.error(
                    CHROME_ERROR_MESSAGES.SERVICE_WORKER_ERROR,
                    error
                );

                sendResponse({
                    success: false,
                    error: error.message
                });
            });

        return true;
    }
);

async function handleMessage(message) {

    switch (message.type) {

        case MESSAGE_TYPES.CREATE_TRANSACTION_CODE:

            return await sendToOperaTab(message);

        default:

            throw new Error(
                `${CHROME_ERROR_MESSAGES.UNKNOWN_MESSAGE_TYPE} ${message.type}`
            );
    }
}

async function sendToOperaTab(message) {

    const tabs = await chrome.tabs.query({
        url: [
            `https://*.${CONFIG.OPERA_CLOUD_URL_PART}/*`
        ]
    });

    if (!tabs.length) {
        throw new Error(
            CHROME_ERROR_MESSAGES.OPERA_CLOUD_TAB_NOT_FOUND
        );
    }

    const tab = tabs[0];

    if (!tab.id) {
        throw new Error(
            CHROME_ERROR_MESSAGES.OPERA_CLOUD_TAB_ID_NOT_FOUND
        );
    }

    return await chrome.tabs.sendMessage(tab.id, message);
}
