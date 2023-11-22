package com.mendozanews.apinews;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "SecurityConfig")
public class ApiNewsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiNewsApplication.class, args);
    }

}