package com.hrsinternational.operadatamanager.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@Getter
@Setter
@ConfigurationProperties(prefix = "selenium")
public class SeleniumProperties {

    private Chrome chrome;
    private Duration timeout;

    @Getter
    @Setter
    public static class Chrome {

        private String optionName;
        private String endpoint;
    }
}
