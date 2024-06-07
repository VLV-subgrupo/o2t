package com.o2tapi.api.service;

import org.springframework.http.ResponseEntity;

import com.o2tapi.api.models.Register;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.RegisterDTO;

public interface RegisterService {

    ResponseEntity<Register> startRegister(RegisterDTO registerDTO);

    ResponseEntity<User> finishRegister(Register register);
}
