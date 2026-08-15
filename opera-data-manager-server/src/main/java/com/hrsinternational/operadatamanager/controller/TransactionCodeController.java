package com.hrsinternational.operadatamanager.controller;

import com.hrsinternational.operadatamanager.dto.TransactionCodeRequest;
import com.hrsinternational.operadatamanager.dto.TransactionCodeResponse;
import com.hrsinternational.operadatamanager.service.transactioncode.TransactionCodeService;
import com.hrsinternational.operadatamanager.swagger.specs.TransactionCodeApiSpec;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("${api.base.url}" + TransactionCodeController.TRANSACTION_CODE_API)
@RequiredArgsConstructor
public class TransactionCodeController implements TransactionCodeApiSpec {

    public static final String TRANSACTION_CODE_API = "/transaction-codes";
    public static final String CREATE_TRANSACTION_CODE = "/create-transaction-code";
    public static final String IMPORT_TRANSACTION_CODES = "/import-transaction-codes";

    private final TransactionCodeService transactionCodeService;

    @PostMapping(CREATE_TRANSACTION_CODE)
    public ResponseEntity<@NonNull TransactionCodeResponse> createTransactionCode(
            @Valid @RequestBody TransactionCodeRequest request
    ) {
        TransactionCodeResponse response = transactionCodeService.createTrxCode(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping(IMPORT_TRANSACTION_CODES)
    public ResponseEntity<@NonNull List<TransactionCodeResponse>> importTransactionCodes(
            @RequestPart("file") MultipartFile file
    ) {
        List<TransactionCodeResponse> response = transactionCodeService.importFileWithTrxCodes(file);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
