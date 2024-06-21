package com.o2tapi.api.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.InvalidFieldFormat;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.models.User;
import com.o2tapi.api.models.Label;
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
    public ResponseEntity<Workout> updateFields(WorkoutDTO newWorkout, Workout actualWorkout, Set<Label> labels) {
     
        actualWorkout.setRegistrationDate(newWorkout.getRegistrationDate());
        actualWorkout.setTitle(newWorkout.getTitle());
        actualWorkout.setDescription(newWorkout.getDescription());
        actualWorkout.setLabels(labels); 
        
        return ResponseEntity.ok(workoutRepository.save(actualWorkout));
    }

    @Override
    public ResponseEntity<Workout> updateTimer(TimerRequest timerRequest, Workout workout) {

        Date startDate = timerRequest.getStartDate();
        Date endDate = timerRequest.getEndDate();

        if (startDate != null && endDate != null) {
            workout.setStartDate(startDate);
            workout.setEndDate(endDate);
        } else if (startDate != null) {
            workout.setStartDate(startDate);
        } else if (endDate != null) {
            workout.setEndDate(endDate);
        } else {
            throw new InvalidFieldFormat("Start and End Date cannot be null simultaneously");
        }

        return ResponseEntity.ok(workoutRepository.save(workout));
    }

    @Override
    public ResponseEntity<Workout> create(WorkoutDTO register, User user, Set<Label> labels) {    

        Workout workout = new Workout();
        workout.setRegistrationDate(register.getRegistrationDate());
        workout.setTitle(register.getTitle());
        workout.setDescription(register.getDescription());
        
        // During creation, the workout does not have a start and end date defined 
        workout.setStartDate(null);
        workout.setEndDate(null);
    
        workout.setCreatedBy(user);    
        workout.setLabels(labels);

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
    public ResponseEntity<List<Workout>> findAllByUserAndRegistrationDate(User user, Date registrationDate) {
        return ResponseEntity.ok(workoutRepository.findAllByCreatedByAndRegistrationDate(user, registrationDate));
    }
}
