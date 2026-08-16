import { ERROR_MESSAGES, CONFIG } from "../../utils/constants.js";
import { OperaDriver } from "../base/opera-driver.js";
import { executeAdfAction } from "../../content/opera-adf-client.js";

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

        const validation = await this.validateTransactionCode(data);

        if (!validation.valid) {

            await this.clickButton(this.CANCEL_BUTTON_LABEL);

            throw new Error(
                ERROR_MESSAGES.TRANSACTION_CODE_VALIDATION_FAILED(
                    data.code,
                    validation.field,
                    validation.expectedValue,
                    validation.adfValue,
                    validation.domValue
                )
            );
        }

        await this.clickButton(this.SAVE_BUTTON_LABEL);

        await this.waitForButton(this.NEW_BUTTON_LABEL);

        return true;
    }

    async waitForTransactionCodePage() {

        await this.waitForVisible(
            () => this.getLabelByText(this.CODE_LABEL),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(this.CODE_LABEL)
        );

        await this.waitForVisible(
            () => this.getLabelByText(this.DESCRIPTION_LABEL),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(this.DESCRIPTION_LABEL)
        );

        await this.waitForVisible(
            () => this.getLabelByText(this.TRANSACTION_TYPE_LABEL),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(this.TRANSACTION_TYPE_LABEL)
        );

        await this.waitForVisible(
            () => this.getLabelByText(this.SUBGROUP_LABEL),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(this.SUBGROUP_LABEL)
        );
    }

    async validateTransactionCode(data) {

        const fields = [
            [this.CODE_LABEL, data.code],
            [this.DESCRIPTION_LABEL, data.description],
            [this.TRANSACTION_TYPE_LABEL, data.transactionType],
            [this.SUBGROUP_LABEL, data.subgroup],
            [this.REVENUE_GROUP_LABEL, data.revenueGroup],
            [this.MANUAL_POSTING_LABEL, data.manualPosting]
        ];

        for (const [labelText, expectedValue] of fields) {

            if (expectedValue == null) {
                continue;
            }

            const result = await executeAdfAction(
                "getValue",
                { labelText }
            );

            const adfMatches =
                String(result.adfValue) === String(expectedValue);

            const domMatches =
                String(result.domValue) === String(expectedValue);

            if (!adfMatches || !domMatches) {
                return {
                    valid: false,
                    field: labelText,
                    expectedValue,
                    adfValue: result.adfValue,
                    domValue: result.domValue
                };
            }
        }

        console.log(`VALIDATION FOR TRANSACTION CODE ${data.code} PASSED SUCCESSFULLY!`);

        return {
            valid: true
        };
    }
}
