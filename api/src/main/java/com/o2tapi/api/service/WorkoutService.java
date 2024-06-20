package com.o2tapi.api.service;

import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.o2tapi.api.models.User;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.pojo.TimerRequest;
import com.o2tapi.api.pojo.WorkoutDTO;

public interface WorkoutService {

    ResponseEntity<String> delete(Workout workout);

    ResponseEntity<Workout> updateFields(WorkoutDTO newWorkout, Workout actualWorkout);

    ResponseEntity<Workout> updateTimer(TimerRequest timer, Workout workout);

    ResponseEntity<Workout> create(WorkoutDTO register, User user);

    ResponseEntity<Workout> find(Workout workout);

    ResponseEntity<List<Workout>> findAllByUser(User user);

    ResponseEntity<Workout> findByUserAndRegistrationDate(User user, Date registrationDate);
}