package com.o2tapi.api.service;

import com.o2tapi.api.models.Register;
import com.o2tapi.api.models.User;

public interface ValidationService {
    
    User validateUser(Long id);

    Register validateRegister(String email);

    User validateEmail(String email);

    void validateNotEmptyFields(String[] fields);

    void validatePasswordField(String password);
}
