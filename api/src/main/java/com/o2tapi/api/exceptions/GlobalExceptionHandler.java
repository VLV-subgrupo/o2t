package com.o2tapi.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Global exception handler for the application.
 * This class provides a central place to handle all unexpected exceptions that occur within the application.
 * It captures exceptions and translates them into user-friendly messages, while also logging the details
 * for debugging purposes.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles generic exceptions thrown by any method in the application.
     * This handler ensures that no exception goes uncaught, thereby preventing any unhandled exceptions
     * from causing the application to crash.
     *
     * @param e The exception that was caught.
     * @return A user-friendly message indicating an error has occurred, alongside the exception's own message.
     * @throws Exception Indicates that this method itself might rethrow any unexpected exceptions.
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleException(Exception e) {
        // Log the exception details here or perform other error handling
        return "Error occurred: " + e.getMessage();
    }
}