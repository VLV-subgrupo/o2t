package com.o2tapi.api.controller;

import java.util.Date;
import java.util.List;
import java.util.Set;

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

import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.User;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.pojo.CrossPermission;
import com.o2tapi.api.pojo.FindWorkoutByDateRequest;
import com.o2tapi.api.pojo.TimerRequest;
import com.o2tapi.api.pojo.WorkoutDTO;
import com.o2tapi.api.service.ValidationService;
import com.o2tapi.api.service.WorkoutService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;


@CrossOrigin(origins = CrossPermission.allowed_url)
@Api(value = "WorkoutController", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
@RequestMapping("/v1/workouts")
public class WorkoutController {

    @Autowired
    private ValidationService validationService;

    @Autowired
    private WorkoutService workoutService;

    @PostMapping()
    @ApiOperation("Save workout")
    public ResponseEntity<Workout> createWorkout(@Valid @RequestBody WorkoutDTO register) {
        
        User user = validationService.validateUser(register.getCreatedById());
        Set<Label> labels = validationService.validateLabels(register.getLabelsIds(), user); 
        validationService.validateWorkoutFields(register);

        return workoutService.create(register, user, labels);
    }

    @PutMapping("/{id}/update")
    @ApiOperation("Update workout")
    public ResponseEntity<Workout> updateWorkout(@RequestBody WorkoutDTO workoutDTO, @PathVariable Long id) {
        
        Workout workout = validationService.validateWorkout(id);
        User user = validationService.validateUser(workoutDTO.getCreatedById());
        Set<Label> labels = validationService.validateLabels(workoutDTO.getLabelsIds(), user); 
        validationService.validateWorkoutFields(workoutDTO);

        return workoutService.updateFields(workoutDTO, workout, labels);
    }

    @PutMapping("/{id}/timer")
    @ApiOperation("Update workout timer")
    public ResponseEntity<Workout> updateWorkoutTimer(@RequestBody TimerRequest timerRequest, @PathVariable Long id) {
        
        Workout workout = validationService.validateWorkout(id);

        return workoutService.updateTimer(timerRequest, workout);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Delete workout by id")
    public ResponseEntity<String> deleteWorkout(@PathVariable Long id) {
        return workoutService.delete(validationService.validateWorkout(id));
    }

    @GetMapping("/{id}")
    @ApiOperation("Find workout by id")
    public ResponseEntity<Workout> findWorkout(@PathVariable Long id) {
        return workoutService.find(validationService.validateWorkout(id));
    }

    @GetMapping("/user/{userId}")
    @ApiOperation("Find all workouts of a user")
    public ResponseEntity<List<Workout>> findAllWorkouts(@PathVariable Long userId) {
        
        User user = validationService.validateUser(userId);

        return workoutService.findAllByUser(user);
    }

    @GetMapping("/user/{userId}/date")
    @ApiOperation("Find workout by user id and registration date")
    public ResponseEntity<List<Workout>> findAllUserWorkoutsForDate(
            @PathVariable Long userId,
            @RequestBody FindWorkoutByDateRequest findRequest) {
        
        User user = validationService.validateUser(userId);
        Date registrationDate = findRequest.getRegistrationDate();
        validationService.validateRegistrationDate(registrationDate);
        
        return workoutService.findAllByUserAndRegistrationDate(user, registrationDate);
    }
}
