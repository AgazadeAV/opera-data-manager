import { CONFIG, ERROR_MESSAGES_WITH_VALUES } from "../../utils/constants.js";
import { OperaDriver } from "../base/opera-driver.js";

export class TransactionCodeDriver extends OperaDriver {

    async waitForTransactionCodePage(code, description, transactionType, subgroup) {

        await this.waitForVisible(
            () => this.getFieldByLabelText(code),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES_WITH_VALUES.FIELD_NOT_VISIBLE(code)
        );

        await this.waitForVisible(
            () => this.getFieldByLabelText(description),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES_WITH_VALUES.FIELD_NOT_VISIBLE(description)
        );

        await this.waitForVisible(
            () => this.getFieldByLabelText(transactionType),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES_WITH_VALUES.FIELD_NOT_VISIBLE(transactionType)
        );

        await this.waitForVisible(
            () => this.getFieldByLabelText(subgroup),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES_WITH_VALUES.FIELD_NOT_VISIBLE(subgroup)
        );
    }
}
