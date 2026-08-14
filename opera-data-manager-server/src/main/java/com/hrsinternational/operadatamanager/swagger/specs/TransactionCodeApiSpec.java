package com.hrsinternational.operadatamanager.swagger.specs;

import com.hrsinternational.operadatamanager.dto.TransactionCodeRequest;
import com.hrsinternational.operadatamanager.dto.TransactionCodeResponse;
import com.hrsinternational.operadatamanager.swagger.schemas.TransactionCodeFileRequestSchema;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(
        name = "Transaction Code API",
        description = "Handles operations for OPERA transaction codes",
        externalDocs = @ExternalDocumentation(
                description = "Oracle OPERA Cloud — Configuring Transaction Codes",
                url = "https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.2/ocsuh/t_admin_financial_cashiering_adding_transaction_codes.htm"
        )
)
public interface TransactionCodeApiSpec {

    @Operation(
            summary = "Create transaction code",
            description = "Creates a new transaction code in OPERA Cloud."
    )
    @ApiResponse(
            responseCode = "201",
            description = "Transaction code created"
    )
    @ApiResponse(
            responseCode = "400",
            description = "Invalid transaction code data"
    )
    ResponseEntity<TransactionCodeResponse> createTransactionCode(
            TransactionCodeRequest request
    );

    @Operation(
            summary = "Import transaction codes",
            description = """
                    Imports transaction codes from a file.
                    
                    Supported file formats:
                    - CSV
                    - XLS
                    - XLSX
                    """
    )
    @ApiResponse(
            responseCode = "201",
            description = "Transaction codes successfully imported"
    )
    @ApiResponse(
            responseCode = "400",
            description = "Invalid file or unsupported file format"
    )
    @RequestBody(
            required = true,
            content = @Content(
                    mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                    schema = @Schema(implementation = TransactionCodeFileRequestSchema.class)
            )
    )
    ResponseEntity<List<TransactionCodeResponse>> importTransactionCodes(
            @RequestPart("file") MultipartFile file
    );
}
