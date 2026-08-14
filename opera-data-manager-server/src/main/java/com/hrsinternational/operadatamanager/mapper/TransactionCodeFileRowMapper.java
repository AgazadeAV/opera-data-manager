package com.hrsinternational.operadatamanager.mapper;

import com.hrsinternational.operadatamanager.dto.TransactionCodeFileRow;
import com.hrsinternational.operadatamanager.dto.TransactionCodeResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransactionCodeFileRowMapper {

    TransactionCodeResponse toResponse(TransactionCodeFileRow row);
}
