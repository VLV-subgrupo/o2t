package com.o2tapi.api.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.o2tapi.api.config.JwtService;
import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.exceptions.UserAlreadyExists;
import com.o2tapi.api.models.User;
import com.o2tapi.api.models.enums.Role;
import com.o2tapi.api.pojo.AuthenticationRequest;
import com.o2tapi.api.pojo.AuthenticationResponse;
import com.o2tapi.api.pojo.RegisterRequest;
import com.o2tapi.api.repository.UserRepository;
import com.o2tapi.api.service.AuthService;
import com.o2tapi.api.service.UserService;
import com.o2tapi.api.service.ValidationService;


@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    ValidationService validationService;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public AuthenticationResponse register(RegisterRequest registerDTO) {
        
        validationService.validateNotEmptyFields(new String[] {registerDTO.getEmail(), registerDTO.getName(), registerDTO.getSport()});
        validationService.validatePasswordField(registerDTO.getPassword());

        Optional<User> user = userRepository.findByEmail(registerDTO.getEmail());

        if (user.isPresent()) {
            throw new UserAlreadyExists("User email "+registerDTO.getEmail()+" already exists");
        }

        User newUser = new User();
        newUser.setEmail(registerDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        newUser.setSport(registerDTO.getSport());
        newUser.setName(registerDTO.getName());
        newUser.setRole(Role.USER);

        userRepository.save(newUser);

        var jwtToken = jwtService.generateToken(newUser);

        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest authRequest) {

        validationService.validateNotEmptyFields(new String[] {authRequest.getEmail(), authRequest.getPassword()});

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
            )
        );

        Optional<User> user = userRepository.findByEmail(authRequest.getEmail());

        if (user.isEmpty()) {
            throw new EntityNotFound("User not found");
        }

        var jwtToken = jwtService.generateToken(user.get());  

        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();


    }

}
