import { ERROR_MESSAGES, MESSAGE_TYPES, CONFIG } from "../utils/constants.js";
import { registerMessageHandler } from "../utils/message-handler.js";
import { ServerClient } from "../api/server-client.js";

const OPERA_CLOUD_URL_PART = "https://*.oraclecloud.com/*";

const serverClient = new ServerClient();

registerMessageHandler(MESSAGE_TYPES.CREATE_TRANSACTION_CODE, createTransactionCode);
registerMessageHandler(MESSAGE_TYPES.IMPORT_TRANSACTION_CODES, importTransactionCodes);
registerMessageHandler(MESSAGE_TYPES.DOWNLOAD_FAILED_TRANSACTION_CODES, downloadFailedTransactionCodes);

async function sendToOperaTab(message) {

    const tabs = await chrome.tabs.query({ url: OPERA_CLOUD_URL_PART });
    if (!tabs.length) {
        throw new Error(ERROR_MESSAGES.OPERA_CLOUD_TAB_NOT_FOUND);
    }

    const tab = tabs[0];
    if (!tab.id) {
        throw new Error(ERROR_MESSAGES.OPERA_CLOUD_TAB_ID_NOT_FOUND);
    }

    return await chrome.tabs.sendMessage(tab.id, message);
}

async function createTransactionCode(data) {

    const transactionCode = await serverClient.createTransactionCode(data);

    return await sendToOperaTab({
        type: MESSAGE_TYPES.FILL_TRANSACTION_CODE,
        data: transactionCode
    });
}

async function importTransactionCodes(data) {

    const binary = atob(data.fileContent);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    const file = new File(
        [bytes],
        data.fileName,
        {
            type: data.fileType
        }
    );

    const transactionCodes =
        await serverClient.importTransactionCodes(file);

    const failedTransactionCodes = [];

    for (const transactionCode of transactionCodes) {

        let created = false;

        for (
            let attempt = 1;
            attempt <= CONFIG.MAX_RETRIES;
            attempt++
        ) {

            console.log(
                `CREATING TRANSACTION CODE "${transactionCode.code}" ` +
                `(attempt ${attempt}/${CONFIG.MAX_RETRIES})`
            );

            try {

                await sendToOperaTab({
                    type: MESSAGE_TYPES.FILL_TRANSACTION_CODE,
                    data: transactionCode
                });

                console.log(
                    `TRANSACTION CODE "${transactionCode.code}" ` +
                    `CREATED SUCCESSFULLY`
                );

                created = true;
                break;

            } catch (error) {

                console.warn(
                    `TRANSACTION CODE "${transactionCode.code}" ` +
                    `ATTEMPT ${attempt}/${CONFIG.MAX_RETRIES} FAILED:`,
                    error.message
                );

                if (attempt < CONFIG.MAX_RETRIES) {
                    console.log(
                        `RETRYING TRANSACTION CODE "${transactionCode.code}"`
                    );
                }
            }
        }

        if (!created) {

            console.error(
                `TRANSACTION CODE "${transactionCode.code}" ` +
                `FAILED AFTER ${CONFIG.MAX_RETRIES} ATTEMPTS`
            );

            failedTransactionCodes.push(transactionCode);
        }
    }

    if (failedTransactionCodes.length) {

        console.error(
            "TRANSACTION CODES NOT CREATED:",
            failedTransactionCodes
        );

        return {
            success: false,
            failedTransactionCodes
        };
    }

    console.log(
        "ALL TRANSACTION CODES IMPORTED SUCCESSFULLY"
    );

    return {
        success: true,
        failedTransactionCodes: []
    };
}

async function downloadFailedTransactionCodes(data) {
    // implement
}
