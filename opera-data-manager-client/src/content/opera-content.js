import { MESSAGE_TYPES } from "../utils/constants.js";
import { registerMessageHandler } from "../utils/message-handler.js";
import { TransactionCodeDriver } from "../drivers/transaction-code/transaction-code-driver.js";

const transactionCodeDriver = new TransactionCodeDriver();

registerMessageHandler(MESSAGE_TYPES.FILL_TRANSACTION_CODE, fillTransactionCode);

async function fillTransactionCode(data) {
    return await transactionCodeDriver.create(data);
}
