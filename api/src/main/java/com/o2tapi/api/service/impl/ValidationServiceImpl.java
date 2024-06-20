package com.o2tapi.api.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.exceptions.InvalidFieldFormat;
import com.o2tapi.api.models.User;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.repository.UserRepository;
import com.o2tapi.api.repository.WorkoutRepository;
import com.o2tapi.api.service.ValidationService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ValidationServiceImpl implements ValidationService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkoutRepository workoutRepository;

    @Override
    public User validateUser(Long id) {
        Optional<User> user = userRepository.findById(id);

        if (!user.isPresent()) {
            throw new EntityNotFoundException("User not found");
        }

        return user.get();
    }

    @Override
    public User validateEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new EntityNotFound("User not found");
        }
        return user.get();
    }

    @Override
    public void validateNotEmptyFields(String[] fields) {
        for (String f : fields) {
            if (f == null || f.isEmpty()) {
                throw new InvalidFieldFormat("The field "+f+" is required");
            }
        }
    }

    @Override
    public void validatePasswordField(String password) {
        if (password.length() < 8) {
            throw new InvalidFieldFormat("Password must have at least 8 characters");
        }
    }

    @Override
    public Workout validateWorkout(Long id) {
        Optional<Workout> workout = workoutRepository.findById(id);

        if (!workout.isPresent()) {
            throw new EntityNotFound("Workout not found");
        }

        return workout.get();
    }
}
