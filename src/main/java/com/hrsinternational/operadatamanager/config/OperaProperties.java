package com.hrsinternational.operadatamanager.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "opera")
public class OperaProperties {

    private String urlPart;
}
