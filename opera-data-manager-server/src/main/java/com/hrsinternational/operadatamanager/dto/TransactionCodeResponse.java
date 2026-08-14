package com.hrsinternational.operadatamanager.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class TransactionCodeResponse {
    private String code;
    private String description;
    private String subgroup;
    private String transactionType;
    private Boolean revenueGroup;
    private Boolean manualPosting;
}
