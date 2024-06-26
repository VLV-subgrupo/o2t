package com.o2tapi.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.o2tapi.api.models.Goal;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.GoalDTO;
import com.o2tapi.api.repository.GoalRepository;
import com.o2tapi.api.service.GoalService;
import com.o2tapi.api.service.ValidationService;

@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private ValidationService validationService;

    public ResponseEntity<String> delete(Goal goal) {
        goalRepository.delete(goal);

        return ResponseEntity.ok("Goal deleted successfully!");
    }
    
    public ResponseEntity<Goal> update(GoalDTO newGoal, Goal actualGoal) {

        validationService.validateNotEmptyFields(new Object[] {newGoal.getCalories(), newGoal.getTargetDate(), newGoal.getHydration(), newGoal.getSleep(), newGoal.getWeight()});

        actualGoal.setCalories(newGoal.getCalories());
        actualGoal.setTargetDate(newGoal.getTargetDate());
        actualGoal.setHydration(newGoal.getHydration());
        actualGoal.setSleep(newGoal.getSleep());
        actualGoal.setWeight(newGoal.getWeight());

        return ResponseEntity.ok(goalRepository.save(actualGoal));
    }
    
    public ResponseEntity<Goal> create(GoalDTO goal, User creatorUser) {
        validationService.validateNotEmptyFields(new Object[] {goal.getCalories(),goal.getTargetDate(),goal.getHydration(),goal.getSleep(),goal.getWeight()});

        Goal newGoal = new Goal();
        newGoal.setCalories(goal.getCalories());
        newGoal.setTargetDate(goal.getTargetDate());
        newGoal.setHydration(goal.getHydration());
        newGoal.setSleep(goal.getSleep());
        newGoal.setWeight(goal.getWeight());

        newGoal.setCreatedBy(creatorUser);

        return ResponseEntity.ok(goalRepository.save(newGoal));
    }
    
    public ResponseEntity<Goal> find(Goal goal) {
        return ResponseEntity.ok(goalRepository.findById(goal.getId()).get());
    }
    
    public ResponseEntity<List<Goal>> findAllByUser(User user) {
        return ResponseEntity.ok(goalRepository.findAllByCreatedBy(user));
    }
}
