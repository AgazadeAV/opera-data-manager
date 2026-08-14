import { MESSAGE_TYPES, OPERA_CLOUD_BUTTON_LABELS, TRANSACTION_CODE_PAGE_LABELS } from "../utils/constants.js";
import { registerMessageHandler } from "../utils/message-handler.js";
import { TransactionCodeDriver } from "../drivers/transaction-code/transaction-code-driver.js";

const transactionCodeDriver = new TransactionCodeDriver();

registerMessageHandler(MESSAGE_TYPES.FILL_TRANSACTION_CODE, fillTransactionCode);

async function fillTransactionCode(data) {

    await transactionCodeDriver.clickButton(
        OPERA_CLOUD_BUTTON_LABELS.NEW
    );

    await transactionCodeDriver.waitForTransactionCodePage(
        TRANSACTION_CODE_PAGE_LABELS.CODE_LABEL,
        TRANSACTION_CODE_PAGE_LABELS.DESCRIPTION_LABEL,
        TRANSACTION_CODE_PAGE_LABELS.TRANSACTION_TYPE_LABEL,
        TRANSACTION_CODE_PAGE_LABELS.SUBGROUP_LABEL
    );

    await transactionCodeDriver.setFieldValue(
        TRANSACTION_CODE_PAGE_LABELS.CODE_LABEL,
        data.code
    );

    await transactionCodeDriver.setFieldValue(
        TRANSACTION_CODE_PAGE_LABELS.DESCRIPTION_LABEL,
        data.description
    );

    await transactionCodeDriver.setFieldValue(
        TRANSACTION_CODE_PAGE_LABELS.TRANSACTION_TYPE_LABEL,
        data.transactionType
    );

    await transactionCodeDriver.setFieldValue(
        TRANSACTION_CODE_PAGE_LABELS.SUBGROUP_LABEL,
        data.subgroup
    );

    await transactionCodeDriver.setCheckboxState(
        TRANSACTION_CODE_PAGE_LABELS.REVENUE_GROUP_LABEL,
        data.revenueGroup
    );

    await transactionCodeDriver.setCheckboxState(
        TRANSACTION_CODE_PAGE_LABELS.MANUAL_POSTING_LABEL,
        data.manualPosting
    );

    await transactionCodeDriver.clickButton(
        OPERA_CLOUD_BUTTON_LABELS.SAVE
    );

    return true;
}
