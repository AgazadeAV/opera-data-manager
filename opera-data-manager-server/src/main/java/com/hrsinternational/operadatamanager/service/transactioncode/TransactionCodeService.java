package com.hrsinternational.operadatamanager.service.transactioncode;

import com.hrsinternational.operadatamanager.dto.TransactionCodeRequest;
import com.hrsinternational.operadatamanager.dto.TransactionCodeResponse;

public interface TransactionCodeService {

    TransactionCodeResponse create(TransactionCodeRequest request);

}
