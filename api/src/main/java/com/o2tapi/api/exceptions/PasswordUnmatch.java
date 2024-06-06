package com.o2tapi.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class PasswordUnmatch extends RuntimeException{

    public PasswordUnmatch() {
        super();
    }

    public PasswordUnmatch(String message) {
        super(message);
    }
}
