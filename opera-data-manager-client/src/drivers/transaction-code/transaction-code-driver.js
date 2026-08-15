import { ERROR_MESSAGES } from "../../utils/constants.js";
import { OperaDriver } from "../base/opera-driver.js";

export class TransactionCodeDriver extends OperaDriver {

    CODE_LABEL = "Code";
    DESCRIPTION_LABEL = "Description";
    MANUAL_POSTING_LABEL = "Manual Posting";
    REVENUE_GROUP_LABEL = "Revenue Group";
    SUBGROUP_LABEL = "Subgroup";
    GROUP_LABEL = "Group";
    TRANSACTION_TYPE_LABEL = "Transaction Type";

    async create(data) {

        await this.clickButton(this.NEW_BUTTON_LABEL);

        await this.waitForTransactionCodePage();

        await this.setFieldValue(
            this.CODE_LABEL,
            data.code
        );

        await this.setFieldValue(
            this.DESCRIPTION_LABEL,
            data.description
        );

        await this.setFieldValue(
            this.TRANSACTION_TYPE_LABEL,
            data.transactionType
        );

        await this.setFieldValue(
            this.SUBGROUP_LABEL,
            data.subgroup
        );

        await this.waitForFieldValue(this.GROUP_LABEL);

        await this.clickCheckbox(
            this.REVENUE_GROUP_LABEL,
            data.revenueGroup
        );

        await this.clickCheckbox(
            this.MANUAL_POSTING_LABEL,
            data.manualPosting
        );

        await this.clickButton(this.SAVE_BUTTON_LABEL);

        await this.waitForButton(this.NEW_BUTTON_LABEL);

        return true;
    }

    async waitForTransactionCodePage() {

        await this.waitForVisible(
            () => this.getFieldByLabelText(this.CODE_LABEL),
            this.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(this.CODE_LABEL)
        );

        await this.waitForVisible(
            () => this.getFieldByLabelText(this.DESCRIPTION_LABEL),
            this.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(this.DESCRIPTION_LABEL)
        );

        await this.waitForVisible(
            () => this.getFieldByLabelText(this.TRANSACTION_TYPE_LABEL),
            this.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(this.TRANSACTION_TYPE_LABEL)
        );

        await this.waitForVisible(
            () => this.getFieldByLabelText(this.SUBGROUP_LABEL),
            this.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(this.SUBGROUP_LABEL)
        );
    }
}
