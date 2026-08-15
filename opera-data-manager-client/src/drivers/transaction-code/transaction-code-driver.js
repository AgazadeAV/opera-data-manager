import { ERROR_MESSAGES } from "../../utils/constants.js";
import { OperaDriver } from "../base/opera-driver.js";

export class TransactionCodeDriver extends OperaDriver {

    async waitForTransactionCodePage(code, description, transactionType, subgroup) {

        await this.waitForVisible(() => this.getFieldByLabelText(code),
            this.DEFAULT_TIMEOUT, ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(code)
        );

        await this.waitForVisible(() => this.getFieldByLabelText(description),
            this.DEFAULT_TIMEOUT, ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(description)
        );

        await this.waitForVisible(() => this.getFieldByLabelText(transactionType),
            this.DEFAULT_TIMEOUT, ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(transactionType)
        );

        await this.waitForVisible(() => this.getFieldByLabelText(subgroup),
            this.DEFAULT_TIMEOUT, ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(subgroup)
        );
    }
}
