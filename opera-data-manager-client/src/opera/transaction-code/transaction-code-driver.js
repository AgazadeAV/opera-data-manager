import { OperaDriver } from "../core/opera-driver.js";

export class TransactionCodeDriver extends OperaDriver {

    constructor(actions) {
        super(actions);
    }

    async waitForTransactionCodePage(code, description, transactionType, subgroup) {

        await this.waitForTransactionCodePageFieldVisible(code);

        await this.waitForTransactionCodePageFieldVisible(description);

        await this.waitForTransactionCodePageFieldVisible(transactionType);

        await this.waitForTransactionCodePageFieldVisible(subgroup);
    }
}
