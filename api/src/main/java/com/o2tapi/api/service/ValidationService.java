package com.o2tapi.api.service;

import java.util.Date;
import java.util.Set;

import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.Metric;
import com.o2tapi.api.pojo.LabelDTO;
import com.o2tapi.api.models.User;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.pojo.TimerRequest;
import com.o2tapi.api.pojo.WorkoutDTO;

public interface ValidationService {
    
    User validateUser(Long id);

    User validateEmail(String email);

    void validateNotEmptyFields(String[] fields);

    void validatePasswordField(String password);

    Label validateLabel(Long id);
    
    Set<Label> validateLabels(Set<Long> labelsIds, User user);

    void validateLabelFields(LabelDTO labelDTO, boolean isUpdate);
    
    Workout validateWorkout(Long id);

    void validateWorkoutFields(WorkoutDTO workoutDTO);

    void validateWorkoutTimerFields(TimerRequest timerRequest);

    void validateRegistrationDate(Date registrationDate);

    Metric validateMetric(Long id);
}
