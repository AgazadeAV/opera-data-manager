package com.hrsinternational.operadatamanager.service.transactioncode;

import com.hrsinternational.operadatamanager.dto.TransactionCodeRequest;
import com.hrsinternational.operadatamanager.dto.TransactionCodeResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TransactionCodeService {

    TransactionCodeResponse createTrxCode(TransactionCodeRequest request);

    List<TransactionCodeResponse> importFileWithTrxCodes(MultipartFile request);
}

