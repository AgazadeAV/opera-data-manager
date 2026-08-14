package com.hrsinternational.operadatamanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TransactionCodeRequest {
    private String code;
    private String description;
    private String subgroup;
    private String transactionType;
    private Boolean revenueGroup;
    private Boolean manualPosting;
}
