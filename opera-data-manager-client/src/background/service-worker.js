import { ERROR_MESSAGES, MESSAGE_TYPES } from "../utils/constants.js";
import { registerMessageHandler } from "../utils/message-handler.js";
import { ServerClient } from "../api/server-client.js";

const OPERA_CLOUD_URL_PART = "https://*oraclecloud.com/*";

const serverClient = new ServerClient();

registerMessageHandler(MESSAGE_TYPES.CREATE_TRANSACTION_CODE, createTransactionCode);

async function createTransactionCode(data) {

    const transactionCode = await serverClient.createTransactionCode(data);

    return await sendToOperaTab({
        type: MESSAGE_TYPES.FILL_TRANSACTION_CODE,
        data: transactionCode
    });
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
