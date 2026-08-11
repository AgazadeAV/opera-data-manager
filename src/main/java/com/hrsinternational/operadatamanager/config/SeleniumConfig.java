package com.hrsinternational.operadatamanager.config;

import lombok.RequiredArgsConstructor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class SeleniumConfig {

    private final SeleniumProperties seleniumProperties;

    @Bean
    public WebDriver webDriver() {

        ChromeOptions options = new ChromeOptions();

        options.setExperimentalOption(
                seleniumProperties.getChrome().getOptionName(),
                seleniumProperties.getChrome().getEndpoint()
        );

        return new ChromeDriver(options);
    }

    @Bean
    public WebDriverWait webDriverWait(WebDriver driver) {

        return new WebDriverWait(
                driver,
                seleniumProperties.getTimeout()
        );
    }
}
