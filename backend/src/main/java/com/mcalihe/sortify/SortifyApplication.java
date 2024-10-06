package com.mcalihe.sortify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point for the sortify rest API.
 */
@SpringBootApplication
public class SortifyApplication {

    /**
     * Main method for app startup.
     *
     * @param args Cmd line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(SortifyApplication.class, args);
    }
}
