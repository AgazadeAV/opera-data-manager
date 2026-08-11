package com.hrsinternational.operadatamanager.service.transactioncode.impl;

import com.hrsinternational.operadatamanager.dto.TransactionCodeDto;
import com.hrsinternational.operadatamanager.selenium.OperaNavigator;
import com.hrsinternational.operadatamanager.selenium.OperaTransactionCodeDriver;
import com.hrsinternational.operadatamanager.service.transactioncode.TransactionCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionCodeServiceImpl implements TransactionCodeService {

    private final OperaNavigator navigator;
    private final OperaTransactionCodeDriver driver;

    @Override
    public void create(TransactionCodeDto transactionCode) {

        navigator.openTransactionCodes();

        driver.clickNew();
        driver.waitForTransactionCodeForm();

        driver.fillSubgroup(transactionCode.getSubgroup());
        driver.fillCode(transactionCode.getCode());
        driver.fillDescription(transactionCode.getDescription());
        if (transactionCode.getTransactionType() != null
                && !transactionCode.getTransactionType().isBlank()) {

            driver.selectTransactionType(
                    transactionCode.getTransactionType()
            );
        }

        if (transactionCode.isRevenueGroup()) {
            driver.setRevenueGroup();
        }

        if (transactionCode.isManualPosting()) {
            driver.setManualPosting();
        }

        driver.clickSave();
    }
}
