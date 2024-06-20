package com.o2tapi.api.controller;

import java.util.Date;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.o2tapi.api.models.Workout;
import com.o2tapi.api.pojo.WorkoutDTO;
import com.o2tapi.api.pojo.WorkoutRequest;
import com.o2tapi.api.pojo.TimerRequest;
import com.o2tapi.api.service.WorkoutService;
import com.o2tapi.api.service.ValidationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;


@CrossOrigin
@Api(value = "WorkoutController", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
@RequestMapping("/v1")
public class WorkoutController {

    @Autowired
    private ValidationService validationService;

    @Autowired
    private WorkoutService workoutService;

    // To test in Postman
    @PostMapping("workouts")
    @ApiOperation("Save workout")
    public ResponseEntity<Workout> saveWorkout(@Valid @RequestBody WorkoutRequest register) {

        return workoutService.create(register);
    }

    @PutMapping("workouts/{id}/update")
    @ApiOperation("Update workout")
    public ResponseEntity<Workout> update(@RequestBody WorkoutDTO workoutDTO, @PathVariable Long id) {
        
        Workout workout = validationService.validateWorkout(id);

        return workoutService.updateFields(workoutDTO, workout);
    }

    @PutMapping("workouts/{id}/timer")
    @ApiOperation("Update workout timer")
    public ResponseEntity<Workout> updateTimer(@RequestBody TimerRequest timer, @PathVariable Long id) {
        
        Workout workout = validationService.validateWorkout(id);

        return workoutService.updateTimer(timer, workout);
    }


    @DeleteMapping("workouts/{id}")
    @ApiOperation("Delete workout by id")
    public ResponseEntity<?> deleteWorkout(@PathVariable Long id) {

        Workout workout = validationService.validateWorkout(id);

        return workoutService.delete(workout);
    }

    @GetMapping("workouts/{id}")
    @ApiOperation("Find workout by id")
    public ResponseEntity<Workout> findWorkout(@PathVariable Long id) {

        Workout workout = validationService.validateWorkout(id);

        return workoutService.find(workout);
    }

    @GetMapping("workouts/user/{userId}")
    @ApiOperation("Find all workouts of a user")
    public ResponseEntity<List<Workout>> findAllWorkouts(@PathVariable Long userId) {

        return workoutService.findAllByUser(userId);
    }

    @GetMapping("workouts/user/{userId}/date")
    @ApiOperation("Find workout by user id and registration date")
    public ResponseEntity<Workout> findSpecificUserWorkout(
            @PathVariable Long userId,
            @RequestParam("registrationDate") Date registrationDate) {
        return workoutService.findByUserAndRegistrationDate(userId, registrationDate);
    }
}
