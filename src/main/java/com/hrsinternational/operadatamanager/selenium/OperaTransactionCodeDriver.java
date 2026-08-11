package com.hrsinternational.operadatamanager.selenium;

import org.openqa.selenium.By;
import org.springframework.stereotype.Component;

@Component
public class OperaTransactionCodeDriver extends OperaDriver {

    public OperaTransactionCodeDriver(SeleniumActions selenium) {
        super(selenium);
    }

    public void waitForTransactionCodeForm() {

        By codeFieldLocator = By.xpath(
                "//label[normalize-space()='Code']" +
                        "/ancestor::span[contains(@class,'x42d')]" +
                        "//input[@type='text' and @aria-required='true']"
        );

        selenium.waitForVisible(codeFieldLocator);

        System.out.println("New Transaction Code form opened");
    }

    public void fillCode(String code) {

        By codeFieldLocator = By.xpath(
                "//label[normalize-space()='Code']" +
                        "/ancestor::span[contains(@class,'x42d')]" +
                        "//input[@type='text' and @aria-required='true']"
        );

        selenium.fill(codeFieldLocator, code);

        System.out.println("Code entered: " + code);
    }

    public void fillDescription(String description) {

        By descriptionFieldLocator = By.xpath(
                "//label[normalize-space()='Description']" +
                        "/ancestor::span[contains(@class,'x42d')]" +
                        "//input[@type='text' and @aria-required='true']"
        );

        selenium.fill(descriptionFieldLocator, description);

        System.out.println("Description entered: " + description);
    }

    public void fillSubgroup(String subgroup) {

        By subgroupFieldLocator = By.xpath(
                "//label[normalize-space()='Subgroup']" +
                        "/ancestor::span[contains(@class,'x42d')]" +
                        "//input[@type='text']"
        );

        selenium.click(subgroupFieldLocator);

        selenium.fill(subgroupFieldLocator, subgroup);

        System.out.println("Subgroup selected: " + subgroup);
    }

    public void selectTransactionType(String transactionType) {

        By transactionTypeLocator = By.xpath(
                "//label[normalize-space()='Transaction Type']" +
                        "/ancestor::span[contains(@class,'x42d')]" +
                        "//select/option[normalize-space()='" + transactionType + "']"
        );

        selenium.click(transactionTypeLocator);

        System.out.println("Transaction Type selected: " + transactionType);
    }

    public void selectPaymentType(String paymentType) {
    }

    public void selectProcessingType(String processingType) {
    }

    public void setRevenueGroup() {

        By revenueGroupLabel = By.xpath(
                "//label[contains(@class,'x1lg') and normalize-space()='Revenue Group']"
        );

        selenium.click(revenueGroupLabel);

        System.out.println("Revenue Group selected");
    }

    public void setPaidout(boolean value) {
    }

    public void setCashierPayments(boolean value) {
    }

    public void setIncludeInDepositCxlRule(boolean value) {
    }

    public void setMembership(boolean value) {
    }

    public void setGeneratesInclusive(boolean value) {
    }

    public void setArPayments(boolean value) {
    }

    public void setCheckNumberMandatory(boolean value) {
    }

    public void setManualPosting() {

        By manualPostingLabel = By.xpath(
                "//label[contains(@class,'x1lg') and normalize-space()='Manual Posting']"
        );

        selenium.click(manualPostingLabel);

        System.out.println("Manual Posting selected");
    }

    public void setDepositPayments(boolean value) {
    }

    public void setPostCovers(boolean value) {
    }
}
