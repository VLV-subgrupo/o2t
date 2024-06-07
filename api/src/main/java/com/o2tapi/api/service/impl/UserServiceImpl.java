package com.o2tapi.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.exceptions.PasswordUnmatch;
import com.o2tapi.api.exceptions.UserAlreadyExists;
import com.o2tapi.api.models.Register;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.PasswordDTO;
import com.o2tapi.api.pojo.RegisterDTO;
import com.o2tapi.api.pojo.UserDTO;
import com.o2tapi.api.repository.UserRepository;
import com.o2tapi.api.service.UserService;
import com.o2tapi.api.service.ValidationService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ValidationService validationService;

    @Override
    public ResponseEntity<?> delete(User user) {

        if (user != null) {
            throw new EntityNotFound("User not found");
        }
        userRepository.delete(user);

        return ResponseEntity.ok(null);
    }

    @Override
    public ResponseEntity<User> update(UserDTO newUser, User actualUser) {

        // Refatoração do code smells (Bloaters)
        validationService.validateNotEmptyFields(new String[] {newUser.getName(), newUser.getEmail(), newUser.getSport()});        

        actualUser.setName(newUser.getName());
        actualUser.setEmail(newUser.getEmail());
        actualUser.setSport(newUser.getSport());
        userRepository.save(actualUser);
        return ResponseEntity.ok(actualUser);
    }

    @Override
    public ResponseEntity<User> updatePassword(PasswordDTO passwordDTO, User user) {
        Boolean passwordMatches = passwordEncoder.matches(passwordDTO.getPreviousPassword(), user.getPassword());

        if (!passwordMatches) {
            throw new PasswordUnmatch("Current password do not match.");
        }

        String encodedPassword = passwordEncoder.encode(passwordDTO.getNewPassword());

        user.setPassword(encodedPassword);

        return ResponseEntity.ok(userRepository.save(user));
    }

    // To create a user in Postman - Facilitate Tests
    @Override
    public ResponseEntity<User> create(RegisterDTO register) {
        return ResponseEntity.ok(this.create(register.getName(), register.getEmail(), register.getPassword(), register.getSport()));
    }


    @Override
    public ResponseEntity<User> create(Register register) {
        return ResponseEntity.ok(this.create(register.getName(), register.getEmail(), register.getPassword(), register.getSport()));
    }

    private User create(String name, String email, String password, String sport) {

        // Refatoração do code smells (Bloaters)
        validationService.validateNotEmptyFields(new String[] {name, email, sport, password});
        validationService.validatePasswordField(password);

        if (userRepository.findByEmail(email) != null) {
            throw new UserAlreadyExists("Email already in use: " + email);
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setSport(sport);

        return userRepository.save(user);
    }

    @Override
    public ResponseEntity<User> findByEmail(User user) {
        return ResponseEntity.ok(user);
    }

    @Override
    public ResponseEntity<User> find(User user) {
        return ResponseEntity.ok(user);
    }
}
