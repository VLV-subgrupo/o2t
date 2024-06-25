package com.o2tapi.api.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.exceptions.InvalidFieldFormat;
import com.o2tapi.api.models.Goal;
import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.Metric;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.LabelDTO;
import com.o2tapi.api.models.Workout;
import com.o2tapi.api.pojo.TimerRequest;
import com.o2tapi.api.pojo.WorkoutDTO;
import com.o2tapi.api.repository.UserRepository;
import com.o2tapi.api.repository.GoalRepository;
import com.o2tapi.api.repository.LabelRepository;
import com.o2tapi.api.repository.MetricRepository;
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

    @Autowired
    private MetricRepository metricRepository;

    @Autowired
    private GoalRepository goalRepository; 

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
    public void validateNotEmptyFields(Object[] fields) {
        for (Object f : fields) {
            if (f == null || (f instanceof String && ((String) f).isEmpty())) {
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
    public Label validateLabel(Long id) {
        Optional<Label> label = labelRepository.findById(id);

        if (label.isEmpty()) {
            throw new EntityNotFoundException("Label not found with id" + id);
        }

        return label.get();
    }

    @Override
    public Goal validateGoal(Long id) {
        Optional<Goal> goal = goalRepository.findById(id);

        if (goal.isEmpty()) {
            throw new EntityNotFoundException("Goal not found with id" + id);
        }

        return goal.get();
    }

    @Override
    public Set<Label> validateLabels(Set<Long> labelsIds, User user) {
        Set<Label> labels = new HashSet<>();

        for (Long id : labelsIds) {
            Optional<Label> label = labelRepository.findById(id);

            if (label.isEmpty()) {
                throw new EntityNotFound("Label not found with id " + id);
            }

            if (label.get().getCreatedBy().getId() != user.getId()) {
                throw new InvalidFieldFormat("Label of id " + id + " does not belong to the user");
            }

            labels.add(label.get());
        }

        return labels;
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
    
    @Override
    public Workout validateWorkout(Long id) {
        Optional<Workout> workout = workoutRepository.findById(id);

        if (workout.isEmpty()) {
            throw new EntityNotFound("Workout of id " + id + " not found. Workout " + workout.toString());
        }

        return workout.get();
    }

    @Override
    public Metric validateMetric(Long id) {
        Optional<Metric> metric = metricRepository.findById(id);

        if (metric.isEmpty()) {
            throw new EntityNotFound("Metric of id " + id + " not found");
        }

        return metric.get();
    }

    @Override
    public void validateWorkoutFields(WorkoutDTO workoutDTO) {
        validateNotEmptyFields(new String[] { workoutDTO.getTitle(), workoutDTO.getDescription() });
        validateFieldLength(workoutDTO.getTitle(), "title", 255);
        validateFieldLength(workoutDTO.getDescription(), "description", 1000);
        validateDateField(workoutDTO.getRegistrationDate(), "registrationDate");
    }

    @Override
    public void validateWorkoutTimerFields(TimerRequest timerRequest) {
        validateDateField(timerRequest.getStartDate(), "startDate");
        validateDateField(timerRequest.getEndDate(), "endDate");
    }

    @Override
    public void validateRegistrationDate(Date registrationDate) {
        validateDateField(registrationDate, "registrationDate");
    }

    public boolean isValidColorFormat(String color) {
        // Check if the color has the correct format (hexadecimal RGB)
        return color.matches("^#([A-Fa-f0-9]{6})$");
    }
    
    public boolean isLabelNameUnique(String name, User user, boolean isUpdate) {
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

    public void validateDateField(Date date, String fieldName) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // Date format ISO 8601
        sdf.setLenient(false);
        if (date != null) {
            try {
                sdf.parse(sdf.format(date));
            } catch (ParseException e) {
                throw new InvalidFieldFormat("Invalid " + fieldName + " format. Expected format ISO 8601 date format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            }
        }
    }

    public void validateFieldLength(String field, String fieldName, int maxLength) {
        if (field != null && field.length() > maxLength) {
            throw new InvalidFieldFormat(fieldName + " exceeds the maximum length of " + maxLength + " characters");
        }
    }
}
