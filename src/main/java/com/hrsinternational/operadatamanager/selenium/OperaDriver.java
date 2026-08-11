package com.hrsinternational.operadatamanager.selenium;

import org.openqa.selenium.By;

public abstract class OperaDriver {

    protected final SeleniumActions selenium;

    protected OperaDriver(
            SeleniumActions selenium
    ) {
        this.selenium = selenium;
    }

    public void clickNew() {

        By newButtonLocator = By.xpath(
                "//a[.//span[normalize-space()='New']]"
        );

        selenium.click(newButtonLocator);

        System.out.println("New button clicked");
    }

    public void clickSave() {

        By saveButtonLocator = By.xpath(
                "//div[@role='presentation']" +
                        "//a[@role='button'][.//span[normalize-space()='Save']]"
        );

        selenium.click(saveButtonLocator);

        System.out.println("Save clicked");
    }
}
