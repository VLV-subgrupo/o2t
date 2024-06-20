package com.o2tapi.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.TimerRequest;
import com.o2tapi.api.pojo.WorkoutDTO;
import com.o2tapi.api.repository.WorkoutRepository;
import com.o2tapi.api.service.WorkoutService;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    @Autowired
    WorkoutRepository workoutRepository;

    @Override
    public ResponseEntity<String> delete(Workout workout) {

        workoutRepository.delete(workout);

        return ResponseEntity.ok("Workout of id " + workout.getId() + " deleted successfully");
    }

    @Override
    public ResponseEntity<Workout> updateFields(WorkoutDTO newWorkout, Workout actualWorkout) {
     
        actualWorkout.setRegistrationDate(newWorkout.getRegistrationDate());
        actualWorkout.setTitle(newWorkout.getTitle());
        actualWorkout.setDescription(newWorkout.getDescription());
        // actualWorkout.setLabels(newWorkout.getLabels()); 
        
        return ResponseEntity.ok(workoutRepository.save(actualWorkout));
    }

    @Override
    public ResponseEntity<Workout> updateTimer(TimerRequest timer, Workout workout) {

        workout.setStartDate(timer.getStartDate());
        workout.setEndDate(timer.getEndDate());

        return ResponseEntity.ok(workoutRepository.save(workout));
    }

    @Override
    public ResponseEntity<Workout> create(WorkoutDTO register, User user) {    

        Workout workout = new Workout();
        workout.setRegistrationDate(register.getRegistrationDate());
        workout.setTitle(register.getTitle());
        workout.setDescription(register.getDescription());
        
        // During creation, the workout does not have a start and end date (duration) defined
        workout.setStartDate(null);
        workout.setEndDate(null);
    
        workout.setCreatedBy(user);    
        // workout.setLabels(register.getLabels());

        return ResponseEntity.ok(workoutRepository.save(workout));
    }

    @Override
    public ResponseEntity<Workout> find(Workout workout) {
        return ResponseEntity.ok(workout);
    }

    @Override
    public ResponseEntity<List<Workout>> findAllByUser(User user) {        
        return ResponseEntity.ok(workoutRepository.findAllByCreatedBy(user)); 
    }

    @Override
    public ResponseEntity<Workout> findByUserAndRegistrationDate(User user, Date registrationDate) {
        Workout workout = workoutRepository.findByCreatedByAndRegistrationDate(user, registrationDate)
                .orElseThrow(() -> new EntityNotFound("Workout not found for user with id " + user.getId() + " on date " + registrationDate));
        return ResponseEntity.ok(workout);
    }
}
