package com.o2tapi.api.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.o2tapi.api.models.Goal;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.GoalDTO;

public interface GoalService {
    ResponseEntity<String> delete(Goal goal);
    
    ResponseEntity<Goal> update(GoalDTO newGoal, Goal actualGoal);
    
    ResponseEntity<Goal> create(GoalDTO metric, User creatorUser);
    
    ResponseEntity<Goal> find(Goal goal);
    
    ResponseEntity<List<Goal>> findAllByUser(User user);
}
