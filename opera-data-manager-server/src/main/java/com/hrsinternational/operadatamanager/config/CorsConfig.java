package com.hrsinternational.operadatamanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(
                    CorsRegistry registry
            ) {
                registry
                        .addMapping("/api/**")
                        .allowedOriginPatterns(
                                "chrome-extension://*"
                        )
                        .allowedOrigins(
                                "https://accorce1ua.oraclehospitality.eu-frankfurt-1.ocs.oraclecloud.com"
                        )
                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS"
                        )
                        .allowedHeaders("*");
            }
        };
    }
}