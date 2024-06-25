package com.o2tapi.api.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.o2tapi.api.models.Goal;
import com.o2tapi.api.models.User;
import com.o2tapi.api.pojo.GoalDTO;
import com.o2tapi.api.service.GoalService;
import com.o2tapi.api.service.ValidationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;

@CrossOrigin
@Api(value = "GoalController", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
@RequestMapping("/v1/goal")
public class GoalController {

    @Autowired
    private ValidationService validationService;

    @Autowired
    private GoalService goalService;

    @PostMapping()
    @ApiOperation("Create goal")
    public ResponseEntity<Goal> createGoal(@Valid @RequestBody GoalDTO goal) {
        
        User creatorUser = validationService.validateUser(goal.getCreatedBy());
        
        return goalService.create(goal, creatorUser);
    }

    @PutMapping("/{id}")
    @ApiOperation("Update goal")
    public ResponseEntity<Goal> updateGoal(@PathVariable Long id, @Valid @RequestBody GoalDTO goalDTO) {
        
        Goal actualGoal = validationService.validateGoal(id);
        
        return goalService.update(goalDTO, actualGoal);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("Delete goal by id")
    public ResponseEntity<String> deleteGoal(@PathVariable Long id) {
        
        Goal goal = validationService.validateGoal(id);

        return goalService.delete(goal);
    }

    @GetMapping("/{id}")
    @ApiOperation("Find goal by id")
    public ResponseEntity<Goal> findGoal(@PathVariable Long id) {
        
        Goal goal = validationService.validateGoal(id);

        return goalService.find(goal);
    }
    
    @GetMapping("/user/{userId}")
    @ApiOperation("Find all goal by user id")
    public ResponseEntity<List<Goal>> findAllByUser(@PathVariable Long userId) {
        
        User user = validationService.validateUser(userId);

        return goalService.findAllByUser(user);
    }
}
