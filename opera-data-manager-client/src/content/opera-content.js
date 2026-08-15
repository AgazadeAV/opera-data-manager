import { MESSAGE_TYPES } from "../utils/constants.js";
import { registerMessageHandler } from "../utils/message-handler.js";
import { TransactionCodeDriver } from "../drivers/transaction-code/transaction-code-driver.js";

const CODE_LABEL = "Code";
const DESCRIPTION_LABEL = "Description";
const MANUAL_POSTING_LABEL = "Manual Posting";
const REVENUE_GROUP_LABEL = "Revenue Group";
const SUBGROUP_LABEL = "Subgroup";
const TRANSACTION_TYPE_LABEL = "Transaction Type";
const NEW_BUTTON_LABEL = "New";
const SAVE_BUTTON_LABEL = "Save";

const transactionCodeDriver = new TransactionCodeDriver();

registerMessageHandler(MESSAGE_TYPES.FILL_TRANSACTION_CODE, fillTransactionCode);

async function fillTransactionCode(data) {

    await transactionCodeDriver.clickButton(NEW_BUTTON_LABEL);
    await transactionCodeDriver.waitForTransactionCodePage(CODE_LABEL, DESCRIPTION_LABEL, TRANSACTION_TYPE_LABEL, SUBGROUP_LABEL);
    await transactionCodeDriver.setFieldValue(CODE_LABEL, data.code);
    await transactionCodeDriver.setFieldValue(DESCRIPTION_LABEL, data.description);
    await transactionCodeDriver.setFieldValue(TRANSACTION_TYPE_LABEL, data.transactionType);
    await transactionCodeDriver.setFieldValue(SUBGROUP_LABEL, data.subgroup);
    await transactionCodeDriver.setCheckboxState(REVENUE_GROUP_LABEL, data.revenueGroup);
    await transactionCodeDriver.setCheckboxState(MANUAL_POSTING_LABEL, data.manualPosting);
    await transactionCodeDriver.clickButton(SAVE_BUTTON_LABEL);

    return true;
}
