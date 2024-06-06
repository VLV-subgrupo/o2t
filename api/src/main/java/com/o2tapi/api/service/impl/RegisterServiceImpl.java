package com.o2tapi.api.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.InvalidFieldFormat;
import com.o2tapi.api.exceptions.UserAlreadyExists;
import com.o2tapi.api.models.Register;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.RegisterDTO;
import com.o2tapi.api.repository.RegisterRepository;
import com.o2tapi.api.repository.UserRepository;
import com.o2tapi.api.service.RegisterService;
import com.o2tapi.api.service.UserService;

import net.bytebuddy.utility.RandomString;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RegisterRepository registerRepository;

    @Autowired
    UserService userService;

    @Override
    public ResponseEntity<Register> startRegister(RegisterDTO registerDTO) {
        
        // verify if the password has at least 8 characters
        if (registerDTO.getPassword() == null || registerDTO.getPassword().length() < 8) {
            throw new InvalidFieldFormat("Password must have at least 8 characters");
        }

        // verify if the name, sport and email are not null
        if (registerDTO.getName() == null) {
            throw new InvalidFieldFormat("Name is required");
        }

        if (registerDTO.getSport() == null) {
            throw new InvalidFieldFormat("Sport is required");
        }

        if (registerDTO.getEmail() == null) {
            throw new InvalidFieldFormat("Email is required");
        }

        User user = userRepository.findByEmail(registerDTO.getEmail());

        // verify if the user already exists
        if (user != null) {
            throw new UserAlreadyExists("User email "+registerDTO.getEmail()+" already exists");
        }

        // create a new register
        Register newRegister = new Register();
        newRegister.setEmail(registerDTO.getEmail());
        newRegister.setPassword(registerDTO.getPassword());
        newRegister.setSport(registerDTO.getSport());
        newRegister.setName(registerDTO.getName());

        newRegister.setHash(RandomString.make(6));

        registerRepository.save(newRegister);

        return ResponseEntity.ok(newRegister);
    }

    @Override
    public ResponseEntity<User> finishRegister(Register register) {

        Optional<Register> actualRegister = registerRepository.findByEmail(register.getEmail());

        // verify if the register exists
        if (actualRegister.isEmpty()) {
            throw new InvalidFieldFormat("Register not found");
        }

        // verify if the hash is correct
        if (!actualRegister.get().getHash().contentEquals(register.getHash())) {
            throw new InvalidFieldFormat("Invalid hash");
        }

        registerRepository.delete(actualRegister.get());

        return userService.create(register);

    }

}
