import { ERROR_MESSAGES, MESSAGE_TYPES } from "../utils/constants.js";
import { registerMessageHandler } from "../utils/message-handler.js";
import { ServerClient } from "../api/server-client.js";

const OPERA_CLOUD_URL_PART = "https://*.oraclecloud.com/*";

const serverClient = new ServerClient();

registerMessageHandler(MESSAGE_TYPES.CREATE_TRANSACTION_CODE, createTransactionCode);
registerMessageHandler(MESSAGE_TYPES.IMPORT_TRANSACTION_CODES, importTransactionCodes);

async function createTransactionCode(data) {

    const transactionCode = await serverClient.createTransactionCode(data);

    return await sendToOperaTab({
        type: MESSAGE_TYPES.FILL_TRANSACTION_CODE,
        data: transactionCode
    });
}

async function importTransactionCodes(data) {

    console.log("IMPORT DATA:", data);
    console.log("IMPORT DATA FILE NAME:", data?.fileName);
    console.log("IMPORT DATA FILE TYPE:", data?.fileType);
    console.log("IMPORT DATA FILE CONTENT TYPE:", typeof data?.fileContent);
    console.log(
        "IMPORT DATA FILE CONTENT LENGTH:",
        data?.fileContent?.length
    );

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

    console.log("IMPORT FILE:", file);
    console.log("IMPORT FILE NAME:", file.name);
    console.log("IMPORT FILE TYPE:", file.type);
    console.log("IMPORT FILE SIZE:", file.size);

    const result = await serverClient.importTransactionCodes(file);

    console.log("IMPORT RESULT:", result);

    for (const transactionCode of result) {

        console.log("IMPORTING TRANSACTION CODE:", transactionCode);

        await sendToOperaTab({
            type: MESSAGE_TYPES.FILL_TRANSACTION_CODE,
            data: transactionCode
        });
    }

    return result;
}

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
