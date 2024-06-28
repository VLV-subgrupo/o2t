package com.o2tapi.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.CrossPermission;
import com.o2tapi.api.pojo.PasswordDTO;
import com.o2tapi.api.pojo.RegisterRequest;
import com.o2tapi.api.pojo.UserDTO;
import com.o2tapi.api.service.UserService;
import com.o2tapi.api.service.ValidationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;


@CrossOrigin(origins = CrossPermission.allowed_url)
@Api(value = "UserController", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
@RequestMapping("/v1")
public class UserController {

    @Autowired
    private ValidationService validationService;

    @Autowired
    private UserService userService;

    // To test in Postman
    @PostMapping("users")
    @ApiOperation("Save user")
    public ResponseEntity<User> saveUser(@Valid @RequestBody RegisterRequest user) {

        return userService.create(user);
    }

    @PutMapping("users/{id}/update")
    @ApiOperation("Update user")
    public ResponseEntity<User> update(@RequestBody UserDTO userDTO, @PathVariable Long id) {

        User user = validationService.validateUser(id);

        return userService.update(userDTO, user);
    }


    @PutMapping("users/{id}/password")
    @ApiOperation("Update user password")
    public ResponseEntity<User> updateUserPassword(@RequestBody PasswordDTO passwordDTO, @PathVariable Long id) {
        User user = validationService.validateUser(id);

        return userService.updatePassword(passwordDTO, user);
    }


    @DeleteMapping("users/{id}")
    @ApiOperation("Delete user by id")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        User user = validationService.validateUser(id);

        return userService.delete(user);
    }

    @GetMapping("users/email/{email}")
    @ApiOperation("Find user by email")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {

        User user = validationService.validateEmail(email);

        return userService.findByEmail(user);
    }

    @GetMapping("users/{id}")
    @ApiOperation("Find user by email")
    public ResponseEntity<User> findUser(@PathVariable Long id) {

        User user = validationService.validateUser(id);

        return userService.find(user);
    }
}
