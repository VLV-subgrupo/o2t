package com.o2tapi.api.service;

import com.o2tapi.api.pojo.AuthenticationRequest;
import com.o2tapi.api.pojo.AuthenticationResponse;
import com.o2tapi.api.pojo.RegisterRequest;

public interface AuthService {

    AuthenticationResponse register(RegisterRequest registerDTO);

    AuthenticationResponse login(AuthenticationRequest authRequest);
}
