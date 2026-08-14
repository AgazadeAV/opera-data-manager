package com.hrsinternational.operadatamanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
public class OperaDataManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(OperaDataManagerApplication.class, args);
    }

}

//TODO add slf4g logging, add import by file, fix opera cloud tab after app stop, add exception handling,
// check if you are on trx codes page, if not navigate there, implement import via file (csv, excel etc.)
