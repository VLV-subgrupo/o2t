package com.o2tapi.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExists extends RuntimeException {

    public UserAlreadyExists() {
        super();
    }
    public UserAlreadyExists(String message) {
        super(message);
    }
    
}
