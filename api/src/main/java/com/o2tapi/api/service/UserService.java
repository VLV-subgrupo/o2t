package com.o2tapi.api.service;

import org.springframework.http.ResponseEntity;

import com.o2tapi.api.models.Register;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.PasswordDTO;
import com.o2tapi.api.pojo.RegisterDTO;
import com.o2tapi.api.pojo.UserDTO;

public interface UserService {

    ResponseEntity<?> delete(User user);

    ResponseEntity<User> update(UserDTO newUser, User actualUser);

    ResponseEntity<User> updatePassword(PasswordDTO passwordDTO, User user);

    ResponseEntity<User> create(RegisterDTO register);

    ResponseEntity<User> create(Register register);

    ResponseEntity<User> find(User user);

    ResponseEntity<User> findByEmail(User user);
}