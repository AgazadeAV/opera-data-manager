package com.hrsinternational.operadatamanager.service.transactioncode.impl;

import com.hrsinternational.operadatamanager.dto.TransactionCodeRequest;
import com.hrsinternational.operadatamanager.dto.TransactionCodeResponse;
import com.hrsinternational.operadatamanager.mapper.TransactionCodeFileRowMapper;
import com.hrsinternational.operadatamanager.service.transactioncode.TransactionCodeFileParser;
import com.hrsinternational.operadatamanager.service.transactioncode.TransactionCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionCodeServiceImpl implements TransactionCodeService {

    private final TransactionCodeFileParser parser;
    private final TransactionCodeFileRowMapper mapper;

    @Override
    public TransactionCodeResponse createTrxCode(TransactionCodeRequest request) {
        return TransactionCodeResponse.builder()
                .code(request.getCode())
                .description(request.getDescription())
                .subgroup(request.getSubgroup())
                .transactionType(request.getTransactionType())
                .revenueGroup(request.getRevenueGroup())
                .manualPosting(request.getManualPosting())
                .build();
    }

    @Override
    public List<TransactionCodeResponse> importFileWithTrxCodes(MultipartFile file) {
        return parser.parse(file)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
