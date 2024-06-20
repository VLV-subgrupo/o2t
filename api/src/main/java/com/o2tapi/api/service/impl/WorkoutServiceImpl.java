package com.o2tapi.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.WorkoutRequest;
import com.o2tapi.api.pojo.TimerRequest;
import com.o2tapi.api.pojo.WorkoutDTO;
import com.o2tapi.api.repository.WorkoutRepository;
import com.o2tapi.api.repository.UserRepository;
import com.o2tapi.api.service.WorkoutService;
import com.o2tapi.api.service.ValidationService;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    @Autowired
    WorkoutRepository workoutRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ValidationService validationService;

    @Override
    public ResponseEntity<?> delete(Workout workout) {

        if (workout == null) {
            throw new EntityNotFound("Workout not found");
        }
        workoutRepository.delete(workout);

        return ResponseEntity.ok(null);
    }

    @Override
    public ResponseEntity<Workout> updateFields(WorkoutDTO newWorkout, Workout actualWorkout) {

        // Refatoração do code smells (Bloaters)
        validationService.validateNotEmptyFields(new String[] {newWorkout.getTitle(), newWorkout.getDescription()});        

        actualWorkout.setRegistrationDate(newWorkout.getRegistrationDate());
        actualWorkout.setTitle(newWorkout.getTitle());
        actualWorkout.setDescription(newWorkout.getDescription());
        actualWorkout.setLabels(newWorkout.getLabels());
        workoutRepository.save(actualWorkout);
        
        return ResponseEntity.ok(actualWorkout);
    }

    @Override
    public ResponseEntity<Workout> updateTimer(TimerRequest timer, Workout workout) {

        workout.setStartDate(timer.getStartDate());
        workout.setEndDate(timer.getEndDate());

        return ResponseEntity.ok(workoutRepository.save(workout));
    }

    @Override
    public ResponseEntity<Workout> create(WorkoutRequest register) {    

        // Refatoração do code smells (Bloaters)
        validationService.validateNotEmptyFields(new String[] {register.getTitle(), register.getDescription()});

        Workout workout = new Workout();
        workout.setRegistrationDate(register.getRegistrationDate());
        workout.setTitle(register.getTitle());
        
        // Na criação, o workout não tem data de início e fim (duração) definidos
        workout.setStartDate(null);
        workout.setEndDate(null);

        workout.setDescription(register.getDescription());
        workout.setCreatedBy(register.getCreatedBy());
        // TODO: add labels to WorkoutRequest 
        // workout.setLabels(register.getLabels());

        return ResponseEntity.ok(workoutRepository.save(workout));
    }

    @Override
    public ResponseEntity<Workout> find(Workout workout) {
        return ResponseEntity.ok(workout);
    }

    @Override
    public ResponseEntity<List<Workout>> findAllByUser(Long userId) {
        User user = validationService.validateUser(userId);
        
        return ResponseEntity.ok(workoutRepository.findAllByCreatedBy(user)); 
    }

    @Override
    public ResponseEntity<Workout> findByUserAndRegistrationDate(Long userId, Date registrationDate) {
        User user = validationService.validateUser(userId);
        Workout workout = workoutRepository.findByCreatedByAndRegistrationDate(user, registrationDate)
                .orElseThrow(() -> new EntityNotFound("Workout not found for user with id: " + userId + " on date: " + registrationDate));
        return ResponseEntity.ok(workout);
    }
}
