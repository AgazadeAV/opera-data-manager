package com.hrsinternational.operadatamanager.controller;

import com.hrsinternational.operadatamanager.dto.TransactionCodeRequest;
import com.hrsinternational.operadatamanager.dto.TransactionCodeResponse;
import com.hrsinternational.operadatamanager.service.transactioncode.TransactionCodeService;
import com.hrsinternational.operadatamanager.swagger.specs.TransactionCodeApiSpec;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.base.url}" + TransactionCodeController.API_TRANSACTION_CODE)
@RequiredArgsConstructor
public class TransactionCodeController implements TransactionCodeApiSpec {

    public static final String API_TRANSACTION_CODE = "/transaction-codes";
    public static final String CREATE_TRANSACTION_CODE = "/create-transaction-code";

    private final TransactionCodeService transactionCodeService;

    @PostMapping(CREATE_TRANSACTION_CODE)
    public ResponseEntity<TransactionCodeResponse> createTransactionCode(
            @Valid @RequestBody TransactionCodeRequest request
    ) {
        TransactionCodeResponse response = transactionCodeService.create(request);
        System.out.println("JAVA response: " + response);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
