package com.o2tapi.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller that handles HTTP requests to demonstrate basic functionalities and error handling.
 */
@RestController
public class HelloController {
    
    /**
     * Simple endpoint to return a greeting message.
     * 
     * @return A static greeting message "Hello, O2t Backend!".
     */
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, O2t Backend!";
    }

    /**
     * Endpoint to demonstrate error handling by intentionally throwing a runtime exception.
     *
     * @return Nothing, as it always throws an exception.
     * @throws RuntimeException always thrown to simulate an error scenario.
     */
    @GetMapping("/hello-error")
    public String throwError() {
        throw new RuntimeException("Intentional error for testing purposes");
    }
}