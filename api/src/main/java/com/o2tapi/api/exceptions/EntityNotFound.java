package com.o2tapi.api.exceptions;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFound extends RuntimeException {

    public EntityNotFound() {
        super();
    }

    public EntityNotFound(String message) {
        super(message);
    }
}
