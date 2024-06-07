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
import com.o2tapi.api.service.ValidationService;

import net.bytebuddy.utility.RandomString;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RegisterRepository registerRepository;

    @Autowired
    UserService userService;

    @Autowired
    ValidationService validationService;

    @Override
    public ResponseEntity<Register> startRegister(RegisterDTO registerDTO) {
        
        // Refatoração do code smells (Bloaters)
        validationService.validateNotEmptyFields(new String[] {registerDTO.getEmail(), registerDTO.getName(), registerDTO.getSport()});
        validationService.validatePasswordField(registerDTO.getPassword());

        User user = userRepository.findByEmail(registerDTO.getEmail());

        if (user != null) {
            throw new UserAlreadyExists("User email "+registerDTO.getEmail()+" already exists");
        }

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

        if (actualRegister.isEmpty()) {
            throw new InvalidFieldFormat("Register not found");
        }

        if (!actualRegister.get().getHash().contentEquals(register.getHash())) {
            throw new InvalidFieldFormat("Invalid hash");
        }

        registerRepository.delete(actualRegister.get());

        return userService.create(register);

    }

}