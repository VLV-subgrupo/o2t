package com.o2tapi.api.service;

import com.o2tapi.api.models.Label;
import com.o2tapi.api.pojo.LabelDTO;
import com.o2tapi.api.models.User;
import com.o2tapi.api.models.Workout;
// import com.o2tapi.api.pojo.TimerRequest;
// import com.o2tapi.api.pojo.WorkoutDTO;

public interface ValidationService {
    
    User validateUser(Long id);

    User validateEmail(String email);

    void validateNotEmptyFields(String[] fields);

    void validatePasswordField(String password);

    Label validateLabelId(Long id);
    
    void validateLabelFields(LabelDTO labelDTO, boolean isUpdate);
    
    Workout validateWorkout(Long id);

    // void validateWorkoutFields(WorkoutDTO workoutDTO);

    // void validateWorkoutTimerFields(TimerRequest timerRequest);
}
