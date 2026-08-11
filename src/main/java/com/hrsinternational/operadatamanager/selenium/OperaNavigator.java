package com.hrsinternational.operadatamanager.selenium;

import com.hrsinternational.operadatamanager.config.OperaProperties;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OperaNavigator {

    private final SeleniumActions selenium;
    private final OperaProperties operaProperties;

    public void openTransactionCodes() {

        System.out.println("Connected to Chrome");

        System.out.println("Switching to OPERA...");

        selenium.switchToWindow(operaProperties.getUrlPart());

        System.out.println("Pressing F2...");

        selenium.pressKey(Keys.F2);

        System.out.println("F2 pressed");

        By goToScreenLocator = By.xpath(
                "//tr[@role='row']" +
                        "[.//span[normalize-space()='Transaction Codes']]" +
                        "//a[@data-ql-nav]"
        );

        selenium.waitForVisible(goToScreenLocator);

        System.out.println("Transaction Codes shortcut found");

        selenium.click(goToScreenLocator);

        System.out.println("Go to Screen clicked");

        selenium.waitUntilPageContains("Transaction Codes");

        System.out.println("Transaction Codes page opened");
    }
}
