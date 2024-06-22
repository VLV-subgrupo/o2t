package com.o2tapi.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.exceptions.PasswordUnmatch;
import com.o2tapi.api.exceptions.UserAlreadyExists;
import com.o2tapi.api.models.User;
import com.o2tapi.api.models.enums.Role;
import com.o2tapi.api.pojo.PasswordDTO;
import com.o2tapi.api.pojo.RegisterRequest;
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

        if (user == null) {
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

    // To create a user in Postman
    @Override
    public ResponseEntity<User> create(RegisterRequest register) {
        return ResponseEntity.ok(this.create(register.getName(), register.getEmail(), register.getPassword(), register.getSport()));
    }


    private User create(String name, String email, String password, String sport) {

        // Refatoração do code smells (Bloaters)
        validationService.validateNotEmptyFields(new String[] {name, email, sport, password});
        validationService.validatePasswordField(password);

        if (userRepository.findByEmail(email).isPresent()) {
            throw new UserAlreadyExists("Email already in use: " + email);
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setSport(sport);
        user.setRole(Role.USER);

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
