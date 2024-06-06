package com.o2tapi.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidFieldFormat extends RuntimeException{

    public InvalidFieldFormat() {
        super();
    }

    public InvalidFieldFormat(String message) {
        super(message);
    }
}
