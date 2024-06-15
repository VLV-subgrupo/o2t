package com.o2tapi.api.service;

import com.o2tapi.api.models.User;

public interface ValidationService {
    
    User validateUser(Long id);

    User validateEmail(String email);

    void validateNotEmptyFields(String[] fields);

    void validatePasswordField(String password);
}
