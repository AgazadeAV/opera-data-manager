package com.hrsinternational.operadatamanager.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TransactionCodeRequest {
    private String code;
    private String description;
    private String subgroup;
    private String transactionType;
    private Boolean revenueGroup;
    private Boolean manualPosting;
}
