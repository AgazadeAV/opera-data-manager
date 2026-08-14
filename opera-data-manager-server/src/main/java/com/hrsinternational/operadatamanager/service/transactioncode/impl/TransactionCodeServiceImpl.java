package com.hrsinternational.operadatamanager.service.transactioncode.impl;

import com.hrsinternational.operadatamanager.dto.TransactionCodeDto;
import com.hrsinternational.operadatamanager.dto.TransactionCodeRequest;
import com.hrsinternational.operadatamanager.dto.TransactionCodeResponse;
import com.hrsinternational.operadatamanager.service.transactioncode.TransactionCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionCodeServiceImpl implements TransactionCodeService {


    @Override
    public TransactionCodeResponse create(TransactionCodeRequest request) {
        // твоя серверная логика
        System.out.println("JAVA request: " + request);
        return TransactionCodeResponse.builder()
                .code(request.getCode())
                .description(request.getDescription())
                .subgroup(request.getSubgroup())
                .transactionType(request.getTransactionType())
                .revenueGroup(request.getRevenueGroup())
                .manualPosting(request.getManualPosting())
                .build();
    }
}
