package com.hrsinternational.operadatamanager.dto;

import com.hrsinternational.operadatamanager.swagger.schemas.TransactionCodeDtoSchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Schema(implementation = TransactionCodeDtoSchema.class)
public class TransactionCodeDto {

    @NotBlank(message = "Transaction Code error. Transaction Code is required.")
    @Pattern(regexp = "^[0-9]+$", message = "Transaction Code error. Only Latin digits are allowed.")
    @Size(max = 20, message = "Transaction Code error. Transaction Code must contain a maximum of 20 digits.")
    private String code;

    @NotBlank(message = "Transaction Code description is required.")
    private String description;

    @NotBlank(message = "Transaction Code subgroup is required.")
    private String subgroup;

    @Pattern(regexp = "^(Lodging|Food and Beverages|Telephone|Minibar|Others|Tax|Non Revenue)?$", message = "Transaction Type error. Available options are Lodging, Food and Beverage, Telephone, Minibar, Other Revenue, Tax, Non-Revenue or blank.")
    private String transactionType;

    @Pattern(regexp = "^(Credit Card|Cash|Check|Other)?$", message = "Payment Type error. Available options are Credit Card, Cash, Check and Other.")
    private String paymentType;

    @Pattern(regexp = "^(EFT|Manual)?$", message = "Processing Type error. Available options are EFT and Manual.")
    private String processingType;

    private boolean revenueGroup;
    private boolean paidout;
    private boolean cashierPayments;
    private boolean includeInDepositCxlRule;
    private boolean membership;
    private boolean generatesInclusive;
    private boolean arPayments;
    private boolean checkNumberMandatory;
    private boolean manualPosting;
    private boolean depositPayments;
    private boolean postCovers;
}
