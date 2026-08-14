import { ExtensionActions } from "../opera/core/extension-actions.js";
import { TransactionCodeDriver } from "../opera/transaction-code/transaction-code-driver.js";
import { ServerClient } from "../api/server-client.js";
import { MESSAGE_TYPES, TRANSACTION_CODE_PAGE_LABELS, OPERA_CLOUD_BUTTON_LABELS } from "../../utils/constants.js";

const actions = new ExtensionActions();
const transactionCodeDriver = new TransactionCodeDriver(actions);
const serverClient = new ServerClient();

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
                console.error("Opera Cloud content script error:", error);

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
            return await createTransactionCode(message.data);

        default:

            throw new Error(
                `Unknown message type: ${message.type}`
            );
    }
}

async function createTransactionCode(data) {

    const transactionCode = await serverClient.createTransactionCode(data);

    await transactionCodeDriver.clickButton(TRANSACTION_CODE_PAGE_LABELS.SAVE);

    await transactionCodeDriver.waitForTransactionCodePage();

    await transactionCodeDriver.fill(TRANSACTION_CODE_PAGE_LABELS.CODE_LABEL, transactionCode.code);

    await transactionCodeDriver.fill(TRANSACTION_CODE_PAGE_LABELS.DESCRIPTION_LABEL, transactionCode.description);

    await transactionCodeDriver.fill(TRANSACTION_CODE_PAGE_LABELS.TRANSACTION_TYPE_LABEL, transactionCode.transactionType);

    await transactionCodeDriver.fill(TRANSACTION_CODE_PAGE_LABELS.SUBGROUP_LABEL, transactionCode.subgroup);

    if (transactionCode.revenueGroup) {
        await transactionCodeDriver.setCheckbox(TRANSACTION_CODE_PAGE_LABELS.REVENUE_GROUP_LABEL, true);
    }

    if (transactionCode.manualPosting) {
        await transactionCodeDriver.setCheckbox(TRANSACTION_CODE_PAGE_LABELS.MANUAL_POSTING_LABEL, true);
    }

    await transactionCodeDriver.clickButton(TRANSACTION_CODE_PAGE_LABELS.SAVE);

    return true;
}
