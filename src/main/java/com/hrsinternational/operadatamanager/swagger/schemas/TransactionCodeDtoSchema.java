package com.hrsinternational.operadatamanager.swagger.schemas;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class TransactionCodeDtoSchema {

    @Schema(
            description = "Enter a numeric code, the code number can be a 20 digit value.",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String code;

    @Schema(
            description = "Enter a description for the transaction code (appears in Billing and on the folio).",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String description;

    @Schema(
            description = "Enter a transaction subgroup. This selection determined whether the transaction code is Sales, Payment or Wrapper based on the associated group configuration.",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    private String subgroup;

    @Schema(
            description = "Enter a transaction type. Transaction types are used to group similar transaction codes in reports. This field is optional. However, certain reports (Managers Report, Financial Transactions with Generates, Financial Transactions by Folio No.) output financial information and totals based on the Transaction Type. Available options are Lodging, Food and Beverage, Telephone, Minibar, Other Revenue, Tax, Non-Revenue or blank."
    )
    private String transactionType;

    @Schema(
            description = "Enabled for payment transaction codes, based on the subgroup selected. Available options are Credit Card, Cash, Check and Other."
    )
    private String paymentType;

    @Schema(
            description = "Processing Type (for credit card transaction codes). Available options are EFT and Manual."
    )
    private String processingType;

    @Schema(
            description = "Select this check box if this sales transaction code is revenue. If unchecked the charges posted are treated as non-revenue."
    )
    private boolean revenueGroup;

    @Schema(
            description = "Select this check box if the transaction code is used for posting cash paid out. Paid out transaction codes must be linked to a sales charge transaction group via the subgroup."
    )
    private boolean paidout;

    @Schema(
            description = "Select this checkbox to enable the payment transaction code in Billing."
    )
    private boolean cashierPayments;

    @Schema(
            description = "Select this check box to include the transaction code in the calculation of deposit and/or cancellation rules fees."
    )
    private boolean includeInDepositCxlRule;

    @Schema(
            description = "Select this check box if the sales transaction code is eligible for membership points."
    )
    private boolean membership;

    @Schema(
            description = "Select this check box if the amount posted is inclusive of all tax generates. In not selected tax generates will posted additional to the amount posted."
    )
    private boolean generatesInclusive;

    @Schema(
            description = "Select this checkbox to enable the payment transaction code in Accounts Receivable (City Ledger)."
    )
    private boolean arPayments;

    @Schema(
            description = "Select this check box if a check number must be entered when posting charges using this transaction code."
    )
    private boolean checkNumberMandatory;

    @Schema(
            description = "Select this check box to enable manual posting in Billing and Accounts Receivable."
    )
    private boolean manualPosting;

    @Schema(
            description = "Select this checkbox to enable the payment transaction code in deposits (Deposit Ledger). (Available when the Deposit Handling OPERA Control is active)."
    )
    private boolean depositPayments;

    @Schema(
            description = "Select check box to post and adjust covers (Available when the Post Covers OPERA Control is active)."
    )
    private boolean postCovers;
}
