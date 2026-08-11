package com.hrsinternational.operadatamanager.selenium;

import lombok.RequiredArgsConstructor;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SeleniumActions {

    private final WebDriver driver;
    private final WebDriverWait wait;

    public void waitForVisible(By locator) {
        wait.until(
                ExpectedConditions.visibilityOfElementLocated(locator)
        );
    }

    public void click(By locator) {
        int attempts = 0;

        while (true) {
            try {
                wait.until(
                        ExpectedConditions.elementToBeClickable(locator)
                ).click();

                return;

            } catch (StaleElementReferenceException e) {
                attempts++;

                if (attempts == 3) {
                    throw e;
                }
            }
        }
    }

    public void fill(By locator, String value) {
        int attempts = 0;

        while (true) {
            try {
                wait.until(
                        ExpectedConditions.elementToBeClickable(locator)
                ).clear();

                wait.until(
                        ExpectedConditions.elementToBeClickable(locator)
                ).sendKeys(value);

                waitForValue(locator, value);

                return;

            } catch (StaleElementReferenceException e) {
                attempts++;

                if (attempts == 3) {
                    throw e;
                }
            }
        }
    }

    public void pressKey(Keys key) {
        new Actions(driver)
                .sendKeys(key)
                .perform();
    }

    public void waitForValue(By locator, String value) {
        wait.until(
                ExpectedConditions.textToBePresentInElementValue(
                        locator,
                        value
                )
        );
    }

    public void waitUntilPageContains(String text) {
        wait.until(
                driver -> {
                    String pageSource = driver.getPageSource();

                    return pageSource != null && pageSource.contains(text);
                }
        );
    }

    public void switchToWindow(String urlPart) {
        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);

            String currentUrl = driver.getCurrentUrl();

            if (currentUrl != null && currentUrl.contains(urlPart)) {
                return;
            }
        }

        throw new NoSuchWindowException(
                "Window containing URL part not found: " + urlPart
        );
    }
}
