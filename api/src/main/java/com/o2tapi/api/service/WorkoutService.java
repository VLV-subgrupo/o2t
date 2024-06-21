package com.o2tapi.api.service;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.o2tapi.api.models.User;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.models.Label;
import com.o2tapi.api.pojo.TimerRequest;
import com.o2tapi.api.pojo.WorkoutDTO;

public interface WorkoutService {

    ResponseEntity<String> delete(Workout workout);

    ResponseEntity<Workout> updateFields(WorkoutDTO newWorkout, Workout actualWorkout, Set<Label> labels);

    ResponseEntity<Workout> updateTimer(TimerRequest timer, Workout workout);

    ResponseEntity<Workout> create(WorkoutDTO register, User user, Set<Label> labels);

    ResponseEntity<Workout> find(Workout workout);

    ResponseEntity<List<Workout>> findAllByUser(User user);

    ResponseEntity<List<Workout>> findAllByUserAndRegistrationDate(User user, Date registrationDate);
}