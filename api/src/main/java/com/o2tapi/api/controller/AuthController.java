package com.o2tapi.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.o2tapi.api.pojo.AuthenticationRequest;
import com.o2tapi.api.pojo.AuthenticationResponse;
import com.o2tapi.api.pojo.RegisterRequest;
import com.o2tapi.api.service.AuthService;

import io.swagger.annotations.ApiOperation;


@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("start")
    @ApiOperation("Register user and return JWT token")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("login")
    @ApiOperation("Authenticate user and return JWT token")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authRequest) {

        return ResponseEntity.ok(authService.login(authRequest));
    }

}
