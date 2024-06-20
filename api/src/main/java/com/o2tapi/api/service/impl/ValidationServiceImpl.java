package com.o2tapi.api.service.impl;

import java.util.List;
// import java.text.ParseException;
// import java.text.SimpleDateFormat;
// import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.exceptions.InvalidFieldFormat;
import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.LabelDTO;
import com.o2tapi.api.models.Workout;
// import com.o2tapi.api.pojo.TimerRequest;
// import com.o2tapi.api.pojo.WorkoutDTO;
import com.o2tapi.api.repository.UserRepository;
import com.o2tapi.api.repository.LabelRepository;
import com.o2tapi.api.repository.WorkoutRepository;
import com.o2tapi.api.service.ValidationService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ValidationServiceImpl implements ValidationService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LabelRepository labelRepository;
    
    @Autowired
    private WorkoutRepository workoutRepository;

    @Override
    public User validateUser(Long id) {
        Optional<User> user = userRepository.findById(id);

        if (!user.isPresent()) {
            throw new EntityNotFoundException("User not found with id " + id);
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
                throw new InvalidFieldFormat("The field " + f + " is required");
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
    public Label validateLabelId(Long id) {
        Optional<Label> label = labelRepository.findById(id);

        if (label.isEmpty()) {
            throw new EntityNotFoundException("Label not found with id" + id);
        }

        return label.get();
    }

    @Override
    public void validateLabelFields(LabelDTO labelDTO, boolean isUpdate) {
        validateNotEmptyFields(new String[]{labelDTO.getName(), labelDTO.getColor()});

        // Check if the user exists
        User user = validateUser(labelDTO.getCreatedById());

        // Check if the color format is valid
        if (!isValidColorFormat(labelDTO.getColor())) {
            throw new InvalidFieldFormat("Invalid color format. The color must be in the format #RRGGBB");
        }
        
        // Check if the label name is unique for the user
        if (!isLabelNameUnique(labelDTO.getName(), user, isUpdate)) {
            throw new InvalidFieldFormat("Label name must be unique for the user");
        }
    }
    
    private boolean isValidColorFormat(String color) {
        // Check if the color has the correct format (hexadecimal RGB)
        return color.matches("^#([A-Fa-f0-9]{6})$");
    }
    
    private boolean isLabelNameUnique(String name, User user, boolean isUpdate) {
        // Check if the label name is unique for the user    
        List<Label> labelsOfUser = labelRepository.findAllByCreatedBy(user);

        if (isUpdate) { // Remove 'name' from labelsOfUser, since we are updating an existing label, so it can have the same name
            labelsOfUser.removeIf(l -> l.getName().equals(name)); 
        }

        for (Label l : labelsOfUser) {
            if (l.getName().equals(name)) {
                return false;
            }
        }
        return true;
    }
    @Override
    public Workout validateWorkout(Long id) {
        Optional<Workout> workout = workoutRepository.findById(id);

        if (!workout.isEmpty()) {
            throw new EntityNotFound("Workout of id " + id + " not found");
        }

        return workout.get();
    }

    // @Override
    // public void validateWorkoutFields(WorkoutDTO workoutDTO) {
    //     validateNotEmptyFields(new String[] { workoutDTO.getTitle(), workoutDTO.getDescription() });
    //     validateFieldLength(workoutDTO.getTitle(), "Title", 255);
    //     validateFieldLength(workoutDTO.getDescription(), "Description", 1000);
    //     validateDateField(workoutDTO.getRegistrationDate(), "registrationDate");
    //     // TODO: Validate Labels
    // }

    // @Override
    // public void validateWorkoutTimerFields(TimerRequest timerRequest) {
    //     validateDateField(timerRequest.getStartDate(), "startDate");
    //     validateDateField(timerRequest.getEndDate(), "endDate");
    // }

    // private void validateDateField(Date date, String fieldName) {
    //     if (date != null && !isValidDateFormat(date.toString(), "yyyy-MM-dd HH:mm:ss")) {
    //         throw new InvalidFieldFormat("Invalid " + fieldName + " format. Expected format: yyyy-MM-dd HH:mm:ss");
    //     }
    // }

    // private boolean isValidDateFormat(String date, String format) {
    //     try {
    //         SimpleDateFormat sdf = new SimpleDateFormat(format);
    //         sdf.setLenient(false);
    //         sdf.parse(date);
    //         return true;
    //     } catch (ParseException e) {
    //         return false;
    //     }
    // }

    // private void validateFieldLength(String field, String fieldName, int maxLength) {
    //     if (field != null && field.length() > maxLength) {
    //         throw new InvalidFieldFormat(fieldName + " exceeds the maximum length of " + maxLength + " characters");
    //     }
    // }
}
