package com.hrsinternational.operadatamanager.swagger.schemas;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class TransactionCodeFileRequestSchema {

    @Schema(
            description = "CSV, XLS or XLSX file containing transaction codes",
            type = "string",
            format = "binary",
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    private MultipartFile file;
}
