package com.hrsinternational.operadatamanager.swagger.specs;

import com.hrsinternational.operadatamanager.dto.TransactionCodeDto;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(
        name = "Transaction Code API",
        description = "Handles operations for OPERA transaction codes"
)
public interface TransactionCodeApiSpec {

    @Operation(
            summary = "Create transaction code",
            description = "Creates a new transaction code in OPERA Cloud.",
            externalDocs = @ExternalDocumentation(
                    description = "Oracle OPERA Cloud — Configuring Transaction Codes",
                    url = "https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.2/ocsuh/t_admin_financial_cashiering_adding_transaction_codes.htm"
            )
    )
    @ApiResponse(
            responseCode = "201",
            description = "Transaction code created"
    )
    @ApiResponse(
            responseCode = "400",
            description = "Invalid transaction code data"
    )
    ResponseEntity<Void> createTransactionCode(
            TransactionCodeDto transactionCodeDto
    );
}
