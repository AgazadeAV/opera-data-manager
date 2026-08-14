package com.hrsinternational.operadatamanager.service.transactioncode;

import com.hrsinternational.operadatamanager.dto.TransactionCodeFileRow;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TransactionCodeFileParser {

    List<TransactionCodeFileRow> parse(MultipartFile file);
}
