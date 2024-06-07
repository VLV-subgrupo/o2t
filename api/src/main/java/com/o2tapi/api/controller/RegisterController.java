package com.o2tapi.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.o2tapi.api.models.Register;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.RegisterDTO;
import com.o2tapi.api.service.RegisterService;
import com.o2tapi.api.service.ValidationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin
@Api(value = "RegisterController", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
@RequestMapping("/v1")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private ValidationService validationService;

    @PostMapping("start")
    @ApiOperation("Start an user registration")
    public ResponseEntity<Register> startRegister(@RequestBody RegisterDTO registerDTO) {
        return registerService.startRegister(registerDTO);
    }

    @PostMapping("finish")
    @ApiOperation("Finish an user registration")
    public ResponseEntity<User> finishRegister(@RequestBody RegisterDTO registerDTO) {
        Register register = validationService.validateRegister(registerDTO.getEmail());

        return registerService.finishRegister(register);
    }

}
